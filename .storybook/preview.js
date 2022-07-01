import { app } from '@storybook/vue3';

import '../src/styles/index.css';
import LogoApp from '../src/atoms/LogoApp.vue';

app.component('logo-app', LogoApp);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
}