import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useAuthUserStore } from '../authStore';

describe('Auth User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('should call auth action when login action is called', async () => {
    const authStore = useAuthUserStore();
    vi.spyOn(authStore, 'auth');

    await authStore.login({ email: 'test@test.com', password: 'test' });

    expect(authStore.auth).toHaveBeenCalledWith({
      customErrorMessage: 'Failed login. Check your login data',
      email: 'test@test.com',
      password: 'test',
      process: 'signInWithPassword',
    });
  });

  test('should call auth action when signup action is called', async () => {
    const authStore = useAuthUserStore();
    vi.spyOn(authStore, 'auth');

    await authStore.signup({ email: 'test@test.com', password: 'test' });

    expect(authStore.auth).toHaveBeenCalledWith({
      customErrorMessage: 'Failed sign up. Check your signup data',
      email: 'test@test.com',
      password: 'test',
      process: 'signUp',
    });
  });
});
