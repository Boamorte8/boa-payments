import OptionsIcon from "../../src/components/common/OptionsIcon.vue";

export default {
  title: "Atoms/OptionsIcon",
  component: OptionsIcon,
};

const Template = (args) => ({
  components: { OptionsIcon },
  setup() {
    return { args };
  },
  template: "<options-icon/>",
});

export const Default = Template.bind({});
