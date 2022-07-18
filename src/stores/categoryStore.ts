import { defineStore } from 'pinia';

import { endpoints } from '@app/config';
import { useAuthUserStore } from './authStore';
import type { CategoryState } from './models';

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
    loaded: false,
    loading: false,
    openModal: false,
    saving: false,
  }),
  getters: {
    areCategoriesLoaded: ({ categories, loaded }) =>
      loaded && !!categories.length,
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
    toggleModal(openModal: boolean) {
      this.openModal = openModal;
    },
  },
});
