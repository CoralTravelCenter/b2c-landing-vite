import {processSectionFiles} from './processSectionFiles.js';
import fs from "fs";
import jsesc from "jsesc"; // путь к файлу с функцией

export async function rebuildHtmlWithSections(baseHtmlPath, sectionPaths, vite) {
  const html = fs.readFileSync(baseHtmlPath, 'utf-8');
  const injectedSections = [];

  for (const sectionPath of sectionPaths) {
    if (fs.existsSync(sectionPath)) {
      const sectionHtml = await processSectionFiles(sectionPath, vite);
      injectedSections.push(sectionHtml);
    } else {
      console.warn(`⚠️ Секция не найдена: ${sectionPath}`);
      injectedSections.push('');
    }
  }

  const injected = injectedSections.join('\n');
  const escaped = jsesc(injected, {
    quotes: 'double',
    isScriptContext: true
  });

  return html
    .replace('<!-- PAYLOAD PLACEHOLDER -->', injected)
    .replace('<!-- ESCAPED PAYLOAD PLACEHOLDER -->', escaped);
}
