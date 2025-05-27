import {generateLanding} from "./generateLanding.js";
import {loadConfig} from "./loadConfig.js";

/**
 * Загружает конфигурацию, обновляет отслеживаемые секции и инициирует генерацию лэндинга.
 * @param {import('chokidar').FSWatcher} watcher - Экземпляр наблюдателя за файлами (chokidar).
 * @param {string} jsonFilePath - Путь к конфигурационному JSON-файлу.
 * @param {string} templatePath - Путь к шаблону HTML.
 * @param {string} devDir - Путь к директории, куда сохраняется сгенерированный лэндинг.
 * @param __dirname
 * @returns {Promise<{ sections: string[] }>} Обновлённый конфигурационный объект.
 */

export async function reloadSections(watcher, jsonFilePath, templatePath, devDir, __dirname) {
  const configData = loadConfig(jsonFilePath, __dirname);
  watcher.unwatch('*');
  watcher.add(configData.sections);
  await generateLanding(templatePath, configData, devDir);
  return configData;
}
