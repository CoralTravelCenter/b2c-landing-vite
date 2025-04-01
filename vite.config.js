import {defineConfig} from 'vite';

export default defineConfig({
  root: '.', // корень проекта
  server: {
    watch: {
      usePolling: true,
    },
    fs: {
      strict: false,
    }
  },
  appType: 'custom', // отключает встроенный HTML-рендеринг Vite
  logLevel: 'info'
});
