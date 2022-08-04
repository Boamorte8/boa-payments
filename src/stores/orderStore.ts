import { defineStore } from 'pinia';

import { endpoints } from '@app/config';
import { useAuthUserStore } from './authStore';
import { filterByProperty, sortOrders } from '@app/utils';
import { SortValue } from '@app/models';
import type { Category, Order, OrderKey, OrderState } from './models';

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    allOrders: [],
    orders: [],
    loaded: false,
    loading: false,
    saving: false,
    deleting: false,
    updating: false,
    openConfirmDeleteModal: false,
    sortBy: SortValue.OldFirst,
    selectedOrder: null,
  }),
  getters: {
    areOrdersLoaded: ({ allOrders, loaded }) => loaded && !!allOrders.length,
    isLoading: ({ loading, saving, updating, deleting }) =>
      loading || saving || updating || deleting,
    filteredOrders: ({ orders, sortBy }) => sortOrders(orders, sortBy),
    noOrders: ({ allOrders, loaded }) => loaded && !allOrders.length,
    unfinishedOrders: ({ orders }) => orders.filter((order) => !order.finished),
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
    async updateOrder(order: Order, errorMessage: string) {
      this.saving = true;
      let { userId, token } = useAuthUserStore();
      userId = userId || '';
      token = token || '';
      const response = await fetch(
        endpoints.updateOrder(userId, token, order.id),
        {
          method: 'PUT',
          body: JSON.stringify(order),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.saving = false;
        throw error;
      }
      const index = this.allOrders.findIndex(
        (orderFind) => orderFind.id === order.id
      );
      this.allOrders[index] = order;
      this.orders = this.allOrders;

      this.saving = false;
    },
    async deleteOrder(order: Order, errorMessage: string) {
      this.deleting = true;
      let { userId, token } = useAuthUserStore();
      userId = userId || '';
      token = token || '';
      const response = await fetch(
        endpoints.updateOrder(userId, token, order.id),
        { method: 'DELETE' }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.deleting = false;
        throw error;
      }
      this.allOrders = this.allOrders.filter(
        (orderFind) => orderFind.id !== order.id
      );
      this.orders = this.allOrders;

      this.deleting = false;
    },
    filter(search: string, property: OrderKey) {
      if (search === '' || search === null) {
        this.orders = this.allOrders;
        return;
      }
      this.orders = filterByProperty<Order>(this.allOrders, property, search);
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
    filterByBoolean(property: OrderKey, value: boolean) {
      if (property) {
        this.orders = this.allOrders.filter(
          (order: Order) => order[property] === value
        );
      }
    },
    setSorting(sorting: SortValue) {
      this.sortBy = sorting;
    },
    setOrder(order: Order) {
      this.selectedOrder = order;
    },
    toggleModal(openModal: boolean) {
      this.openConfirmDeleteModal = openModal;
    },
  },
});
