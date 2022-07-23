import { defineStore } from 'pinia';

import { endpoints } from '@app/config';
import { useAuthUserStore } from './authStore';
import type { Payment, PaymentState } from './models';

export const usePaymentStore = defineStore('payment', {
  state: (): PaymentState => ({
    allPayments: [],
    payments: [],
    loaded: false,
    loading: false,
    saving: false,
  }),
  getters: {
    arePaymentsLoaded: ({ payments, loaded }) => loaded && !!payments.length,
    isLoading: ({ loading, saving }) => loading || saving,
    filteredPayments: ({ payments }) => payments,
    noPayments: ({ payments, loaded }) => loaded && !payments.length,
  },
  actions: {
    async loadPayments(errorMessage: string) {
      let { userId, token } = useAuthUserStore();
      this.loading = true;
      this.loaded = false;
      userId = userId || '';
      token = token || '';
      // if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      //   return;
      // }
      const response = await fetch(endpoints.getPayments(userId, token));
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.loaded = true;
        this.loading = false;
        throw error;
      }
      const payments: Payment[] = [];

      for (const paymentId in responseData) {
        const payment = {
          ...responseData[paymentId],
          id: paymentId,
        };
        payments.push(payment);
      }

      this.payments = payments;
      this.allPayments = payments;
      this.loaded = true;
      this.loading = false;
    },
    async createPayment(payment: Payment, errorMessage: string) {
      this.saving = true;
      let { userId, token } = useAuthUserStore();
      userId = userId || '';
      token = token || '';
      const response = await fetch(endpoints.getPayments(userId, token), {
        method: 'POST',
        body: JSON.stringify(payment),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.saving = false;
        throw error;
      }
      this.payments.push(payment);
      this.allPayments.push(payment);

      this.saving = false;
    },
    // filter(search: string, property: string) {
    //   if (search === '' || search === null) {
    //     this.orders = this.allOrders;
    //     return;
    //   }
    //   this.orders = this.allOrders.filter((order: Order) => {
    //     let value = order[property];
    //     if (typeof value === 'number') {
    //       value = value.toString();
    //     }
    //     return value.includes(search);
    //   });
    // },
  },
});
