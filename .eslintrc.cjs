/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:@intlify/vue-i18n/recommended',
    'plugin:storybook/recommended',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  plugins: ['vue', 'prettier', '@intlify/vue-i18n'],
  settings: {
    'vue-i18n': {
      localeDir: [],
    },
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
