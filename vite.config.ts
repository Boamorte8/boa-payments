import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url)
      ),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@atoms': fileURLToPath(new URL('./src/atoms', import.meta.url)),
      '@molecules': fileURLToPath(new URL('./src/molecules', import.meta.url)),
      '@organisms': fileURLToPath(new URL('./src/organisms', import.meta.url)),
      '@templates': fileURLToPath(new URL('./src/templates', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup-env.ts'],
  },
});
