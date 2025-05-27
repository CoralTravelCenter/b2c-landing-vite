import {cleanDirectory} from "./cleanDirectory.js";
import fs from "fs";

/**
 * Очищает и при необходимости создаёт директорию для вывода сборки.
 * @param {string} devDir - Абсолютный путь к директории, предназначенной для вывода статических файлов.
 */

export function prepareDevDirectory(devDir) {
  cleanDirectory(devDir);
  if (!fs.existsSync(devDir)) {
    fs.mkdirSync(devDir, {recursive: true});
   
  }
}
