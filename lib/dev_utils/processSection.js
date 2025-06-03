import * as cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import pug from 'pug'

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

    let content;
    if (sectionPath.endsWith('.pug')) {
      content = pug.renderFile(sectionPath);
    } else {
      content = fs.readFileSync(sectionPath, 'utf-8');
    }
    const $ = cheerio.load(content)
    const sectionDir = path.dirname(sectionPath)

    $('link[rel="stylesheet"]').each((i, elem) => {
      const href = $(elem).attr('href');
      if (!href) return;

      const ext = path.extname(href);
      if (ext === '.scss' || ext === '.less') {
        const resolvedPath = path.resolve(sectionDir, href);

        let vitePath;
        if (process.platform === 'win32') {
          // Убираем букву диска (например, C:) и нормализуем к Unix-формату
          const normalizedPath = resolvedPath.replace(/^([a-zA-Z]:)/, '').replace(/\\/g, '/');
          vitePath = normalizedPath.startsWith('/') ? normalizedPath : '/' + normalizedPath;
        } else {
          vitePath = resolvedPath;
        }
        $(elem).attr('href', vitePath);
        $(elem).attr('type', 'text/css');
      }
    });


    $('script[src]').each((i, elem) => {
      const src = $(elem).attr('src')
      if (src) {
        const jsPath = path.resolve(sectionDir, src)
        if (fs.existsSync(jsPath)) {
          $(elem).attr('src', jsPath)
          $(elem).attr('type', 'module')
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
