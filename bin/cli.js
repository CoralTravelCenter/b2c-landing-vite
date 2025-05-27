#!/usr/bin/env node

import path from 'path';
import {fileURLToPath} from 'url';
import {buildAll} from '../lib/build.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// args: [node, script, command, config?]
const [, , command = 'build', configArg] = process.argv;
const configPath = path.resolve(process.cwd(), configArg || 'build.config.json');

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
