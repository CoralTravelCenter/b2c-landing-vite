/**
 * Преобразует абсолютный путь к файлу в формат, совместимый с URL для Vite dev-сервера.
 *
 * - На Windows удаляет букву диска (например, "C:") и заменяет обратные слэши на прямые.
 * - На других платформах возвращает путь без изменений.
 *
 * @param {string} resolvedPath - Абсолютный путь к файлу.
 * @returns {string} - URL-подобный путь, подходящий для использования в Vite.
 */
export function normalizePathForVite(resolvedPath) {
  if (process.platform === 'win32') {
    const normalizedPath = resolvedPath.replace(/^([a-zA-Z]:)/, '').replace(/\\/g, '/');
    return normalizedPath.startsWith('/') ? normalizedPath : '/' + normalizedPath;
  }
  return resolvedPath;
}
