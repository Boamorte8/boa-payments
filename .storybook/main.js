
const path = require('path');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    'storybook-dark-mode'
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        alias: {
          vue: 'vue/dist/vue.esm-bundler.js',
          '@app': path.resolve(__dirname, '../src/app'),
          '@atoms': path.resolve(__dirname, '../src/atoms'),
        },
      },
    };
  }
}