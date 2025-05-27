import path from "path";
import {copyDir} from "./copyDirectory.js";
import fs from "fs";

/**
 * Копирует статические директории (_next, img) из шаблона в директорию вывода.
 * @param {string} templatePath - Путь к HTML-шаблону, рядом с которым находятся папки _next и img.
 * @param {string} outputDir - Директория, в которую нужно скопировать статические файлы.
 */

export function copyTemplateFiles(templatePath, outputDir) {
  try {
    // Получаем директорию, в которой находится шаблон
    const templateDir = path.dirname(templatePath);

    // Копируем только папку _next
    const nextDir = path.join(templateDir, '_next');
    if (fs.existsSync(nextDir)) {
      copyDir(nextDir, path.join(outputDir, '_next'));
    }

    // Копируем папку img, если она существует
    const imgDir = path.join(templateDir, 'img');
    if (fs.existsSync(imgDir)) {
      copyDir(imgDir, path.join(outputDir, 'img'));
    }

  } catch (error) {
    console.error(`Ошибка при копировании шаблона: ${error.message}`);
  }
}
