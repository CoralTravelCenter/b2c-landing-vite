import fs from "fs-extra";
import {jsonToString} from "./jsonToString.js";

/**
 * Обновляет `NEXT_DATA` в content.desktop.html
 * @param {string} filePath - Путь к content.desktop.html
 * @param {Object} newData - Обновлённый объект JSON
 * @returns {boolean} - Успешно ли обновлён файл
 */
export function setNextData(filePath, newData) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Файл не найден: ${filePath}`);
    return false;
  }

  // Читаем HTML-файл
  let html = fs.readFileSync(filePath, "utf-8");

  // Ищем блок <script id="__NEXT_DATA__">
  const nextDataRegex = /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;
  const match = html.match(nextDataRegex);

  if (!match) {
    console.warn("⚠️ Тег <script id='__NEXT_DATA__'> не найден.");
    return false;
  }

  // Генерируем обновлённый JSON
  const updatedJson = jsonToString(newData)

  // Формируем новый тег <script>
  const updatedScriptTag = `<script id="__NEXT_DATA__" type="application/json">${updatedJson}</script>`;

  // Заменяем старый JSON в HTML
  html = html.replace(match[0], updatedScriptTag);
  fs.writeFileSync(filePath, html, "utf-8");

  console.log(`✅ NEXT_DATA успешно обновлён в ${filePath}`);
  return true;
}
