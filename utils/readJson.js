import fs from "fs-extra";
import {resolve} from "path";

export function readJson(filePath) {
  if (!filePath) {
    console.error("❌ Ошибка: Путь к JSON-файлу не указан!");
    return null;
  }

  // Преобразуем в абсолютный путь
  const absolutePath = resolve(process.cwd(), filePath);

  console.log(`📂 Проверяем доступ к JSON-файлу: ${absolutePath}`);

  // Проверяем, существует ли файл
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ JSON-файл не найден: ${absolutePath}`);
    return null;
  }

  try {
    // Читаем содержимое файла
    const rawContent = fs.readFileSync(absolutePath, "utf-8");

    // Декодируем JSON, используя jsesc
    const jsonData = JSON.parse(rawContent);

    console.log("✅ JSON-файл успешно прочитан!");
    return jsonData;
  } catch (error) {
    console.error("❌ Ошибка при чтении JSON-файла:", error.message);
    return null;
  }
}
