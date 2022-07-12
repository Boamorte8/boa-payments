import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

import { endpoints } from '@app/config';
import { useAuthUserStore } from './authStore';
import type { OrderState } from './models';

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
    loaded: false,
    loading: false,
  }),
  getters: {
    areOrdersLoaded: ({ orders, loaded }) => loaded && !!orders.length,
  },
  actions: {
    async loadOrders() {
      const { t } = useI18n();
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
        const errorMessage = t('pageOrders.errorLoadingOrders');
        const error = new Error(responseData.message || errorMessage);
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
  },
});
