#!/usr/bin/env node

import path from 'path';
import {execSync} from 'child_process';
import inquirer from 'inquirer';
import {buildAll} from '../lib/build.js';

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
          console.log('Укажите папку для инициализации: b2c-landing-vite init <target-dir>');
          process.exit(1);
        }
        const cmd = `npx create-b2c-landing-vite@latest "${targetDir}"`;
        console.log(`Создаём новый проект с помощью шаблона...`);
        execSync(cmd, {stdio: 'inherit', shell: true});

        // Спрашиваем про доп. пакеты
        const features = await askExtrasWithCheckboxes();
        let deps = features.filter(f => ['sass', 'vue', 'less', 'pug'].includes(f));
        if (!deps.includes('sass')) {
          deps.unshift('sass');
        }
        console.log(`Устанавливаем зависимости: ${deps.join(', ')}`);
        execSync(`npm install --save-dev ${deps.join(' ')}`, {
          cwd: path.resolve(process.cwd(), targetDir),
          stdio: 'inherit',
          shell: true,
        });
        if (features.includes('git')) {
          execSync('git init', {
            cwd: path.resolve(process.cwd(), targetDir),
            stdio: 'inherit',
            shell: true,
          });
          console.log('Git-репозиторий инициализирован!');
        }
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
