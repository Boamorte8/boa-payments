import { defineStore } from 'pinia';

import { currencies, type Currency, type CurrencyState } from './models';
import { endpoints } from '@app/config';
import { useAuthUserStore } from './authStore';

export const useCurrencyStore = defineStore('currency', {
  state: (): CurrencyState => ({
    currencies,
    extraCurrencies: [],
    loaded: false,
    loading: false,
    openModal: false,
    saving: false,
  }),
  getters: {
    isLoading: ({ loading, saving }) => loading || saving,
    getCurrencies: ({ currencies, extraCurrencies }) => [
      ...currencies,
      ...extraCurrencies,
    ],
  },
  actions: {
    async loadCurrencies(errorMessage: string) {
      let { userId, token } = useAuthUserStore();
      this.loading = true;
      this.loaded = false;
      userId = userId || '';
      token = token || '';
      const response = await fetch(endpoints.getCurrencies(userId, token));
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.loaded = true;
        this.loading = false;
        throw error;
      }
      const extraCurrencies = [];

      for (const currencyId in responseData) {
        const currency = {
          ...responseData[currencyId],
          id: currencyId,
        };
        extraCurrencies.push(currency);
      }

      this.extraCurrencies = extraCurrencies;
      this.loaded = true;
      this.loading = false;
    },
    async createCurrency(currency: Currency, errorMessage: string) {
      this.saving = true;
      let { userId, token } = useAuthUserStore();
      userId = userId || '';
      token = token || '';
      currency.userId = userId;
      const response = await fetch(endpoints.getCurrencies(userId, token), {
        method: 'POST',
        body: JSON.stringify(currency),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.saving = false;
        throw error;
      }
      this.extraCurrencies.push(currency);

      this.saving = false;
    },
    toggleModal(openModal: boolean) {
      this.openModal = openModal;
    },
  },
});
