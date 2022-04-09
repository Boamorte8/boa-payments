import LogoutIcon from "../../src/components/common/LogoutIcon.vue";

export default {
  title: "Atoms/LogoutIcon",
  component: LogoutIcon,
};

const Template = (args) => ({
  components: { LogoutIcon },
  setup() {
    return { args };
  },
  template: "<logout-icon/>",
});

export const Default = Template.bind({});
