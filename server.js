import express from 'express'
import fs from 'fs-extra'
import { resolve } from 'path'
import ViteExpress from 'vite-express'
import { readJson } from './utils/readJson.js'

const app = express()
const PORT = 3000

// Получаем путь к JSON-файлу из аргумента командной строки
const JSON_PATH = process.argv[2]

function getIndexHtml() {
	// Указываем путь к файлу
	const BRAND = readJson(JSON_PATH)
	console.log(BRAND)
	const INDEX_HTML_PATH = resolve(
		process.cwd(),
		`web-root/${BRAND.env.brand}/content.desktop.html`
	)

	// Проверяем, существует ли файл
	if (!fs.existsSync(INDEX_HTML_PATH)) {
		console.error(`❌ Файл не найден: ${INDEX_HTML_PATH}`)
		process.exit(1)
	}

	// Определяем папку, где лежат статические файлы и раздаём их
	const staticDir = resolve(process.cwd(), `web-root/${BRAND.env.brand}`)
	app.use(express.static(staticDir))

	return INDEX_HTML_PATH
}

// Раздаём `content.desktop.html` при запросе `/`
app.get('/', (req, res) => {
	res.sendFile(getIndexHtml())
})

// Запускаем сервер с Vite
ViteExpress.listen(app, PORT, () => {
	console.log(`🚀 Сервер запущен на http://localhost:${PORT}`)
})
