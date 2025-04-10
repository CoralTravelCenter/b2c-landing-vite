import chokidar from 'chokidar'
import express from 'express'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import {createServer as createViteServer} from 'vite'
import {combineIntoLandingPage} from './utils/combineIntoLandingPage.js'
import {processSection} from './utils/processSection.js'

// Получаем текущую директорию
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Функция для очистки директории
function cleanDirectory(directory) {
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory)

    for (const file of files) {
      const filePath = path.join(directory, file)

      // Если это директория, рекурсивно очищаем её
      if (fs.statSync(filePath).isDirectory()) {
        cleanDirectory(filePath)
        fs.rmdirSync(filePath)
      } else {
        // Иначе удаляем файл
        fs.unlinkSync(filePath)
      }
    }

    console.log(`Директория очищена: ${directory}`)
  }
}

// Функция для получения шаблона по бренду
async function getTemplatePathByBrand(jsonFilePath) {
  try {
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8')
    const config = JSON.parse(jsonContent)

    // Получаем бренд из конфигурации
    const brand = config.brand || 'coral'

    // Формируем путь к шаблону на основе бренда
    const templatePath = path.join(__dirname, `web-root/${brand}-next/content.desktop.html`)

    // Проверяем существование шаблона
    if (!fs.existsSync(templatePath)) {
      console.warn(`Шаблон для бренда ${brand} не найден: ${templatePath}`)
      console.warn('Используем шаблон по умолчанию')
      return path.join(__dirname, 'web-root/coral-next/content.desktop.html')
    }

    console.log(`Используется шаблон для бренда ${brand}: ${templatePath}`)
    return templatePath
  } catch (error) {
    console.error(`Ошибка при получении шаблона: ${error.message}`)
    return path.join(__dirname, 'web-root/coral-next/content.desktop.html')
  }
}

// Функция для копирования директории
function copyDir(src, dest) {
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

// Функция для копирования шаблона и статических файлов
function copyTemplateFiles(templatePath, outputDir) {
  try {
    // Получаем директорию, в которой находится шаблон
    const templateDir = path.dirname(templatePath);

    // Копируем только папку _next
    const nextDir = path.join(templateDir, '_next');
    if (fs.existsSync(nextDir)) {
      copyDir(nextDir, path.join(outputDir, '_next'));
      console.log(`Папка _next скопирована из ${nextDir} в ${path.join(outputDir, '_next')}`);
    }

    // Копируем папку img, если она существует
    const imgDir = path.join(templateDir, 'img');
    if (fs.existsSync(imgDir)) {
      copyDir(imgDir, path.join(outputDir, 'img'));
      console.log(`Папка img скопирована из ${imgDir} в ${path.join(outputDir, 'img')}`);
    }

    // Не копируем сам HTML-файл шаблона, так как он будет использоваться напрямую
    // при генерации index.html

    console.log(`Статические файлы скопированы из ${templateDir} в ${outputDir}`);
  } catch (error) {
    console.error(`Ошибка при копировании шаблона: ${error.message}`);
  }
}

// Функция для запуска сервера
async function startServer() {
  // Создаем экземпляр Express приложения
  const app = express()

  // Получаем путь к JSON файлу из аргументов командной строки
  const jsonFilePath = process.argv[2]

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
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8')
    configData = JSON.parse(jsonContent)

    // Проверяем наличие поля sections
    if (!configData.sections) {
      throw new Error('В JSON файле отсутствует массив sections')
    }

    // Определяем корневую директорию проекта
    const rootDir = __dirname

    // Преобразуем относительные пути в абсолютные относительно корня проекта
    configData.sections = configData.sections.map(sectionPath => {
      if (path.isAbsolute(sectionPath)) {
        return sectionPath
      } else {
        return path.resolve(rootDir, sectionPath)
      }
    })

    console.log('Секции для обработки:', configData.sections)
  } catch (error) {
    console.error(`Ошибка при чтении JSON файла: ${error.message}`)
    process.exit(1)
  }

  // Создаем директорию dev вместо public
  const devDir = path.join(__dirname, 'dev')

  // Очищаем директорию dev перед запуском
  cleanDirectory(devDir)

  if (!fs.existsSync(devDir)) {
    fs.mkdirSync(devDir, {recursive: true})
    console.log(`Создана директория для статических файлов: ${devDir}`)
  }

  // Создаем Vite сервер с включенным HMR
  const vite = await createViteServer({
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
  const templatePath = await getTemplatePathByBrand(jsonFilePath)

  // Копируем шаблон и статические файлы
  copyTemplateFiles(templatePath, devDir)

  // Функция для генерации лэндинга
  async function generateLanding() {
    try {
      // Обрабатываем все секции, передавая экземпляр Vite
      const processedSectionsPromises = configData.sections.map(sectionPath =>
        processSection(sectionPath, vite)
      )

      // Ждем завершения обработки всех секций
      const processedSections = await Promise.all(processedSectionsPromises)

      // Объединяем секции в один HTML-файл
      const landingHTML = combineIntoLandingPage(
        processedSections,
        templatePath
      )

      // Сохраняем результат в файл
      const outputPath = path.join(devDir, 'index.html') // Изменяем путь на dev
      fs.writeFileSync(outputPath, landingHTML)

      console.log(`Лэндинг сгенерирован: ${outputPath}`)
      return landingHTML
    } catch (error) {
      console.error(`Ошибка при генерации лэндинга: ${error.message}`)
      return `<!DOCTYPE html>
        <html>
          <head><title>Error</title></head>
          <body>
            <h1>Ошибка при сборке лэндинга</h1>
            <p>${error.message}</p>
          </body>
        </html>`
    }
  }

  // Генерируем лэндинг при запуске
  await generateLanding()

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
    console.log(`Секция изменена: ${changedPath}`)
    await generateLanding()
    // Vite HMR автоматически обновит страницу
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
      // Перечитываем конфигурацию
      const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8')
      const newConfig = JSON.parse(jsonContent)

      if (!newConfig.sections) {
        throw new Error('В JSON файле отсутствует массив sections')
      }

      // Определяем корневую директорию проекта
      const rootDir = __dirname

      // Преобразуем относительные пути в абсолютные относительно корня проекта
      newConfig.sections = newConfig.sections.map(sectionPath => {
        if (path.isAbsolute(sectionPath)) {
          return sectionPath
        } else {
          return path.resolve(rootDir, sectionPath)
        }
      })

      // Обновляем конфигурацию
      configData = newConfig

      // Обновляем отслеживаемые файлы
      watcher.unwatch('*')
      watcher.add(configData.sections)

      console.log('Обновлен список секций:', configData.sections)

      // Перегенерируем лэндинг
      await generateLanding()
      // Vite HMR автоматически обновит страницу
    } catch (error) {
      console.error(`Ошибка при обновлении конфигурации: ${error.message}`)
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
