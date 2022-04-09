import SettingsIcon from "../../src/components/common/SettingsIcon.vue";

export default {
  title: "Atoms/SettingsIcon",
  component: SettingsIcon,
};

const Template = (args) => ({
  components: { SettingsIcon },
  setup() {
    return { args };
  },
  template: "<settings-icon/>",
});

export const Default = Template.bind({});
