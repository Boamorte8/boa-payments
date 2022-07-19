import { beforeEach, describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { mockCategories } from '../../tests/category-test.utils';
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

  describe('categoryStore.createCategory', () => {
    test('should do an http request and return an error', async () => {
      const authStore = useAuthUserStore();
      const categoryStore = useCategoryStore();
      const errorMessage = 'Test Error';
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';

      try {
        await categoryStore.createCategory(mockCategories[0], errorMessage);
      } catch (err) {
        expect(err).toStrictEqual(new Error(errorMessage));
        expect(categoryStore.categories.length).toBeFalsy();
        expect(categoryStore.saving).toBeFalsy();
      }
    });

    test('should do an http request and return data', async () => {
      const authStore = useAuthUserStore();
      const categoryStore = useCategoryStore();
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';
      sessionStorage.setItem('is-working', 'true');

      await categoryStore.createCategory(mockCategories[0], '');

      expect(categoryStore.categories.length).toBeTruthy();
      expect(categoryStore.saving).toBeFalsy();
    });
  });

  describe('categoryStore.toggleModal', () => {
    test('should set to true to openModal', () => {
      const categoryStore = useCategoryStore();

      categoryStore.toggleModal(true);

      expect(categoryStore.openModal).toBeTruthy();
    });

    test('should set to false to openModal', () => {
      const categoryStore = useCategoryStore();

      categoryStore.toggleModal(false);

      expect(categoryStore.openModal).toBeFalsy();
    });
  });
});
