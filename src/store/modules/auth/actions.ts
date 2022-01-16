import { ActionContext } from 'vuex';
import { AppState } from '../..';
import { AuthState } from '.';

// let timer: number;

export default {
  async login({ dispatch }: ActionContext<AuthState, AppState>, payload) {
    console.log(payload);
    dispatch('auth', {
      ...payload,
      process: 'signInWithPassword',
      customErrorMessage: 'Failed login. Check your login data',
    });
  },
  incrementCounter({ commit }: ActionContext<AuthState, AppState>) {
    commit('incrementCounter');
  },
  // async signup(context, payload) {
  //   context.dispatch('auth', {
  //     ...payload,
  //     process: 'signUp',
  //     customErrorMessage: 'Failed sign up. Check your signup data',
  //   });
  // },
  // async auth(context, { email, password, process, customErrorMessage }) {
  //   const response = await fetch(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:${process}?key=AIzaSyC3_cyslUxiQrdiDD4__fARNPLf9v88JXw`,
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         email,
  //         password,
  //         returnSecureToken: true,
  //       }),
  //     }
  //   );

  //   const responseData = await response.json();

  //   if (!response.ok) {
  //     const error = new Error(responseData.message || customErrorMessage);
  //     throw error;
  //   }

  //   const { idToken, localId, expiresIn } = responseData;
  //   const expiresInTime = +expiresIn * 1000;
  //   const expirationDate = new Date().getTime() + expiresInTime;

  //   localStorage.setItem('token', idToken);
  //   localStorage.setItem('userId', localId);
  //   localStorage.setItem('tokenExpiration', expirationDate.toString());
  //   timer = setTimeout(() => {
  //     context.dispatch('autoLogout');
  //   }, expiresInTime);

  //   context.commit('setUser', {
  //     token: idToken,
  //     userId: localId,
  //   });
  // },
  // tryLogin(context) {
  //   const token = localStorage.getItem('token');
  //   const userId = localStorage.getItem('userId');
  //   const tokenExpiration = localStorage.getItem('tokenExpiration');

  //   const expiresIn = +tokenExpiration - new Date().getTime();

  //   if (expiresIn < 0) {
  //     return;
  //   }

  //   timer = setTimeout(() => {
  //     context.dispatch('autoLogout');
  //   }, expiresIn);

  //   if (token && userId) {
  //     context.commit('setUser', {
  //       token,
  //       userId,
  //     });
  //   }
  // },
  // logout(context) {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userId');
  //   localStorage.removeItem('tokenExpiration');

  //   clearTimeout(timer);

  //   context.commit('setUser', {
  //     token: null,
  //     userId: null,
  //   });
  // },
  // autoLogout(context) {
  //   context.dispatch('logout');
  //   context.commit('setAutoLogout');
  // }
};