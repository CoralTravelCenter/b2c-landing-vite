import fs from 'fs-extra';
import {resolve} from 'path';
import {readJson} from './readJson.js';
import express from "express";

export function getIndexHtml(JSON_PATH, app) {
  if (!JSON_PATH || !fs.existsSync(JSON_PATH)) {
    console.error(`❌ Указанный JSON-файл не найден или путь не указан: ${JSON_PATH}`);
    process.exit(1);
  }

  try {
    const BRAND = readJson(JSON_PATH);
    globalThis.BRAND = BRAND;

    if (!BRAND?.env?.brand) {
      console.error('❌ Неверная структура JSON файла. Ожидалось наличие BRAND.env.brand');
      process.exit(1);
    }

    console.log(`✅ Загрузка конфигурации бренда: ${BRAND.env.brand}`);

    const staticDir = resolve(process.cwd(), `web-root/${BRAND.env.brand}-next`);
    app.use(express.static(staticDir));

    console.log(`📂 Статические файлы раздаются из: ${staticDir}`);

    const INDEX_HTML_PATH = resolve(staticDir, 'content.desktop.html');

    if (!fs.existsSync(INDEX_HTML_PATH)) {
      console.error(`❌ Файл не найден: ${INDEX_HTML_PATH}`);
      process.exit(1);
    }

    return INDEX_HTML_PATH;
  } catch (error) {
    console.error(`❌ Ошибка при чтении или парсинге JSON-файла: ${error.message}`);
    process.exit(1);
  }
}
