import path from 'path';

// Директории проекта
export const DIRECTORIES = {
  CMS: '@CMS',
  DIST: 'dist',
  WEB_ROOT: 'web-root',
  DEV: 'dev',
  ASSETS: 'assets',
};

// Автоматическое определение путей
const __dirname = path.resolve();

export const PATHS = {
  __dirname,
  DEV_DIR: path.join(__dirname, DIRECTORIES.DEV),
};

// Аргументы командной строки
export const JSON_PATH = process.argv[2];

// Порт по умолчанию
export const DEFAULT_PORT = 3000;

// Сообщения и логи
export const MESSAGES = {
  NO_JSON_PATH: 'Ошибка: Не указан путь к JSON файлу',
  USAGE: 'Использование: node server.js путь/к/файлу.json',
  FILE_NOT_FOUND: (file) => `Ошибка: Файл ${file} не найден`,
  CONFIG_READ_ERROR: (msg) => `Ошибка при чтении JSON файла: ${msg}`,
  SECTIONS_LOG: 'Секции для обработки:',
  CONFIG_CHANGED: 'Файл конфигурации изменен, обновляем список секций',
  SECTION_CHANGED: (path) => `Секция изменена: ${path}`,
  SERVER_RUNNING: (port) => `Сервер запущен на http://localhost:${port}`,
  CONFIG_USED: (file) => `Используется конфигурация из файла: ${file}`,
  SERVER_ERROR: 'Ошибка при запуске сервера:',
  SECTION_BUILT: (sectionName) => `✅ Секция [${sectionName}] успешно собрана!`,
  ALL_SECTIONS_BUILT: '🚀 Все секции собраны в @CMS',
};

// Шаблоны путей
export const PATH_TEMPLATES = {
  // Шаблон для пути к брендовому шаблону
  brandTemplatePath: (brand) => `${DIRECTORIES.WEB_ROOT}/${brand}/content.desktop.html`,

  // Остальные шаблоны
  assetCss: (sectionName) => `${DIRECTORIES.ASSETS}/${sectionName}.css`,
  assetJs: (sectionName) => `${DIRECTORIES.ASSETS}/${sectionName}.js`,
  cmsFile: (sectionName) => `coral-next-${sectionName}.html`,
};
