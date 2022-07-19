import { defineStore } from 'pinia';

import { endpoints } from '@app/config';
import { useAuthUserStore } from './authStore';
import type { Order, OrderState } from './models';

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
    loaded: false,
    loading: false,
    saving: false,
  }),
  getters: {
    areOrdersLoaded: ({ orders, loaded }) => loaded && !!orders.length,
    isLoading: ({ loading, saving }) => loading || saving,
  },
  actions: {
    async loadOrders(errorMessage: string) {
      let { userId, token } = useAuthUserStore();
      this.loading = true;
      this.loaded = false;
      userId = userId || '';
      token = token || '';
      // if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      //   return;
      // }
      const response = await fetch(endpoints.getOrders(userId, token));
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.loaded = true;
        this.loading = false;
        throw error;
      }
      const orders = [];

      for (const orderId in responseData) {
        const order = {
          ...responseData[orderId],
          id: orderId,
        };
        orders.push(order);
      }

      this.orders = orders;
      this.loaded = true;
      this.loading = false;
    },
    async createOrder(order: Order, errorMessage: string) {
      this.saving = true;
      let { userId, token } = useAuthUserStore();
      userId = userId || '';
      token = token || '';
      const response = await fetch(endpoints.getOrders(userId, token), {
        method: 'POST',
        body: JSON.stringify(order),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.saving = false;
        throw error;
      }
      this.orders.push(order);

      this.saving = false;
    },
  },
});
