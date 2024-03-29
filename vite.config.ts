import path from 'path';
import { fileURLToPath, URL } from 'url';

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    VueI18nPlugin({
      runtimeOnly: command === 'serve',
      include: path.resolve(__dirname, './src/i18n/locales/**'),
    }),
    VitePWA({
      mode: command === 'serve' ? 'development' : 'production',
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw-code.ts',
      devOptions: {
        enabled: command === 'serve',
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Boa Payments',
        short_name: 'BoaPay',
        description: 'Boa Payments help you handle your lends and borrows',
        theme_color: '#1d1e26',
        background_color: '#1d1e26',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
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
      '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
    },
  },
}));
