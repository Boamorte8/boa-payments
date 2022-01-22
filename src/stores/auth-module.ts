import { defineStore } from 'pinia';
import i18n from '../i18n';

import { AuthPayload, AuthState, LoginPayload } from './models';

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
      this.auth({
        ...payload,
        process: 'signInWithPassword',
        customErrorMessage: t('loginError'),
      });
    },
    async signup(payload: LoginPayload) {
      this.auth({
        ...payload,
        process: 'signUp',
        customErrorMessage: t('signupError'),
      });
    },
    async auth({ email, password, process, customErrorMessage }: AuthPayload) {
      console.log(email, password, process, customErrorMessage);
      // const response = await fetch(
      //   `https://identitytoolkit.googleapis.com/v1/accounts:${process}?key=AIzaSyC3_cyslUxiQrdiDD4__fARNPLf9v88JXw`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       email,
      //       password,
      //       returnSecureToken: true,
      //     }),
      //   }
      // );

      // const responseData = await response.json();

      // if (!response.ok) {
      //   const error = new Error(responseData.message || customErrorMessage);
      //   throw error;
      // }

      // const { idToken, localId, expiresIn } = responseData;
      // const expiresInTime = +expiresIn * 1000;
      // const expirationDate = new Date().getTime() + expiresInTime;

      // localStorage.setItem('token', idToken);
      // localStorage.setItem('userId', localId);
      // localStorage.setItem('tokenExpiration', expirationDate.toString());
      // timer = setTimeout(() => {
      //   context.dispatch('autoLogout');
      // }, expiresInTime);

      // context.commit('setUser', {
      //   token: idToken,
      //   userId: localId,
      // });
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);

      this.clearUser();
    },
    // updateUser (payload) {
    //   this.firstName = payload.firstName
    //   this.lastName = payload.lastName
    //   this.userId = payload.userId
    // },
    clearUser () {
      this.$reset()
    }
  }
})