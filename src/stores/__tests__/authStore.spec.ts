import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useAuthUserStore } from '../authStore';
import type { AuthPayload } from '../models';

describe('Auth User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    sessionStorage.removeItem('is-authenticated');
  });

  test('should call auth action when login action is called', async () => {
    const authStore = useAuthUserStore();
    vi.spyOn(authStore, 'auth').mockImplementationOnce(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (payload: AuthPayload) =>
        new Promise((resolve) => {
          resolve();
        })
    );

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
    vi.spyOn(authStore, 'auth').mockImplementationOnce(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (payload: AuthPayload) =>
        new Promise((resolve) => {
          resolve();
        })
    );

    await authStore.signup({ email: 'test@test.com', password: 'test' });

    expect(authStore.auth).toHaveBeenCalledWith({
      customErrorMessage: 'Failed sign up. Check your signup data',
      email: 'test@test.com',
      password: 'test',
      process: 'signUp',
    });
  });

  describe('authStore.auth', () => {
    test('should do an http request and return an error', async () => {
      const authStore = useAuthUserStore();
      vi.spyOn(authStore, 'setUser');
      const payload = {
        email: 'test@test.com',
        password: 'test',
        process: 'signInWithPassword',
        customErrorMessage: 'Error login',
      };

      try {
        await authStore.auth(payload);
      } catch (err) {
        expect(err).toStrictEqual(new Error(payload.customErrorMessage));
      }
    });

    test('should do an http request and get the signIn data', async () => {
      const authStore = useAuthUserStore();
      sessionStorage.setItem('is-authenticated', 'true');
      vi.spyOn(authStore, 'setUser');
      const payload = {
        email: 'test@test.com',
        password: 'test',
        process: 'signInWithPassword',
        customErrorMessage: 'Error login',
      };

      await authStore.auth(payload);

      expect(localStorage.getItem('token')).toBe('idTokenTest');
      expect(localStorage.getItem('userId')).toBe('localIdTest');
      expect(authStore.setUser).toHaveBeenCalledWith(
        'idTokenTest',
        'localIdTest'
      );
    });
  });
});
