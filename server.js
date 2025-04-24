import chokidar from 'chokidar';
import express from 'express';
import open from 'open';
import {existsSync} from 'fs'; // Импорт только нужного метода
import {createServer as createViteServer} from 'vite';
import {getTemplatePathByBrand} from "./utils/getTemplatePathByBrand.js";
import {generateLanding} from "./utils/generateLanding.js";
import {loadConfig} from "./utils/loadConfig.js";
import {reloadSections} from "./utils/reloadSections.js";
import {copyTemplateFiles} from "./utils/copyTemplateFiles.js";
import {prepareDevDirectory} from "./utils/prepareDevDirectory.js";

import {DEFAULT_PORT, JSON_PATH, MESSAGES, PATHS} from './constants.js';
import {VITE_SERVER_CONFIG, WATCHER_SETTINGS} from './configs.js';
import {getLocalIp} from "./utils/getLocalIp.js";

// Определяем рабочие переменные
const app = express();

async function startServer() {
  // Проверка на наличие пути к JSON-файлу
  if (!JSON_PATH) {
    console.error(MESSAGES.NO_JSON_PATH);
    console.error(MESSAGES.USAGE);
    process.exit(1);
  }

  // Проверка существования JSON-файла
  if (!existsSync(JSON_PATH)) {
    console.error(MESSAGES.FILE_NOT_FOUND(JSON_PATH));
    process.exit(1);
  }

  // Загрузка конфигурации проекта
  let configData;
  try {
    configData = loadConfig(JSON_PATH, PATHS.__dirname);
    console.log(MESSAGES.SECTIONS_LOG, configData.sections);
  } catch (error) {
    console.error(MESSAGES.CONFIG_READ_ERROR(error.message));
    process.exit(1);
  }

  // Подготовка директории для разработки
  prepareDevDirectory(PATHS.DEV_DIR);

  // Создание Vite сервера с HMR
  const vite = await createViteServer(VITE_SERVER_CONFIG(PATHS.DEV_DIR));
  app.use(vite.middlewares);

  // Получение пути к шаблону и копирование файлов
  const templatePath = getTemplatePathByBrand(JSON_PATH, PATHS.__dirname);
  copyTemplateFiles(templatePath, PATHS.DEV_DIR);

  // Генерация лэндинга при запуске
  await generateLanding(templatePath, configData, PATHS.DEV_DIR);

  // Отслеживание изменений в секциях
  const watcher = chokidar.watch(configData.sections, WATCHER_SETTINGS);
  watcher.on('change', async changedPath => {
    console.log(MESSAGES.SECTION_CHANGED(changedPath));
    await generateLanding(templatePath, configData, PATHS.DEV_DIR);
  });

  // Отслеживание изменений в конфигурационном файле
  const configWatcher = chokidar.watch(JSON_PATH, WATCHER_SETTINGS);
  configWatcher.on('change', async () => {
    console.log(MESSAGES.CONFIG_CHANGED);
    try {
      configData = await reloadSections(watcher, JSON_PATH, templatePath, PATHS.DEV_DIR, PATHS.__dirname);
    } catch (error) {
      console.error(MESSAGES.CONFIG_READ_ERROR(error.message));
    }
  });

  // Запуск сервера
  const PORT = process.env.PORT || DEFAULT_PORT;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Локально: http://localhost:${PORT}`);
    console.log(`📱 В сети:   http://${getLocalIp()}:${PORT}`);
    open(`http://localhost:${PORT}`);
  });

}

// Запуск с обработкой ошибок
startServer().catch(error => {
  console.error(MESSAGES.SERVER_ERROR, error);
  process.exit(1);
});
