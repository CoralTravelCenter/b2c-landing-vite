import * as cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Получаем текущую директорию для ES модулей
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Читает и обрабатывает HTML-файл секции
 * @param {string} sectionPath - Путь к файлу секции
 * @param {object} vite - Экземпляр Vite сервера
 * @returns {Promise<Object>} - Объект с HTML, CSS и JS содержимым секции
 */
// Изменяем функцию, чтобы не собирать CSS импорты
export async function processSection(sectionPath, vite) {
	try {
		// Проверяем существование файла
		if (!fs.existsSync(sectionPath)) {
			throw new Error(`Файл секции не найден: ${sectionPath}`)
		}

		// Читаем содержимое файла
		const content = fs.readFileSync(sectionPath, 'utf-8')

		// Загружаем HTML в cheerio для парсинга
		const $ = cheerio.load(content)

		// Директория, в которой находится файл секции
		const sectionDir = path.dirname(sectionPath)

		// Обрабатываем внешние стили
		let cssContent = ''
		const cssLinks = []

		// Изменяем обработку стилей
		// Обрабатываем таблицы стилей, но не собираем их для импорта в head
		$('link[rel="stylesheet"]').each((i, elem) => {
			const href = $(elem).attr('href')
			if (href) {
				// Преобразуем относительный путь в абсолютный
				const cssPath = path.resolve(sectionDir, href)

				// Для SCSS файлов позволим Vite обрабатывать их напрямую
				if (cssPath.endsWith('.scss') || cssPath.endsWith('.sass')) {
					// Используем абсолютный путь от корня проекта, как для скриптов
					$(elem).attr('href', cssPath)
					$(elem).attr('type', 'text/scss')
					console.log(`Обновлена ссылка на SCSS: ${cssPath}`)
				}
			}
		})

		// Объединяем все импорты стилей
		if (cssLinks.length > 0) {
			cssContent = cssLinks.join('\n')
		}

		// Обрабатываем скрипты
		$('script[src]').each((i, elem) => {
			const src = $(elem).attr('src')
			if (src) {
				// Преобразуем относительный путь в абсолютный
				const jsPath = path.resolve(sectionDir, src)

				// Обновляем атрибут src для работы с Vite HMR
				if (fs.existsSync(jsPath)) {
					$(elem).attr('src', jsPath)
					$(elem).attr('type', 'module')
					console.log(`Обновлена ссылка на скрипт: ${jsPath}`)
				} else {
					console.warn(`Файл скрипта не найден: ${jsPath}`)
				}
			}
		})

		// Получаем обработанный HTML
		const htmlContent = $.html()

		// Возвращаем без CSS контента для head
		return {
			html: $.html(),
			path: sectionPath,
		}
	} catch (error) {
		console.error(
			`Ошибка при обработке секции ${sectionPath}: ${error.message}`
		)
		return {
			html: '',
			css: '',
			path: sectionPath,
			error: error.message,
		}
	}
}
