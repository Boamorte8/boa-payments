import { defineStore } from 'pinia'

let timer: number;

interface State {
  userId: string | null;
  token: string | null;
  tokenExpiration: number | null;
  didAutoLogout: boolean;
  counter: number;
}

export const useAuthUserStore = defineStore('auth/user', {
  state: (): State => ({
    userId: null,
    token: null,
    tokenExpiration: null,
    didAutoLogout: false,
    counter: 0,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    // async login(payload) {
    //   console.log(payload);
    //   dispatch('auth', {
    //     ...payload,
    //     process: 'signInWithPassword',
    //     customErrorMessage: 'Failed login. Check your login data',
    //   });
    // },
    incrementCounter() {
      this.counter += 1;
    },
    // no context as first argument, use `this` instead
    // async loadUser (id: number) {
    //   if (this.userId !== null) throw new Error('Already logged in')
    //   const res = await api.user.load(id)
    //   this.updateUser(res)
    // },
    // mutations can now become actions, instead of `state` as first argument use `this`
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);

      this.token = null;
      this.userId = null;
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