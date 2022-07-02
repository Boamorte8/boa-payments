import TranslateIcon from "../../src/atoms/TranslateIcon.vue";

export default {
  title: "Atoms/TranslateIcon",
  component: TranslateIcon,
};

const Template = (args) => ({
  components: { TranslateIcon },
  setup() {
    return { args };
  },
  template: "<translate-icon/>",
});

export const Default = Template.bind({});
