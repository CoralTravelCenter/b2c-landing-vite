import vue from "@vitejs/plugin-vue";
import {PATH_TEMPLATES} from './constants.js';

// Общие настройки для Vite сборки
export const VITE_COMMON = {
  logLevel: 'silent',      // Минимум логов при сборке
  emptyOutDir: false,      // Не очищать директорию перед сборкой
};

// Функция для генерации конфига сборки CSS
export function getCssBuildConfig(cssPath, outputDir, sectionName) {
  return {
    build: {
      rollupOptions: {
        input: cssPath,
        output: {
          dir: outputDir,
          format: 'es',
          assetFileNames: PATH_TEMPLATES.assetCss(sectionName),
        },
      },
      cssCodeSplit: false,   // Отключаем разделение CSS
      ...VITE_COMMON
    }
  };
}

// Функция для генерации конфига сборки JS
export function getJsBuildConfig(jsPath, outputDir, sectionName) {
  return {
    plugins: [vue()],   // Подключаем React и Vue плагины
    build: {
      rollupOptions: {
        input: jsPath,
        output: {
          dir: outputDir,
          format: 'es',
          inlineDynamicImports: true,   // Инлайновые динамические импорты
          entryFileNames: PATH_TEMPLATES.assetJs(sectionName),
        },
      },
      minify: 'terser',    // Минификация с помощью Terser
      ...VITE_COMMON
    }
  };
}

// Функция для генерации конфига dev режима
export function VITE_SERVER_CONFIG(devDir) {
  return {
    plugins: [vue()],
    server: {
      middlewareMode: true,
      hmr: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    appType: 'spa',
    root: devDir,
    publicDir: false,
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };
}

// Настройка остлеживания изменений в файлах
export const WATCHER_SETTINGS = {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300,
    pollInterval: 100,
  },
};
