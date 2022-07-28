import { fileURLToPath, URL } from 'url';
import path from 'path';

import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueI18n from '@intlify/vite-plugin-vue-i18n';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueI18n({
      include: path.resolve(__dirname, './src/i18n/**'),
    }),
  ],
  resolve: {
    alias: {
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
    deps: {
      inline: ['@vue', '@vueuse'],
    },
    setupFiles: ['./src/tests/setup-env.ts', './src/tests/setup.ts'],
  },
});
