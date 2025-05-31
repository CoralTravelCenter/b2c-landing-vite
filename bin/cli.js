#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import {execSync} from 'child_process';
import readline from 'readline';
import {buildAll} from '../lib/build.js';

// args: [node, script, command, config?]
const [, , command = 'build', configArg] = process.argv;
const configPath = path.resolve(process.cwd(), configArg || 'build.config.json');

// Копирование шаблона (пока не используется)
function copyTemplate(srcDir, destDir) {
  fs.mkdirSync(destDir, {recursive: true});
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    if (fs.statSync(srcFile).isDirectory()) {
      copyTemplate(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}

async function askExtraDeps() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout});
    rl.question(
      'Хотите добавить поддержку vue, less, pug? Укажите нужные через пробел (например: vue pug), Enter — только sass: ',
      (answer) => {
        rl.close();
        const list = answer
          .split(' ')
          .map(x => x.trim())
          .filter(Boolean)
          .filter(x => ['vue', 'less', 'pug'].includes(x));
        resolve(list);
      }
    );
  });
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
          console.log('Укажите папку для инициализации: b2c-landing-vite init <target-dir>');
          process.exit(1);
        }
        const cmd = `npx create-b2c-landing-vite@latest "${targetDir}"`;
        console.log(`Создаём новый проект с помощью шаблона...`);
        execSync(cmd, {stdio: 'inherit'});

        // Спрашиваем про доп. пакеты
        const extraDeps = await askExtraDeps();
        const deps = ['sass', ...extraDeps];
        console.log(`Устанавливаем зависимости: ${deps.join(', ')}`);
        execSync(`npm install --save-dev ${deps.join(' ')}`, {
          cwd: path.resolve(process.cwd(), targetDir),
          stdio: 'inherit'
        });
        console.log('Все зависимости установлены!');
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
