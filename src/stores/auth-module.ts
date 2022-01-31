import { defineStore } from 'pinia';

import { AuthPayload, AuthState, LoginPayload } from './models';
import i18n from '../i18n';

let timer: number;
const { t } = i18n.global;

export const useAuthUserStore = defineStore('auth/user', {
  state: (): AuthState => ({
    userId: null,
    token: null,
    tokenExpiration: null,
    didAutoLogout: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(payload: LoginPayload) {
      await this.auth({
        ...payload,
        process: 'signInWithPassword',
        customErrorMessage: t('loginError'),
      });
    },
    async signup(payload: LoginPayload) {
      await this.auth({
        ...payload,
        process: 'signUp',
        customErrorMessage: t('signupError'),
      });
    },
    async auth({ email, password, process, customErrorMessage }: AuthPayload) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:${process}?key=AIzaSyCwvlEBeFd4J-TvREJda36ztri5PVESc_k`,
        {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || customErrorMessage);
        throw error;
      }

      const { idToken, localId, expiresIn } = responseData;
      const expiresInTime = +expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresInTime;

      localStorage.setItem('token', idToken);
      localStorage.setItem('userId', localId);
      localStorage.setItem('tokenExpiration', expirationDate.toString());
      // timer = setTimeout(() => this.autoLogout(), expiresInTime);

      this.setUser(idToken, localId);
    },
    tryLogin() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = !tokenExpiration ? -1 : +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      // timer = setTimeout(() => this.autoLogout(), expiresInTime);
      this.setUser(token, userId);
    },
    setUser(token: string | null, userId: string | null) {
      if (token && userId) {
        this.token = token;
        this.userId = userId;
        this.didAutoLogout = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);

      this.clearUser();
    },
    clearUser () {
      this.$reset()
    },
    autoLogout() {
      this.logout();
      this.didAutoLogout = true;
    }
  }
})