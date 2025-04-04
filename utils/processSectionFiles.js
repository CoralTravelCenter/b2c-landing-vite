import fs from 'fs';
import {resolve} from 'path';

// Функция для обработки секций
export async function processSectionFiles(sectionPath, vite) {
  const sectionHtml = fs.readFileSync(sectionPath, 'utf-8'); // Чтение секции
  let updatedHtml = sectionHtml;

  // Поиск всех ссылок на стили
  const linkRegex = /<link rel="stylesheet" href="([^"]+)">/g;
  let match;

  // Обработка каждого <link>
  while ((match = linkRegex.exec(sectionHtml)) !== null) {
    const href = match[1];
    // Формируем путь с учетом папки 'coral.ru'
    const fullPath = resolve(process.cwd(), 'site', 'coral.ru', href.replace(/^\/+/, ''));

    // Обрабатываем файл SCSS через Vite
    const result = await vite.transformRequest(fullPath);
    if (result?.code) {
      updatedHtml = updatedHtml.replace(match[0], `<style>${result.code}</style>`); // Заменяем link на style с кодом
    } else {
      console.warn(`⚠️ Не удалось обработать CSS через Vite: ${fullPath}`);
    }
  }

  // Поиск всех скриптов
  const scriptRegex = /<script[^>]+src="([^"]+)">/g;

  // Обработка каждого <script>
  while ((match = scriptRegex.exec(sectionHtml)) !== null) {
    const src = match[1];
    // Формируем путь с учетом папки 'coral.ru'
    const fullPath = resolve(process.cwd(), 'site', 'coral.ru', src.replace(/^\/+/, ''));

    // Обрабатываем файл JS через Vite
    const result = await vite.transformRequest(fullPath);
    if (result?.code) {
      updatedHtml = updatedHtml.replace(match[0], `<script type="module">${result.code}</script>`); // Заменяем script на обработанный
    } else {
      console.warn(`⚠️ Не удалось обработать JS через Vite: ${fullPath}`);
    }
  }

  return updatedHtml;  // Возвращаем обновленный HTML
}
