import { defineStore } from 'pinia';

import { endpoints } from '@app/config';
import { filterByProperty } from '@app/utils';
import { useAuthUserStore } from './authStore';
import type { Order, Payment, PaymentKey, PaymentState } from './models';

export const usePaymentStore = defineStore('payment', {
  state: (): PaymentState => ({
    allPayments: [],
    payments: [],
    loaded: false,
    loading: false,
    saving: false,
  }),
  getters: {
    arePaymentsLoaded: ({ allPayments, loaded }) =>
      loaded && !!allPayments.length,
    isLoading: ({ loading, saving }) => loading || saving,
    filteredPayments: ({ payments }) => payments,
    noPayments: ({ allPayments, loaded }) => loaded && !allPayments.length,
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
    filter(search: string, property: PaymentKey) {
      if (search === '' || search === null) {
        this.payments = this.allPayments;
        return;
      }
      this.payments = filterByProperty<Payment>(
        this.allPayments,
        property,
        search
      );
    },
    filterByOrder(searchOrder: Order) {
      this.payments = this.allPayments.filter(
        (payment: Payment) => payment.order.id === searchOrder.id
      );
    },
  },
});
