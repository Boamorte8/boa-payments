import BaseSpinner from "../../src/components/ui/BaseSpinner.vue";

export default {
  title: "Atoms/BaseSpinner",
  component: BaseSpinner,
};

const Template = (args) => ({
  components: { BaseSpinner },
  setup() {
    return { args };
  },
  template: "<base-spinner/>",
});

export const Default = Template.bind({});
