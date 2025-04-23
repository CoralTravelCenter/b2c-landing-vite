import chokidar from 'chokidar'
import express from 'express'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import {createServer as createViteServer} from 'vite'
import {getTemplatePathByBrand} from "./utils/getTemplatePathByBrand.js";
import {generateLanding} from "./utils/generateLanding.js";
import {loadConfig} from "./utils/loadConfig.js";
import {reloadSections} from "./utils/reloadSections.js";
import {copyTemplateFiles} from "./utils/copyTemplateFiles.js";
import {prepareDevDirectory} from "./utils/prepareDevDirectory.js";
import vue from "@vitejs/plugin-vue";
import react from '@vitejs/plugin-react'

// Получаем текущую директорию
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const devDir = path.join(__dirname, 'dev')
const jsonFilePath = process.argv[2]
const app = express()


// Функция для запуска сервера
async function startServer() {
  if (!jsonFilePath) {
    console.error('Ошибка: Не указан путь к JSON файлу')
    console.error('Использование: node server.js путь/к/файлу.json')
    process.exit(1)
  }

  // Проверяем существование JSON файла
  if (!fs.existsSync(jsonFilePath)) {
    console.error(`Ошибка: Файл ${jsonFilePath} не найден`)
    process.exit(1)
  }

  // Читаем и парсим JSON файл
  let configData
  try {
    configData = loadConfig(jsonFilePath, __dirname);
    console.log('Секции для обработки:', configData.sections);
  } catch (error) {
    console.error(`Ошибка при чтении JSON файла: ${error.message}`);
    process.exit(1);
  }

  // Очищаем директорию dev перед запуском
  prepareDevDirectory(devDir)

  // Создаем Vite сервер с включенным HMR
  const vite = await createViteServer({
    plugins: [react(), vue()],
    server: {
      middlewareMode: true, // Оставляем middleware режим
      hmr: true, // Включаем HMR
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    appType: 'spa',
    root: devDir, // Изменяем root на dev
    publicDir: false,
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  })

  // Используем Vite middleware
  app.use(vite.middlewares)

  // Получаем путь к шаблону HTML на основе бренда
  const templatePath = await getTemplatePathByBrand(jsonFilePath, __dirname)

  // Копируем шаблон и статические файлы
  copyTemplateFiles(templatePath, devDir)

  // Генерируем лэндинг при запуске
  await generateLanding(templatePath, configData, devDir)

  // Настраиваем отслеживание изменений в файлах секций
  const watcher = chokidar.watch(configData.sections, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
  })

  // При изменении любой секции перегенерируем лэндинг
  watcher.on('change', async changedPath => {
    console.log(`Секция изменена: ${changedPath}`);
    await generateLanding(templatePath, configData, devDir);
  })

  // Также отслеживаем изменения в JSON-файле конфигурации
  const configWatcher = chokidar.watch(jsonFilePath, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
  })

  configWatcher.on('change', async () => {
    console.log('Файл конфигурации изменен, обновляем список секций')

    try {
      configData = await reloadSections(watcher, jsonFilePath, templatePath, devDir, __dirname);
    } catch (error) {
      console.error(`Ошибка при обновлении конфигурации: ${error.message}`);
    }
  })

  // Вместо вызова vite.listen(), запускаем Express сервер
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
    console.log(`Используется конфигурация из файла: ${jsonFilePath}`)
  })
}

// Запускаем сервер
startServer().catch(error => {
  console.error('Ошибка при запуске сервера:', error)
  process.exit(1)
})
