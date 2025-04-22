import fs from 'fs';
import path from 'path';
import {build} from 'vite';

const JSON_PATH = process.argv[2];

if (!JSON_PATH) {
  console.error('❌ Укажи путь к config.json');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
const cmsDir = path.resolve('@CMS');

if (fs.existsSync(cmsDir)) fs.rmSync(cmsDir, {recursive: true});
if (fs.existsSync('dist')) fs.rmSync('dist', {recursive: true});
fs.mkdirSync(cmsDir);

async function processSection(sectionPath) {
  const html = fs.readFileSync(sectionPath, 'utf-8');

  const cssMatch = html.match(/<link[^>]*href="([^"]+)"[^>]*\/?>/i);
  const jsMatch = html.match(/<script[^>]*src="([^"]+)"[^>]*><\/script>/i);

  const cssRelPath = cssMatch ? cssMatch[1] : null;
  const jsRelPath = jsMatch ? jsMatch[1] : null;

  const cssPath = cssRelPath ? path.resolve(path.dirname(sectionPath), cssRelPath) : null;
  const jsPath = jsRelPath ? path.resolve(path.dirname(sectionPath), jsRelPath) : null;

  const sectionName = path.basename(sectionPath, '.html');
  const outputDir = `dist/${sectionName}`;

  let cssOutput = '';
  let jsOutput = '';

  // 🎨 Сборка CSS
  if (cssPath) {
    await build({
      build: {
        rollupOptions: {
          input: cssPath,
          output: {
            dir: outputDir,
            format: 'es',
            assetFileNames: `assets/${sectionName}.css`
          }
        },
        cssCodeSplit: false,
        emptyOutDir: false,
        logLevel: 'silent'
      }
    });

    cssOutput = fs.readFileSync(`${outputDir}/assets/${sectionName}.css`, 'utf-8');
  }

  // ⚡ Сборка JS
  if (jsPath) {
    await build({
      build: {
        rollupOptions: {
          input: jsPath,
          output: {
            dir: outputDir,
            format: 'es',
            inlineDynamicImports: true,
            entryFileNames: `assets/${sectionName}.js`
          }
        },
        minify: 'terser',
        emptyOutDir: false,
        logLevel: 'silent'
      }
    });

    jsOutput = fs.readFileSync(`${outputDir}/assets/${sectionName}.js`, 'utf-8');
  }

  // 🧼 Чистим HTML от link и script
  const cleanedHtml = html
    .replace(/<link[^>]*href="[^"]+"[^>]*\/?>/gi, '')
    .replace(/<script[^>]*src="[^"]+"[^>]*><\/script>/gi, '');

  // 📝 Формируем финальный HTML
  const finalHtml = `
${cssOutput ? `<style>${cssOutput}</style>` : ''}
${cleanedHtml.trim()}
${jsOutput ? `<script type="module">${jsOutput}</script>` : ''}
  `;

  // 📂 Сохраняем в @CMS
  fs.writeFileSync(path.join(cmsDir, `coral-next-${sectionName}.html`), finalHtml.trim());

  console.log(`✅ Секция [${sectionName}] успешно собрана!`);
}


(async () => {
  for (const section of config.sections) {
    await processSection(section);
  }
  console.log('🚀 Все секции собраны в @CMS');
})();
