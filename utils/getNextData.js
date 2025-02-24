import fs from "fs-extra";

/**
 * Читает `NEXT_DATA` из content.desktop.html
 * @param {string} filePath - Путь к content.desktop.html
 * @returns {Object|null} - Объект JSON или null, если произошла ошибка
 */
export function getNextData(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Файл не найден: ${filePath}`);
    return null;
  }

  // Читаем HTML-файл
  const html = fs.readFileSync(filePath, "utf-8");

  // Ищем блок <script id="__NEXT_DATA__">
  const nextDataRegex = /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;
  const match = html.match(nextDataRegex);

  if (!match) {
    console.warn("⚠️ Тег <script id='__NEXT_DATA__'> не найден.");
    return null;
  }

  try {
    return JSON.parse(match[1]); // Парсим JSON
  } catch (error) {
    console.error("❌ Ошибка парсинга JSON из NEXT_DATA:", error.message);
    return null;
  }
}
