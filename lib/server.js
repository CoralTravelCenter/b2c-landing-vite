import chokidar from 'chokidar';
import express from 'express';
import open from 'open';
import {existsSync} from 'fs';
import {createServer as createViteServer} from 'vite';
import {getTemplatePathByBrand} from "./dev_utils/getTemplatePathByBrand.js";
import {generateLanding} from "./dev_utils/generateLanding.js";
import {loadConfig} from "./dev_utils/loadConfig.js";
import {reloadSections} from "./dev_utils/reloadSections.js";
import {copyTemplateFiles} from "./dev_utils/copyTemplateFiles.js";
import {prepareDevDirectory} from "./dev_utils/prepareDevDirectory.js";
import {DEFAULT_PORT, MESSAGES, PATHS} from './constants.js';
import {VITE_SERVER_CONFIG, WATCHER_SETTINGS} from './configs.js';
import {getLocalIp} from "./dev_utils/getLocalIp.js";
import path from "path";

// Определяем рабочие переменные
const app = express();

export default async function startServer(configPath) {
  // Проверка на наличие пути к JSON-файлу
  if (!configPath) {
    console.error(MESSAGES.NO_JSON_PATH);
    console.error(MESSAGES.USAGE);
    process.exit(1);
  }

  // Проверка существования JSON-файла
  if (!existsSync(configPath)) {
    console.error(MESSAGES.FILE_NOT_FOUND(configPath));
    process.exit(1);
  }

  // Загрузка конфигурации проекта
  let configData;
  try {
    configData = loadConfig(configPath, PATHS.__dirname);
  } catch (error) {
    console.error(MESSAGES.CONFIG_READ_ERROR(error.message));
    process.exit(1);
  }

  // Подготовка директории для разработки
  prepareDevDirectory(PATHS.DEV_DIR);

  // Создание Vite сервера
  const vite = await createViteServer(VITE_SERVER_CONFIG(PATHS.DEV_DIR));
  let hadBuildError = false;

  vite.config.logger.error = (...args) => {
    hadBuildError = true;
    console.log(...args);
  };

  vite.watcher.on('change', async () => {
    if (hadBuildError) {
      hadBuildError = false;
      await generateLanding(templatePath, configData, PATHS.DEV_DIR);

    }
  });
  app.use('/assets', express.static(path.resolve(`site/coral.ru/assets`)));
  app.use(vite.middlewares);

  // Получение пути к шаблону и копирование файлов
  const templatePath = getTemplatePathByBrand(configPath, PATHS.__dirname);
  copyTemplateFiles(templatePath, PATHS.DEV_DIR);

  // Генерация лэндинга при запуске
  await generateLanding(templatePath, configData, PATHS.DEV_DIR);

  // Отслеживание изменений в секциях
  const watcher = chokidar.watch(configData.sections, WATCHER_SETTINGS);
  watcher.on('change', async () => {
    await generateLanding(templatePath, configData, PATHS.DEV_DIR);
  });

  // Отслеживание изменений в конфигурационном файле
  const configWatcher = chokidar.watch(configPath, WATCHER_SETTINGS);
  configWatcher.on('change', async () => {
    try {
      configData = await reloadSections(watcher, configPath, templatePath, PATHS.DEV_DIR, PATHS.__dirname);
    } catch (error) {
      console.error(MESSAGES.CONFIG_READ_ERROR(error.message));
    }
  });

  // Запуск сервера
  const PORT = process.env.PORT || DEFAULT_PORT;
  app.listen(PORT, '0.0.0.0', () => {
    console.log('+++ Сервер запущен +++')
    console.log(`CWD: ${PATHS.__dirname}`)
    console.log(`SOURCE: ${configPath}`);
    console.log(`🚀 Локально: http://localhost:${PORT}`);
    console.log(`📱 В сети:   http://${getLocalIp()}:${PORT}`);
    open(`http://localhost:${PORT}`);
  });

}
