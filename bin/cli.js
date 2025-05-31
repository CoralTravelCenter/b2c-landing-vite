#!/usr/bin/env node

import path from 'path';
import {execSync} from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs';
import {buildAll} from '../lib/build.js';

const defaultShell = process.platform === 'win32'
  ? process.env.ComSpec || 'cmd.exe'
  : process.env.SHELL || '/bin/zsh';

// args: [node, script, command, config?]
const [, , command = 'build', configArg] = process.argv;
const configPath = path.resolve(process.cwd(), configArg || 'build.config.json');


async function askExtrasWithCheckboxes() {
  const {features} = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'features',
      message: 'Что добавить в проект?',
      choices: [
        {name: 'Sass', value: 'sass', checked: true},
        {name: 'Vue', value: 'vue'},
        {name: 'Less', value: 'less'},
        {name: 'Pug', value: 'pug'},
        {name: 'Инициализировать git-репозиторий', value: 'git'},
      ]
    }
  ]);
  return features;
}

(async () => {
  try {
    switch (command) {
      case 'dev': {
        const {default: dev} = await import('../lib/server.js');
        await dev(configPath);
        break;
      }
      case 'deploy': {
        const {default: deploy} = await import('../lib/deploy.js');
        await deploy(configPath);
        break;
      }
      case 'init': {
        const targetDir = configArg;
        if (!targetDir) {
          console.log('⚠️  Укажите папку для инициализации: b2c-landing-vite init <target-dir>');
          process.exit(1);
        }
        fs.mkdirSync(path.resolve(process.cwd(), targetDir), {recursive: true});
        // Сначала спрашиваем про опции
        const features = await askExtrasWithCheckboxes();
        let deps = features.filter(f => ['sass', 'vue', 'less', 'pug'].includes(f));
        if (!deps.includes('sass')) {
          deps.unshift('sass');
        }
        const needGit = features.includes('git');

        const fullPath = path.resolve(process.cwd(), targetDir);
        const folderName = path.basename(fullPath);

        execSync(`npx create-b2c-landing-vite@latest`, {
          cwd: fullPath,
          stdio: 'inherit',
          shell: defaultShell,
          env: {
            ...process.env,
            SHELL: defaultShell,
          }
        });

        const gitFolder = path.join(fullPath, '.git');
        if (fs.existsSync(gitFolder)) {
          fs.rmSync(gitFolder, {recursive: true, force: true});
        }

        // Обработка landing.page.json файлов
        const glob = await import('glob');
        const jsonFiles = glob.globSync('**/landing.page.json', {cwd: fullPath, absolute: true});
        jsonFiles.forEach(file => {
          const json = JSON.parse(fs.readFileSync(file, 'utf-8'));
          if (json.env && typeof json.env.cdnAssetsURL === 'string') {
            json.env.cdnAssetsURL = json.env.cdnAssetsURL.replace('<название вашей папки>', folderName);
            fs.writeFileSync(file, JSON.stringify(json, null, 2), 'utf-8');
          }
        });
        path.join(fullPath, 'site');

        const gitignoreSrc = path.join(fullPath, '.gitignore');
        if (fs.existsSync(gitignoreSrc)) {
          fs.copyFileSync(gitignoreSrc, path.join(fullPath, '.gitignore'));
        }

        console.log(`📦 Устанавливаем зависимости: ${deps.join(', ')}`);
        execSync(`npm install --save-dev ${deps.join(' ')}`, {
          cwd: path.resolve(process.cwd(), targetDir),
          stdio: 'inherit',
        });
        if (needGit) {
          // Инициализация нового репозитория
          execSync('git init', {
            cwd: path.resolve(process.cwd(), targetDir),
            stdio: 'inherit',
          });
          // Генерация .gitignore
          const gitignoreContent = `
            node_modules
            dev
            @CMS
            .DS_Store
            Thumbs.db
            .idea
            .vscode
            *.log
            npm-debug.log
            .env
          `.trim() + '\n';
          const gitignorePathFinal = path.join(fullPath, '.gitignore');
          fs.writeFileSync(gitignorePathFinal, gitignoreContent, 'utf-8');
          console.log('📁 Git-репозиторий инициализирован');
        }
        console.log('✅ Шаблон успешно установлен в текущей директории');
        break;
      }
      case 'build':
      default: {
        await buildAll(configPath);
        break;
      }
    }
  } catch (err) {
    console.error(`Ошибка при выполнении команды "${command}":`, err.message);
    process.exit(1);
  }
})();
