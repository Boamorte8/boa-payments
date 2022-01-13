import { AuthState } from '.';


export default {
  userId: (state: AuthState) => state.userId,
  token: (state: AuthState) => state.token,
  isAuthenticated: (state: AuthState) => !!state.token,
  didAutoLogout: (state: AuthState) => state.didAutoLogout,
};
