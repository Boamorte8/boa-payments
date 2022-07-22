import { defineStore } from 'pinia';

import { endpoints } from '@app/config';
import { useAuthUserStore } from './authStore';
import type { Category, Order, OrderState } from './models';

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    allOrders: [],
    orders: [],
    loaded: false,
    loading: false,
    saving: false,
  }),
  getters: {
    areOrdersLoaded: ({ orders, loaded }) => loaded && !!orders.length,
    isLoading: ({ loading, saving }) => loading || saving,
    filteredOrders: ({ orders }) => orders,
    noOrders: ({ orders, loaded }) => loaded && !orders.length,
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
      this.allOrders = orders;
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
      this.allOrders.push(order);

      this.saving = false;
    },
    filter(search: string, property: string) {
      if (search === '' || search === null) {
        this.orders = this.allOrders;
        return;
      }
      this.orders = this.allOrders.filter((order: Order) => {
        let value = order[property];
        if (typeof value === 'number') {
          value = value.toString();
        }
        return value.includes(search);
      });
    },
    filterByCategory(categories: Category[]) {
      this.orders = this.allOrders.filter((order: Order) =>
        categories.some((category: Category) =>
          order.category.some(
            (orderCategory: Category) => category.id === orderCategory.id
          )
        )
      );
    },
  },
});
