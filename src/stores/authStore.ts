import { defineStore } from 'pinia';

import { doPostRequest } from '@app/utils';
import { endpoints } from '@app/config';
import i18n from '../i18n';
import router from '../router';
import type { AuthPayload, AuthState, LoginPayload } from './models';

let timer: number;
const { t } = i18n.global;

export const useAuthUserStore = defineStore('auth/user', {
  state: (): AuthState => ({
    userId: null,
    token: null,
    tokenExpiration: null,
    didAutoLogout: false,
    emailReset: null,
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
        customErrorMessage: t('signError'),
      });
    },
    async auth({ email, password, process, customErrorMessage }: AuthPayload) {
      const response = await doPostRequest(
        endpoints.getFirebaseUrl(process),
        JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        })
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
      timer = window.setTimeout(() => this.autoLogout(), expiresInTime);

      this.setUser(idToken, localId);
    },
    async sendEmailReset(email: string, errorMessage: string) {
      const response = await doPostRequest(
        endpoints.getFirebaseUrl('sendOobCode'),
        JSON.stringify({
          email,
          requestType: 'PASSWORD_RESET',
        })
      );
      const responseData = await response.json();

      if (!response.ok) {
        const message = responseData.error ? errorMessage : null;
        const error = new Error(message || responseData.message);
        throw error;
      }
    },
    async resetPassword(
      oobCode: string,
      newPassword: string,
      errorMessage: string
    ) {
      const response = await doPostRequest(
        endpoints.getFirebaseUrl('resetPassword'),
        JSON.stringify({ oobCode, newPassword })
      );
      const responseData = await response.json();

      if (!response.ok) {
        const message = responseData.error ? errorMessage : null;
        const error = new Error(message || responseData.message);
        throw error;
      }
    },
    tryLogin() {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = !tokenExpiration
        ? -1
        : +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = window.setTimeout(() => this.autoLogout(), expiresIn);
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
    clearUser() {
      this.$reset();
    },
    autoLogout() {
      this.logout();
      this.didAutoLogout = true;
      router.replace('/auth');
    },
  },
});
