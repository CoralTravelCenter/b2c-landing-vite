import * as cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

export function combineIntoLandingPage(sections, templatePath) {
  try {
    // Проверяем существование шаблона
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Шаблон не найден: ${templatePath}`)
    }

    // Читаем шаблон
    const templateHTML = fs.readFileSync(templatePath, 'utf-8')
    
    // Загружаем шаблон в cheerio
    const $ = cheerio.load(templateHTML)
    
    // Создаем контейнер для всех секций
    let sectionsContent = ''
    
    // Обрабатываем каждую секцию
    sections.forEach(section => {
      if (section.html && section.html.trim() !== '') {
        // Загружаем HTML секции
        const $section = cheerio.load(section.html)
        
        // Находим все теги link для стилей
        const styleLinks = []
        $section('link[rel="stylesheet"]').each((i, elem) => {
          const href = $section(elem).attr('href')
          if (href) {
            styleLinks.push(href)
            // Удаляем тег link из секции
            $section(elem).remove()
          }
        })
        
        // Обновляем HTML секции без тегов link
        const sectionHtml = $section.html()
        
        // Добавляем HTML секции с импортами стилей
        sectionsContent += `<!-- Секция из ${path.basename(section.path)} -->\n`
        
        // Добавляем импорты стилей перед секцией
        if (styleLinks.length > 0) {
          sectionsContent += `<style>\n`
          styleLinks.forEach(href => {
            // Преобразуем относительный путь в абсолютный от корня проекта
            const absolutePath = href.startsWith('/') ? href : `/${href}`
            sectionsContent += `@import "${absolutePath}";\n`
          })
          sectionsContent += `</style>\n`
        }
        
        sectionsContent += sectionHtml + '\n\n'
      }
    })
    
    // Находим место для вставки контента (PAYLOAD PLACEHOLDER)
    const html = $.html()
    const placeholderPattern = /<!-- PAYLOAD PLACEHOLDER -->/
    
    // Заменяем плейсхолдер на содержимое секций
    if (placeholderPattern.test(html)) {
      const resultHTML = html.replace(placeholderPattern, sectionsContent)
      return resultHTML
    } else {
      console.warn('Плейсхолдер <!-- PAYLOAD PLACEHOLDER --> не найден в шаблоне. Вставляем секции в конец body.')
      $('body').append(sectionsContent)
      return $.html()
    }
  } catch (error) {
    throw new Error(`Ошибка при объединении секций: ${error.message}`)
  }
}
