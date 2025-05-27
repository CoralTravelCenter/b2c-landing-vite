import pug from 'pug';
import {existsSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'fs';
import path from 'path';
import {build} from 'vite';
import {DIRECTORIES, MESSAGES, PATH_TEMPLATES} from './constants.js';
import {getCssBuildConfig, getJsBuildConfig} from './configs.js';


// Функция для обработки одной секции
async function processSection(sectionPath, config, cmsDir) {
  // Чтение HTML секции
  let html;
  if (sectionPath.endsWith('.pug')) {
    html = pug.renderFile(sectionPath);
  } else {
    html = readFileSync(sectionPath, 'utf-8');
    // Заменяем пути ../assets/... на cdnAssetsURL из конфига
    const cdnAssetsURL = config.env.cdnAssetsURL.replace(/\/$/, '');
    html = html.replace(/(["'(])\.\.\/assets\/([^"')]+)/g, `$1${cdnAssetsURL}/$2`);
    html = html.replace(/style\s*=\s*"(.*?)"/g, (match, styleContent) => {
      const replacedStyle = styleContent.replace(/(["'(])\.\.\/assets\/([^"')]+)/g, `$1${cdnAssetsURL}/$2`);
      return `style="${replacedStyle}"`;
    });
  }

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
    const rawCss = readFileSync(`${outputDir}/${PATH_TEMPLATES.assetCss(sectionName)}`, 'utf-8');
    cssOutput = rawCss.replace(/^@charset\s+"UTF-8";\s*/i, '');
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


export async function buildAll(configPath) {
  const config = JSON.parse(readFileSync(configPath, 'utf-8'));
  const cmsDir = path.resolve(DIRECTORIES.CMS);

  if (existsSync(cmsDir)) rmSync(cmsDir, {recursive: true});
  if (existsSync(DIRECTORIES.DIST)) rmSync(DIRECTORIES.DIST, {recursive: true});
  mkdirSync(cmsDir);

  for (const section of config.sections) {
    await processSection(section, config, cmsDir);
  }

  console.log(MESSAGES.ALL_SECTIONS_BUILT);
}
