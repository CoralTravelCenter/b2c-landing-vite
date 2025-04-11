/**
 * Рекурсивно копирует содержимое одной директории в другую.
 * @param {string} src - Путь к исходной директории.
 * @param {string} dest - Путь к директории назначения.
 */
import fs from "fs";
import path from "path";

export function copyDir(src, dest) {
  // Создаем директорию назначения, если она не существует
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, {recursive: true})
  }

  // Получаем список файлов в исходной директории
  const entries = fs.readdirSync(src, {withFileTypes: true})

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    // Если это директория, рекурсивно копируем её содержимое
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      // Если это файл, копируем его
      fs.copyFileSync(srcPath, destPath)
    }
  }
}
