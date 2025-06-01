#!/usr/bin/env node

import path from 'path';
import {buildAll} from '../lib/build.js';
import {handleInit} from "./bin_utils/handleInit.js";

const defaultShell = process.platform === 'win32'
  ? process.env.ComSpec || 'cmd.exe'
  : process.env.SHELL || '/bin/zsh';

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
      case 'init': {
        await handleInit(configArg, defaultShell)
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
