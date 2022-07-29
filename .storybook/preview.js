

import { app } from '@storybook/vue3';

import '../src/styles/index.css';
import BaseCard from '../src/atoms/BaseCard.vue';

app.component('BaseCard', BaseCard);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}