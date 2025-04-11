import * as cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

/**
 * Читает и обрабатывает HTML-файл секции
 * @param {string} sectionPath - Путь к файлу секции
 * @returns {Promise<{ html: string, path: string, error?: string }>} - Объект с HTML и путём к секции
 */

export async function processSection(sectionPath) {
  try {
    if (!fs.existsSync(sectionPath)) {
      throw new Error(`Файл секции не найден: ${sectionPath}`)
    }

    const content = fs.readFileSync(sectionPath, 'utf-8')
    const $ = cheerio.load(content)
    const sectionDir = path.dirname(sectionPath)

    $('link[rel="stylesheet"]').each((i, elem) => {
      const href = $(elem).attr('href')
      if (href) {
        const cssPath = path.resolve(sectionDir, href)
        if (cssPath.endsWith('.scss') || cssPath.endsWith('.sass')) {
          $(elem).attr('href', cssPath)
          $(elem).attr('type', 'text/scss')
          console.log(`Обновлена ссылка на SCSS: ${cssPath}`)
        }
      }
    })

    $('script[src]').each((i, elem) => {
      const src = $(elem).attr('src')
      if (src) {
        const jsPath = path.resolve(sectionDir, src)
        if (fs.existsSync(jsPath)) {
          $(elem).attr('src', jsPath)
          $(elem).attr('type', 'module')
          console.log(`Обновлена ссылка на скрипт: ${jsPath}`)
        } else {
          console.warn(`Файл скрипта не найден: ${jsPath}`)
        }
      }
    })

    return {
      html: $.html(),
      path: sectionPath,
    }
  } catch (error) {
    console.error(`Ошибка при обработке секции ${sectionPath}: ${error.message}`)
    return {
      html: '',
      path: sectionPath,
      error: error.message,
    }
  }
}
