import { defineStore } from 'pinia';

import { endpoints } from '@app/config';
import { useAuthUserStore } from './authStore';
import type { Category, CategoryState } from './models';

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
    loaded: false,
    loading: false,
    openModal: false,
    saving: false,
  }),
  getters: {
    isLoading: ({ loading, saving }) => loading || saving,
  },
  actions: {
    async loadCategories(errorMessage: string) {
      let { userId, token } = useAuthUserStore();
      this.loading = true;
      this.loaded = false;
      userId = userId || '';
      token = token || '';
      const response = await fetch(endpoints.getCategories(userId, token));
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.loaded = true;
        this.loading = false;
        throw error;
      }
      const categories = [];

      for (const categoryId in responseData) {
        const category = {
          ...responseData[categoryId],
          id: categoryId,
        };
        categories.push(category);
      }

      this.categories = categories;
      this.loaded = true;
      this.loading = false;
    },
    async createCategory(category: Category, errorMessage: string) {
      this.saving = true;
      let { userId, token } = useAuthUserStore();
      userId = userId || '';
      token = token || '';
      category.userId = userId;
      const response = await fetch(endpoints.getCategories(userId, token), {
        method: 'POST',
        body: JSON.stringify(category),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.saving = false;
        throw error;
      }
      this.categories.push(category);

      this.saving = false;
    },
    toggleModal(openModal: boolean) {
      this.openModal = openModal;
    },
  },
});
