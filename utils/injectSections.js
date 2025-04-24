import {readFileSync} from "fs";
import jsesc from "jsesc";

/**
 * Вставляет HTML-секции в шаблон страницы, заменяя плейсхолдеры на сгенерированный и экранированный HTML.
 * @param {string} baseHtmlPath - Путь к исходному HTML-файлу, содержащему плейсхолдеры для вставки.
 * @param htmlToInject
 * @returns {Promise<string>} Обновлённый HTML-файл с внедрёнными секциями.
 */

export async function injectSections(baseHtmlPath, htmlToInject) {
  const html = readFileSync(baseHtmlPath, 'utf-8')

  const escaped = jsesc(htmlToInject, {
    quotes: 'double',
    isScriptContext: true,
  })

  return html
    .replace('<!-- PAYLOAD PLACEHOLDER -->', htmlToInject)
    .replace('<!-- ESCAPED PAYLOAD PLACEHOLDER -->', escaped)
}
