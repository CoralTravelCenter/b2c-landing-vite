import {execSync} from "child_process";
import {askExtrasWithCheckboxes} from "./askExtrasWithCheckboxes.js";
import fs from "fs";
import path from "path";

/**
 * Инициализирует проект в указанной директории:
 * - Создаёт директорию
 * - Спрашивает дополнительные опции
 * - Устанавливает шаблон
 * - Обновляет landing.page.json с именем папки
 * - Устанавливает зависимости
 * - Опционально инициализирует git и создаёт .gitignore
 *
 * @param {string} targetDir - Название папки, в которую будет установлен проект
 * @param {string} defaultShell - Путь к используемой оболочке (например, '/bin/zsh' или 'cmd.exe')
 * @returns {Promise<void>}
 */
export async function handleInit(targetDir, defaultShell) {
  if (!targetDir) {
    console.log('⚠️ Укажите папку для инициализации: b2c-landing-vite init <target-dir>');
    process.exit(1);
  }
  fs.mkdirSync(path.resolve(process.cwd(), targetDir), {recursive: true});

  const features = await askExtrasWithCheckboxes();
  let deps = features.filter(f => ['sass', 'vue', 'less', 'pug'].includes(f));
  if (!deps.includes('sass')) deps.unshift('sass');
  console.log(`📦 Устанавливаем зависимости: ${deps.join(', ')}`);

  const needGit = features.includes('git');
  const fullPath = path.resolve(process.cwd(), targetDir);
  const folderName = path.basename(fullPath);

  execSync(`npx create-b2c-landing-vite@latest`, {
    cwd: fullPath,
    stdio: 'inherit',
    shell: defaultShell,
    env: {...process.env, SHELL: defaultShell}
  });

  const gitFolder = path.join(fullPath, '.git');
  if (fs.existsSync(gitFolder)) {
    fs.rmSync(gitFolder, {recursive: true, force: true});
  }

  const glob = await import('glob');
  const jsonFiles = glob.globSync('**/landing.page.json', {cwd: fullPath, absolute: true});
  jsonFiles.forEach(file => {
    const json = JSON.parse(fs.readFileSync(file, 'utf-8'));
    if (json.env?.cdnAssetsURL) {
      json.env.cdnAssetsURL = json.env.cdnAssetsURL.replace('<название вашей папки>', folderName);
      fs.writeFileSync(file, JSON.stringify(json, null, 2), 'utf-8');
    }
  });

  const gitignoreSrc = path.join(fullPath, '.gitignore');
  if (fs.existsSync(gitignoreSrc)) {
    fs.copyFileSync(gitignoreSrc, path.join(fullPath, '.gitignore'));
  }

  execSync(`npm install --save-dev ${deps.join(' ')}`, {
    cwd: fullPath,
    stdio: 'inherit',
  });

  if (needGit) {
    execSync('git init', {cwd: fullPath, stdio: 'inherit'});
    const gitignoreLines = [
      'node_modules', 'dev', '@CMS', '.DS_Store', 'Thumbs.db',
      '.idea', '.vscode', '*.log', 'npm-debug.log', '.env'
    ];
    fs.writeFileSync(path.join(fullPath, '.gitignore'), gitignoreLines.join('\n') + '\n', 'utf-8');
    console.log('📁 Git-репозиторий инициализирован');
  }

  console.log('✅ Шаблон успешно установлен в текущей директории');
}
