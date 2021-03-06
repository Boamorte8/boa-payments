import BaseCard from "../../src/atoms/BaseCard.vue";

export default {
  title: "Atoms/BaseCard",
  component: BaseCard,
};

const Template = (args) => ({
  components: { BaseCard },
  setup() {
    return { args };
  },
  template: "<base-card>Hello</base-card>",
});

export const Default = Template.bind({});
