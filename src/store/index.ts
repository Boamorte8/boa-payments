import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

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
