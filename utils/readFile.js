import fs from "fs-extra";
import { resolve } from "path";

/**
 * Читает файл по указанному пути
 * @param {string} filePath - Относительный или абсолютный путь к файлу
 * @returns {string|null} - Содержимое файла или null в случае ошибки
 */

export function readFile(filePath) {
  if (!filePath) {
    console.error("❌ Ошибка: Путь к файлу не указан!");
    return null;
  }

  // Преобразуем в абсолютный путь
  const absolutePath = resolve(process.cwd(), filePath);

  console.log(`📂 Проверяем доступ к файлу: ${absolutePath}`);

  // Проверяем, существует ли файл
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Файл не найден: ${absolutePath}`);
    return null;
  }

  try {
    // Читаем содержимое файла
    const content = fs.readFileSync(absolutePath, "utf-8");
    console.log("✅ Файл успешно прочитан!");
    return content;
  } catch (error) {
    console.error("❌ Ошибка при чтении файла:", error.message);
    return null;
  }
}
