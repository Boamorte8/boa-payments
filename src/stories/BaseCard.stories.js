import BaseCard from './../components/ui/BaseCard.vue';

export default {
  title: 'UI/BaseCard',
  component: BaseCard,
};

const Template = args => ({
  components: { BaseCard },
  setup() {
    return { args };
  },
  template: '<base-card>Hello</base-card>',
});

export const Default = Template.bind({});