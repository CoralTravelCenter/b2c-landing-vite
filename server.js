// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import chokidar from 'chokidar';
// import browserSync from 'browser-sync';
// import {readJson} from './utils/readJson.js';
// import {rebuildHtml} from './utils/rebuildHtml.js';
//
// const app = express();
// const PORT = 3000;
// const JSON_PATH = process.argv[2];
//
// if (!JSON_PATH) {
//   console.error('❌ Укажи путь к config.json');
//   process.exit(1);
// }
//
// let config = readJson(JSON_PATH);
// const brandDir = path.resolve(`web-root/${config.env.brand}`);
// const baseHtmlPath = path.join(brandDir, 'content.desktop.html');
// const staticDir = path.join(brandDir, '_next/static');
//
// if (!fs.existsSync(baseHtmlPath)) {
//   console.error(`❌ Не найден файл: ${baseHtmlPath}`);
//   process.exit(1);
// }
//
// // Первый расчёт путей секций
// let sectionPaths = (config.sections || []).map(p => path.resolve(p));
// let finalHtml = rebuildHtml(baseHtmlPath, sectionPaths);
//
// // 📦 Раздача статики
// app.use('/_next/static', express.static(staticDir));
//
// // 📡 Главная страница
// app.get('/', (req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.send(finalHtml);
// });
//
// // 👀 Вотчер на шаблон, конфиг и секции
// const watcher = chokidar.watch([baseHtmlPath, JSON_PATH, ...sectionPaths]);
//
// watcher.on('change', () => {
//   console.log('🔁 Обнаружены изменения, пересборка...');
//   config = readJson(JSON_PATH);
//   sectionPaths = (config.sections || []).map(p => path.resolve(p));
//   finalHtml = rebuildHtml(baseHtmlPath, sectionPaths);
// });
//
// // 🚀 Express старт
// app.listen(PORT, () => {
//   console.log(`🚀 Dev-сервер (Express) запущен: http://localhost:${PORT}`);
// });
//
// // 🔥 BrowserSync (live reload)
// const bs = browserSync.create();
// bs.init({
//   proxy: `http://localhost:${PORT}`,
//   port: 3001,
//   open: true,
//   notify: false,
//   ui: false,
//   files: [baseHtmlPath, JSON_PATH]
// });

import express from 'express';
import path from 'path';
import fs from 'fs';
import ViteExpress from 'vite-express';
import {readJson} from './utils/readJson.js';
import {rebuildHtml} from './utils/rebuildHtml.js';

const app = express();
const PORT = 3000;
const JSON_PATH = process.argv[2];

if (!JSON_PATH) {
  console.error('❌ Укажи путь к config.json');
  process.exit(1);
}

let config = readJson(JSON_PATH);
const brandDir = path.resolve(`web-root/${config.env.brand}`);
const baseHtmlPath = path.join(brandDir, 'content.desktop.html');

if (!fs.existsSync(baseHtmlPath)) {
  console.error(`❌ Не найден файл: ${baseHtmlPath}`);
  process.exit(1);
}

let sectionPaths = (config.sections || []).map(p => path.resolve(p));
let finalHtml = rebuildHtml(baseHtmlPath, sectionPaths);

// Главная страница
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(finalHtml);
});

// 💥 Подключаем Vite как middleware
ViteExpress.listen(app, PORT, () => {
  console.log(`🚀 Dev-сервер с Vite доступен на http://localhost:${PORT}`);
});
