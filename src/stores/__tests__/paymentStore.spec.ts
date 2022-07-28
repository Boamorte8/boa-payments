import { beforeEach, describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useAuthUserStore } from '../authStore';
import { usePaymentStore } from '../paymentStore';

describe('PaymentStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    sessionStorage.removeItem('is-working');
  });

  describe('paymentStore.loadPayments', () => {
    test('should do an http request and return an error', async () => {
      const authStore = useAuthUserStore();
      const paymentStore = usePaymentStore();
      const errorMessage = 'Test Error';
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';

      try {
        await paymentStore.loadPayments(errorMessage);
      } catch (err) {
        expect(err).toStrictEqual(new Error(errorMessage));
        expect(paymentStore.payments.length).toBeFalsy();
        expect(paymentStore.loaded).toBeTruthy();
        expect(paymentStore.loading).toBeFalsy();
      }
    });

    test('should do an http request and return data', async () => {
      const authStore = useAuthUserStore();
      const paymentStore = usePaymentStore();
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';
      sessionStorage.setItem('is-working', 'true');

      await paymentStore.loadPayments('');

      expect(paymentStore.payments.length).toBeTruthy();
      expect(paymentStore.loaded).toBeTruthy();
      expect(paymentStore.loading).toBeFalsy();
    });
  });

  // describe('orderStore.createOrder', () => {
  //   test('should do an http request and return an error', async () => {
  //     const authStore = useAuthUserStore();
  //     const orderStore = useOrderStore();
  //     const errorMessage = 'Test Error';
  //     authStore.userId = 'userIdTest';
  //     authStore.token = 'tokenTest';

  //     try {
  //       await orderStore.createOrder(mockOrders[0], errorMessage);
  //     } catch (err) {
  //       expect(err).toStrictEqual(new Error(errorMessage));
  //       expect(orderStore.orders.length).toBeFalsy();
  //       expect(orderStore.saving).toBeFalsy();
  //     }
  //   });

  //   test('should do an http request and return data', async () => {
  //     const authStore = useAuthUserStore();
  //     const orderStore = useOrderStore();
  //     authStore.userId = 'userIdTest';
  //     authStore.token = 'tokenTest';
  //     sessionStorage.setItem('is-working', 'true');

  //     await orderStore.createOrder(mockOrders[0], '');

  //     expect(orderStore.orders.length).toBeTruthy();
  //     expect(orderStore.saving).toBeFalsy();
  //   });
  // });
});
