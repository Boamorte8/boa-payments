import LogoApp from "../../src/atoms/LogoApp.vue";

export default {
  title: "Atoms/LogoApp",
  component: LogoApp,
  argTypes: {
    mode: {
      options: ["simple", "complete"],
      control: { type: "select" },
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { LogoApp },
  props: Object.keys(argTypes),
  template: '<logo-app v-bind="$props"></logo-app>',
});

export const Simple = Template.bind({});

export const Complete = Template.bind({});
Complete.args = {
  mode: "complete",
};
