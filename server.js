import express from 'express';
import fs from 'fs';
import {resolve} from 'path';
import {createServer as createViteServer} from 'vite';
import ViteExpress from 'vite-express';
import {readJson} from './utils/readJson.js';
import browserSync from 'browser-sync';
import {rebuildHtmlWithSections} from "./utils/rebuildHtmlWithSections.js";
import {getIndexHtml} from "./utils/getIndexHtml.js";

const app = express();
const PORT = 3000;

// Получаем путь к JSON-файлу из аргумента командной строки
const JSON_PATH = process.argv[2];

if (!JSON_PATH || !fs.existsSync(JSON_PATH)) {
  console.error(`❌ Указанный JSON-файл не найден или путь не указан: ${JSON_PATH}`);
  process.exit(1);
}

let indexHtmlPath;
let sectionPaths;

// Настроим Vite сервер
const vite = await createViteServer({
  root: process.cwd(),
  server: {middlewareMode: 'ssr'}
});
app.use(vite.middlewares);

// Читаем JSON, обрабатываем и получаем путь к основному HTML
const BRAND = readJson(JSON_PATH);
globalThis.BRAND = BRAND;

const staticDir = resolve(process.cwd(), `web-root/${BRAND.env.brand}/static`);
app.use(express.static(staticDir));

indexHtmlPath = resolve(staticDir, 'content.desktop.html');
sectionPaths = (BRAND.sections || []).map(p => resolve(p));

// Рендерим HTML при запросе на '/'
app.get('/', async (req, res) => {
  const indexHtmlPath = getIndexHtml(JSON_PATH, app);

  // Получаем путь к секциям из JSON
  const sectionPaths = (readJson(JSON_PATH).sections || []).map(p => resolve(p));

  await vite.transformIndexHtml(req.url, fs.readFileSync(indexHtmlPath, 'utf-8'));

  // Инжектируем секции в HTML
  const htmlWithSections = await rebuildHtmlWithSections(indexHtmlPath, sectionPaths, vite);

  // Отправляем итоговый HTML
  res.status(200).set({'Content-Type': 'text/html'}).end(htmlWithSections);
});

// Запускаем сервер с Vite
ViteExpress.listen(app, PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  const bs = browserSync.create();
  bs.init({
    proxy: `http://localhost:${PORT}`,
    port: PORT + 1,
    open: true,
    notify: false,
    ui: false,
    files: [
      indexHtmlPath,
      JSON_PATH,
      ...sectionPaths || []
    ]
  });
});
