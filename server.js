import express from 'express'
import ViteExpress from 'vite-express'
import {exec} from 'child_process'
import {getIndexHtml} from "./utils/getIndexHtml.js";
import {transformer} from "./utils/transformer.js";

const app = express()
const PORT = 3000
const JSON_PATH = process.argv[2]

// app.get('/', (req, res) => {
//   res.sendFile(getIndexHtml(app, JSON_PATH))
// })

ViteExpress.config({
  transformer,
  entry: getIndexHtml(app, JSON_PATH) // обязательно вернуть путь до HTML
})

ViteExpress.listen(app, PORT, () => {
  const url = `http://localhost:${PORT}`
  console.log(`🚀 Сервер запущен на ${url}`)
  exec(process.platform === 'win32' ? `start ${url}` : process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`)
})
