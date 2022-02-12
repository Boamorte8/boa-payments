module.exports = {
  "framework": "@storybook/vue3",
  "core": {
    "builder": "storybook-builder-vite"
  },
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss")
        }
      }
    }
  ],
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return config;
  },
}