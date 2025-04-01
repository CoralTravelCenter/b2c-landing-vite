import path from 'path';
import fs from 'fs';
import express from 'express';
import {readJson} from './readJson.js';

export function getIndexHtml(app, JSON_PATH) {
  const BRAND = readJson(JSON_PATH);
  const relativePath = `web-root/${BRAND.env.brand}/content.desktop.html`;
  const absolutePath = path.resolve(process.cwd(), relativePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ HTML-файл не найден: ${absolutePath}`);
    process.exit(1);
  }

  const staticDir = path.resolve(process.cwd(), `web-root/${BRAND.env.brand}`);
  app.use(express.static(staticDir));

  console.log(`📄 HTML-файл: ${absolutePath}`);
  console.log(`📁 Статика:   ${staticDir}`);

  return absolutePath;
}
