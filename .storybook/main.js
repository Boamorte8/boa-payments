const path = require("path");
const { loadConfigFromFile, mergeConfig } = require('vite');

module.exports = {
  stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-vite"
  },
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", {
    name: "@storybook/addon-postcss",
    options: {
      postcssLoaderOptions: {
        implementation: require("postcss")
      }
    }
  }],
  typescript: {
    check: false,
    checkOptions: {},
  },
  async viteFinal(config, { configType }) {
    const result = await loadConfigFromFile(configType, path.resolve(__dirname, "../vite.config.ts"));

    const userConfig = !!result ? result.config : {};

    return mergeConfig(config, {
      ...userConfig,
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    });
  }
};
