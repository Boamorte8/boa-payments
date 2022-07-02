import { app } from '@storybook/vue3';

import NotFound from '../src/pages/NotFound.vue';
import i18n from '../src/i18n';

app.use(i18n);

export default {
  title: 'Pages/NotFound',
  component: NotFound,
};

const Template = (args) => ({
  components: { NotFound },
  setup() {
    return { args };
  },
  template: '<not-found />',
});

export const Default = Template.bind({});
