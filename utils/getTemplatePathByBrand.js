import fs from 'fs';
import path from 'path';
import {PATH_TEMPLATES} from '../constants.js';

/**
 * Получает путь к HTML-шаблону на основе бренда из конфигурационного JSON-файла.
 * Если шаблон не найден — завершает процесс с ошибкой.
 *
 * @param {string} jsonFilePath - Абсолютный путь к конфигурационному JSON-файлу.
 * @param {string} rootDir - Корневая директория проекта.
 * @returns {string} Полный путь к шаблону HTML для указанного бренда.
 */
export function getTemplatePathByBrand(jsonFilePath, rootDir) {
  try {
    const config = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    const brand = config.env.brand

    const templatePath = path.join(rootDir, PATH_TEMPLATES.brandTemplatePath(brand));

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Шаблон для бренда "${brand}" не найден: ${templatePath}`);
    }

    console.log(`Используется шаблон для бренда "${brand}": ${templatePath}`);
    return templatePath;

  } catch (error) {
    console.error(`Ошибка при получении шаблона: ${error.message}`);
    process.exit(1);
  }
}
