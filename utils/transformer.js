import {readJson} from "./readJson.js";
import fs from "fs-extra";
import jsesc from "jsesc";

export function transformer(html, req) {
  let widgetHtml = ''

  try {
    const json = readJson(JSON_PATH)
    const sectionPaths = json.sections || []

    console.log('🧩 Загрузка секций из:', sectionPaths)

    widgetHtml = sectionPaths
      .map(relativePath => {
        const fullPath = resolve(process.cwd(), relativePath)
        if (fs.existsSync(fullPath)) {
          console.log(`✅ Чтение: ${fullPath}`)
          return fs.readFileSync(fullPath, 'utf-8')
        } else {
          console.warn(`⚠️ Файл не найден: ${fullPath}`)
          return ''
        }
      })
      .join('\n')
  } catch (err) {
    console.error('❌ Ошибка при загрузке JSON-файла:', err)
  }

  const escaped = jsesc(widgetHtml, {
    quotes: 'double',
    isScriptContext: true,
    json: true
  })

  console.log('🔒 Экранированный HTML для вставки:', escaped.slice(0, 100) + '...')

  const scriptRegex = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/

  if (!scriptRegex.test(html)) {
    console.warn('⚠️ Не найден <script id="__NEXT_DATA__"> в HTML')
    return html
  }

  html = html.replace(scriptRegex, (_, jsonContent) => {
    let parsed
    try {
      parsed = JSON.parse(jsonContent)
      console.log('✅ JSON из __NEXT_DATA__ успешно распарсен')
    } catch (err) {
      console.error('❌ Ошибка при парсинге JSON из __NEXT_DATA__:', err)
      return _
    }

    let replacedCount = 0

    const replaceInObject = obj => {
      if (typeof obj === 'string' && obj.trim() === '{{custom_widget}}') {
        replacedCount++
        return escaped
      } else if (Array.isArray(obj)) {
        return obj.map(replaceInObject)
      } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          obj[key] = replaceInObject(obj[key])
        }
      }
      return obj
    }

    replaceInObject(parsed)

    console.log(`🧠 Заменено значений: ${replacedCount}`)

    if (replacedCount === 0) {
      console.warn('⚠️ Значение "{{custom_widget}}" не найдено в JSON')
    }

    const newJson = JSON.stringify(parsed)
    return `<script id="__NEXT_DATA__" type="application/json">${newJson}</script>`
  })

  return html
}
