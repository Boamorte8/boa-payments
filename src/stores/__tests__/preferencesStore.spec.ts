import { beforeEach, describe, expect, test } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { usePreferencesUserStore } from '../preferencesStore';
import { UserTheme } from '../models';

describe('Preferences User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('should change the theme property to dark when updateTheme is called', () => {
    const preferencesStore = usePreferencesUserStore();

    preferencesStore.updateTheme(UserTheme.DARK);

    expect(preferencesStore.theme).toBe(UserTheme.DARK);
  });

  test('should change the theme property to light when updateTheme is called', () => {
    const preferencesStore = usePreferencesUserStore();

    preferencesStore.updateTheme(UserTheme.LIGHT);

    expect(preferencesStore.theme).toBe(UserTheme.LIGHT);
  });
});
