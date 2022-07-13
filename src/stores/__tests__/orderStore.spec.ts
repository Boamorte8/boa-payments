import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useAuthUserStore } from '../authStore';
import { useOrderStore } from '../orderStore';

describe('OrderStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    sessionStorage.removeItem('is-working');
  });

  describe('orderStore.loadOrders', () => {
    test('should do an http request and return an error', async () => {
      const authStore = useAuthUserStore();
      const orderStore = useOrderStore();
      const errorMessage = 'Test Error';
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';

      try {
        await orderStore.loadOrders(errorMessage);
      } catch (err) {
        expect(err).toStrictEqual(new Error(errorMessage));
        expect(orderStore.orders.length).toBeFalsy();
        expect(orderStore.loaded).toBeTruthy();
        expect(orderStore.loading).toBeFalsy();
      }
    });

    test('should do an http request and signIn data', async () => {
      const authStore = useAuthUserStore();
      const orderStore = useOrderStore();
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';
      sessionStorage.setItem('is-working', 'true');

      await orderStore.loadOrders('');

      expect(orderStore.orders.length).toBeTruthy();
      expect(orderStore.loaded).toBeTruthy();
      expect(orderStore.loading).toBeFalsy();
    });
  });
});
