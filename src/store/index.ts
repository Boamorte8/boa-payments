// This is the old store with Vuex changed to Pinia

import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import authModule from './modules/auth';

export interface AppState {

}

const store = createStore<AppState>({
  modules: {
    auth: authModule,
  },
});

export const key: InjectionKey<Store<AppState>> = Symbol();

export default store;

export function useStore() {
  return baseUseStore(key)
};
