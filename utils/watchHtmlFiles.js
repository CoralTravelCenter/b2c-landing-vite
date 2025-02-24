import chokidar from "chokidar";
import fs from "fs-extra";

/**
 * Следит за изменениями в HTML-файлах и передаёт изменённый HTML в callback
 * @param {Array<string>} htmlFiles - Массив путей к HTML-файлам
 * @param {Function} onHtmlChange - Функция, вызываемая при изменении HTML (filePath, updatedHtml)
 */
export function watchHtmlFiles(htmlFiles, onHtmlChange) {
  if (!htmlFiles.length) {
    console.warn("⚠️ Нет файлов для отслеживания.");
    return;
  }

  console.log("👀 Следим за изменениями в HTML-файлах...");
  const watcher = chokidar.watch(htmlFiles, { persistent: true });

  watcher.on("change", (filePath) => {
    console.log(`♻️ Файл изменён: ${filePath}`);

    try {
      // Читаем изменённый HTML-файл
      const updatedHtml = fs.readFileSync(filePath, "utf-8");

      // Вызываем колбэк, передавая изменённый HTML
      onHtmlChange(filePath, updatedHtml);
    } catch (error) {
      console.error(`❌ Ошибка при чтении изменённого файла ${filePath}:`, error.message);
    }
  });
}
