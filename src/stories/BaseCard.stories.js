import MyBaseCard from './../components/ui/BaseCard.vue';

export default {
  title: 'UI/BaseCard',
  component: MyBaseCard,
};


export const BaseCard = () => ({
  components: { MyBaseCard },
  template: '<base-card>Hello</base-card>',
});