import { defineStore } from 'pinia';

import { type PreferenceState, UserTheme } from './models';

export const usePreferencesUserStore = defineStore('preferences/user', {
  state: (): PreferenceState => ({
    theme: UserTheme.DARK,
  }),
  actions: {
    updateTheme(theme: UserTheme) {
      this.theme = theme;
      if (theme === UserTheme.DARK) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});
