/* eslint-disable no-unused-vars */
export enum UserTheme {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface PreferenceState {
  theme: UserTheme;
}
