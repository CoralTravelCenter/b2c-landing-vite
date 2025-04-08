import {exec} from 'child_process';
import {transformer} from './utils/transformer.js';
import express from 'express';
import path from 'path';
import ViteExpress from 'vite-express';
import {readJson} from './utils/readJson.js';
import {rebuildHtml} from './utils/rebuildHtml.js';
import {watchSectionFiles} from './utils/watchSections.js'; // Импортируем функцию отслеживания файлов
import {getIndexHtml} from './utils/getIndexHtml.js'; // Импортируем getIndexHtml

const app = express();
const PORT = 3000;
const JSON_PATH = process.argv[2];

if (!JSON_PATH) {
  console.error('❌ Укажи путь к config.json');
  process.exit(1);
}

let config = readJson(JSON_PATH);
const baseHtmlPath = getIndexHtml(app, JSON_PATH);  // Получаем путь к content.desktop.html

// Получаем пути к секциям из JSON
let sectionPaths = (config.sections || []).map(p => path.resolve(p));

// Обработка HTML с секциями
let finalHtml = '';

(async () => {
  finalHtml = await rebuildHtml(baseHtmlPath, sectionPaths);

  // Настройка ViteExpress после того, как секции обработаны
  const vite = await ViteExpress.config({
    transformer,
    entry: baseHtmlPath // Передаем путь к основному HTML файлу
  });

  // Главная страница
  app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(finalHtml);
  });

  // 💥 Подключаем Vite как middleware
  ViteExpress.listen(app, PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`🚀 Сервер запущен на ${url}`);
    exec(process.platform === 'win32' ? `start ${url}` : process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`);
  });

  // Настроить отслеживание изменений в секциях
  watchSectionFiles(baseHtmlPath, sectionPaths, rebuildHtml, updateHtml, vite);
})();

console.log(`🚀 Dev-сервер с Vite доступен на http://localhost:${PORT}`);

// Функция для обновления finalHtml при изменениях в секциях
function updateHtml(updatedHtml) {
  finalHtml = updatedHtml;
  // Нужно вызвать повторный рендеринг, чтобы обновить ответ
  console.log('🔁 HTML обновлен после изменений в секциях');
}
