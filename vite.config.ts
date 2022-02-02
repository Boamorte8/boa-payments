import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), checker({
    // typescript: {
    //   root: './src',
    // },
    vueTsc: true,
    eslint: {
      files: ['./src'],
      extensions: ['.ts'],
    },
  })],
  server: {
    port: 8080,
  },
})
