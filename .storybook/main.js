module.exports = {
  "framework": "@storybook/vue3",
  "core": {
    "builder": "storybook-builder-vite"
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
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