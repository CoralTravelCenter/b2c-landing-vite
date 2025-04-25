import {existsSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'fs';
import path from 'path';
import {build} from 'vite';
import {DIRECTORIES, JSON_PATH, MESSAGES, PATH_TEMPLATES} from './constants.js';
import {getCssBuildConfig, getJsBuildConfig} from './configs.js';


if (!JSON_PATH) {
  console.error(MESSAGES.NO_JSON_PATH);
  process.exit(1);
}

// Чтение и парсинг конфигурационного файла
const config = JSON.parse(readFileSync(JSON_PATH, 'utf-8'));
const cmsDir = path.resolve(DIRECTORIES.CMS);

// Очистка рабочих директорий перед сборкой
if (existsSync(cmsDir)) rmSync(cmsDir, {recursive: true});
if (existsSync(DIRECTORIES.DIST)) rmSync(DIRECTORIES.DIST, {recursive: true});
mkdirSync(cmsDir);

// Функция для обработки одной секции
async function processSection(sectionPath) {
  // Чтение HTML секции
  const html = readFileSync(sectionPath, 'utf-8');

  // Поиск подключённых CSS и JS файлов в HTML
  const cssMatch = html.match(/<link[^>]*href="([^"]+)"[^>]*\/?>/i);
  const jsMatch = html.match(/<script[^>]*src="([^"]+)"[^>]*><\/script>/i);

  const cssRelPath = cssMatch ? cssMatch[1] : null;
  const jsRelPath = jsMatch ? jsMatch[1] : null;

  // Получение абсолютных путей к CSS и JS файлам
  const cssPath = cssRelPath ? path.resolve(path.dirname(sectionPath), cssRelPath) : null;
  const jsPath = jsRelPath ? path.resolve(path.dirname(sectionPath), jsRelPath) : null;

  const sectionName = path.basename(sectionPath, '.html');
  const outputDir = `${DIRECTORIES.DIST}/${sectionName}`;

  let cssOutput = '';
  let jsOutput = '';

  // Сборка CSS, если он присутствует
  if (cssPath) {
    await build(getCssBuildConfig(cssPath, outputDir, sectionName));
    cssOutput = readFileSync(`${outputDir}/${PATH_TEMPLATES.assetCss(sectionName)}`, 'utf-8');
  }

  // Сборка JS, если он присутствует
  if (jsPath) {
    await build(getJsBuildConfig(jsPath, outputDir, sectionName));
    jsOutput = readFileSync(`${outputDir}/${PATH_TEMPLATES.assetJs(sectionName)}`, 'utf-8');
  }

  // Очистка HTML от старых link и script тегов
  const cleanedHtml = html
    .replace(/<link[^>]*href="[^"]+"[^>]*\/?>/gi, '')
    .replace(/<script[^>]*src="[^"]+"[^>]*><\/script>/gi, '');

  // Формирование финального HTML с инлайновыми стилями и скриптами
  const finalHtml = `
${cssOutput ? `<style>${cssOutput}</style>` : ''}
${cleanedHtml.trim()}
${jsOutput ? `<script type="module">${jsOutput}</script>` : ''}
  `;

  // Сохранение финального HTML в директорию CMS
  writeFileSync(path.join(cmsDir, PATH_TEMPLATES.cmsFile(sectionName)), finalHtml.trim());

  console.log(MESSAGES.SECTION_BUILT(sectionName));
}

// Запуск процесса сборки всех секций
(async () => {
  for (const section of config.sections) {
    await processSection(section);
  }
  console.log(MESSAGES.ALL_SECTIONS_BUILT);
})();
