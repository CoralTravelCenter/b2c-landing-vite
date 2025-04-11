import fs from "fs";
import path from "path";

/**
 * Загружает и обрабатывает конфигурационный JSON-файл.
 *
 * @param {string} jsonFilePath - Путь к JSON-файлу с конфигурацией.
 * @param __dirname - Путь к ...
 * @returns {{sections: string[]}} Объект конфигурации с абсолютными путями к секциям.
 *
 * @throws {Error} Если файл не содержит поле `sections` или не является валидным JSON.
 */

export function loadConfig(jsonFilePath, __dirname) {
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
  const config = JSON.parse(jsonContent);

  if (!config.sections) {
    throw new Error('В JSON файле отсутствует массив sections');
  }

  config.sections = config.sections.map(sectionPath => {
    return path.isAbsolute(sectionPath)
      ? sectionPath
      : path.resolve(__dirname, sectionPath);
  });

  return config;
}
