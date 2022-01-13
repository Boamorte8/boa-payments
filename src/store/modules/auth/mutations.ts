import { AuthState } from '.';

export default {
  setUser(state: AuthState, { token, userId }: { token: string | null; userId: string | null }) {
    state.token = token;
    state.userId = userId;
    state.didAutoLogout = false;
  },
  setAutoLogout(state: AuthState) {
    state.didAutoLogout = true;
  }
};
