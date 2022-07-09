import { defineStore } from 'pinia';

import { type OrderState, Order } from './models';

export const OrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
    loaded: false,
  }),
  getters: {
    areOrdersLoaded: ({ orders, loaded }) => loaded && !!orders.length,
  },
  actions: {},
});
