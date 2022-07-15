import { beforeEach, describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useAuthUserStore } from '../authStore';
import { useCategoryStore } from '../categoryStore';

describe('CategortyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    sessionStorage.removeItem('is-working');
  });

  describe('entityStore.loadCategories', () => {
    test('should do an http request and return an error', async () => {
      const authStore = useAuthUserStore();
      const categoryStore = useCategoryStore();
      const errorMessage = 'Test Error';
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';

      try {
        await categoryStore.loadCategories(errorMessage);
      } catch (err) {
        expect(err).toStrictEqual(new Error(errorMessage));
        expect(categoryStore.categories.length).toBeFalsy();
        expect(categoryStore.loaded).toBeTruthy();
        expect(categoryStore.loading).toBeFalsy();
      }
    });

    test('should do an http request and return data', async () => {
      const authStore = useAuthUserStore();
      const categoryStore = useCategoryStore();
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';
      sessionStorage.setItem('is-working', 'true');

      await categoryStore.loadCategories('');

      expect(categoryStore.categories.length).toBeTruthy();
      expect(categoryStore.loaded).toBeTruthy();
      expect(categoryStore.loading).toBeFalsy();
    });
  });
});
