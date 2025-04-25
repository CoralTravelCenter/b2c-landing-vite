import fs from "fs";

/**
 * Удаляет директорию, если она существует
 * @param {string} directory - Путь к директории
 */
export function cleanDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, {recursive: true, force: true});
  }
}
