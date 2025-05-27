import * as cheerio from 'cheerio'

/**
 * Объединяет массив HTML-секций в одну строку.
 * @param {{ html: string, path: string }[]} sections - Массив секций, каждая из которых содержит HTML-код и путь.
 * @returns {string} Объединённый HTML всех секций.
 */
export function combineIntoLandingPage(sections) {
  let sectionsContent = '';

  sections.forEach(section => {
    if (section.html && section.html.trim() !== '') {
      const $section = cheerio.load(section.html);

      const styleLinks = [];
      $section('link[rel="stylesheet"]').each((i, elem) => {
        const href = $section(elem).attr('href');
        if (href) {
          styleLinks.push(href);
          $section(elem).remove();
        }
      });

      const sectionBody = $section('body').html() || $section.root().html();

      sectionsContent += '<div>\n';

      if (styleLinks.length > 0) {
        sectionsContent += `<style>\n`;
        styleLinks.forEach(href => {
          const absolutePath = href.startsWith('/') ? href : `/${href}`;
          sectionsContent += `@import "${absolutePath}";\n`;
        });
        sectionsContent += `</style>\n`;
      }

      sectionsContent += `${sectionBody.trim()}\n`;
      sectionsContent += '</div>\n\n';
    }
  });

  return sectionsContent;
}
