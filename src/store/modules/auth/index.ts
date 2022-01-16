import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface AuthState {
  userId: string | null;
  token: string | null;
  tokenExpiration: number | null;
  didAutoLogout: boolean;
  counter: number;
}

export default {
  state(): AuthState {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false,
      counter: 0,
    };
  },
  getters,
  actions,
  mutations,
}