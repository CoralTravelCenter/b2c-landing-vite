import fs from 'fs';
import jsesc from 'jsesc';

export function rebuildHtml(baseHtmlPath, sectionPaths) {
  console.log('🔁 Пересборка HTML...');
  const html = fs.readFileSync(baseHtmlPath, 'utf-8');

  const injected = sectionPaths
    .map(p => {
      if (fs.existsSync(p)) {
        return fs.readFileSync(p, 'utf-8');
      } else {
        console.warn(`⚠️ Секция не найдена: ${p}`);
        return '';
      }
    })
    .join('\n');

  const escaped = jsesc(injected, {
    quotes: 'double',
    isScriptContext: true
  });

  const result = html
    .replace('<!-- PAYLOAD PLACEHOLDER -->', injected)
    .replace('<!-- ESCAPED PAYLOAD PLACEHOLDER -->', escaped);

  // Проверка JSON в __NEXT_DATA__
  const match = result.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
  );

  if (match) {
    try {
      JSON.parse(match[1]);
      console.log('✅ JSON в __NEXT_DATA__ валиден');
    } catch (e) {
      console.error('❌ Ошибка в JSON после вставки!');
      console.error(e.message);
    }
  } else {
    console.warn('⚠️ __NEXT_DATA__ не найден для валидации');
  }

  return result;
}
