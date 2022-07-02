import BaseButton from "../../src/atoms/BaseButton.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Atoms/BaseButton",
  component: BaseButton,
  argTypes: {
    // backgroundColor: { control: 'color' },
    // onClick: {},
    mode: {
      control: { type: "select" },
      options: ["normal", "flat", "outline"],
    },
  },
};

const Template = (args) => ({
  components: { BaseButton },
  setup() {
    return { args };
  },
  template: '<base-button v-bind="args">My Button</base-button>',
});

export const Primary = Template.bind({});
Primary.args = {};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

export const Outline = Template.bind({});
Outline.args = {
  mode: "outline",
};

export const Flat = Template.bind({});
Flat.args = {
  mode: "flat",
};
