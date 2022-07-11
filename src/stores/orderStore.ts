import { defineStore } from 'pinia';

import { type OrderState, Order } from './models';

export const OrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
    loaded: false,
    loading: false,
  }),
  getters: {
    areOrdersLoaded: ({ orders, loaded }) => loaded && !!orders.length,
  },
  actions: {
    // async loadCoaches(payload) {
    //   if (!payload.forceRefresh && !context.getters.shouldUpdate) {
    //     return;
    //   }
    //   const response = await fetch('https://vue-coach-app-c0620-default-rtdb.firebaseio.com/coaches.json');
    //   const responseData = await response.json();
    //   if (!response.ok) {
    //     const error = new Error(responseData.message || 'Failed loading coaches');
    //     throw error;
    //   }
    //   const coaches = [];
    //   for (const coachId in responseData) {
    //     const coach = {
    //       ...responseData[coachId],
    //       id: coachId,
    //     }
    //     coaches.push(coach);
    //   }
    // }
  },
});
