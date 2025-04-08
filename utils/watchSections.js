import chokidar from 'chokidar'; // Импортируем Chokidar

// Функция для отслеживания изменений в секциях
export function watchSectionFiles(baseHtmlPath, sectionPaths, rebuildHtml, updateHtmlCallback, vite) {
  const watcher = chokidar.watch(sectionPaths, {
    persistent: true,  // Следим за изменениями постоянно
    ignoreInitial: true, // Не отслеживаем начальную загрузку
  });

  // Функция для обновления секций при изменении файлов
  watcher.on('change', async (filePath) => {
    console.log(`⚡ Файл изменен: ${filePath}`);

    // Чтение и пересборка HTML с обновленными секциями
    const updatedHtml = await rebuildHtml(baseHtmlPath, sectionPaths);

    // Обновление finalHtml с новым содержимым
    updateHtmlCallback(updatedHtml);

    // Логируем изменения
    console.log('🔁 Пересобран HTML после изменений в секциях');

    // Перезагрузка сервера через ViteExpress
    vite.reload();
  });
}
