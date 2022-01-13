import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface AuthState {
  userId: string | null;
  token: string | null;
  tokenExpiration: number | null;
  didAutoLogout: boolean;
}

export default {
  state(): AuthState {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false,
    };
  },
  getters,
  actions,
  mutations,
}