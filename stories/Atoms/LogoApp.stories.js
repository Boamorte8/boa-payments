import LogoApp from "../../src/atoms/LogoApp.vue";

export default {
  title: "Atoms/LogoApp",
  component: LogoApp,
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["simple", "complete"],
    },
  },
};

const Template = (args) => ({
  components: { LogoApp },
  setup() { return { args }; },
  template: '<div style="background: gray; padding: 10px;"><logo-app v-bind="args"></logo-app></div>',
});

export const Simple = Template.bind({});
Simple.args = {};

export const Complete = Template.bind({});
Complete.args = {
  mode: "complete",
};



// const Template = (args) => ({
//   components: { BaseButton },
//   setup() {
//     return { args };
//   },
//   template: '<base-button v-bind="args">My Button</base-button>',
// });

// export const Primary = Template.bind({});
// Primary.args = {};

// // export const Secondary = Template.bind({});
// // Secondary.args = {
// //   label: 'Button',
// // };

// export const Outline = Template.bind({});
// Outline.args = {
//   mode: "outline",
// };

// export const Flat = Template.bind({});
// Flat.args = {
//   mode: "flat",
// };