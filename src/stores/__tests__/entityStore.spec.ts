import { beforeEach, describe, expect, test } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { mockEntities } from '../../tests/entity-test.utils';
import { useAuthUserStore } from '../authStore';
import { useEntityStore } from '../entityStore';

describe('EntityStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    sessionStorage.removeItem('is-working');
  });

  describe('entityStore.loadEntities', () => {
    test('should do an http request and return an error', async () => {
      const authStore = useAuthUserStore();
      const entityStore = useEntityStore();
      const errorMessage = 'Test Error';
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';

      try {
        await entityStore.loadEntities(errorMessage);
      } catch (err) {
        expect(err).toStrictEqual(new Error(errorMessage));
        expect(entityStore.entities.length).toBeFalsy();
        expect(entityStore.loaded).toBeTruthy();
        expect(entityStore.loading).toBeFalsy();
      }
    });

    test('should do an http request and return data', async () => {
      const authStore = useAuthUserStore();
      const entityStore = useEntityStore();
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';
      sessionStorage.setItem('is-working', 'true');

      await entityStore.loadEntities('');

      expect(entityStore.entities.length).toBeTruthy();
      expect(entityStore.loaded).toBeTruthy();
      expect(entityStore.loading).toBeFalsy();
    });
  });

  describe('entityStore.createEntity', () => {
    test('should do an http request and return an error', async () => {
      const authStore = useAuthUserStore();
      const entityStore = useEntityStore();
      const errorMessage = 'Test Error';
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';

      try {
        await entityStore.createEntity(mockEntities[0], errorMessage);
      } catch (err) {
        expect(err).toStrictEqual(new Error(errorMessage));
        expect(entityStore.entities.length).toBeFalsy();
        expect(entityStore.saving).toBeFalsy();
      }
    });

    test('should do an http request and return data', async () => {
      const authStore = useAuthUserStore();
      const entityStore = useEntityStore();
      authStore.userId = 'userIdTest';
      authStore.token = 'tokenTest';
      sessionStorage.setItem('is-working', 'true');

      await entityStore.createEntity(mockEntities[0], '');

      expect(entityStore.entities.length).toBeTruthy();
      expect(entityStore.saving).toBeFalsy();
    });
  });

  describe('entityStore.toggleModal', () => {
    test('should set to true to openModal', () => {
      const entityStore = useEntityStore();

      entityStore.toggleModal(true);

      expect(entityStore.openModal).toBeTruthy();
    });

    test('should set to false to openModal', () => {
      const entityStore = useEntityStore();

      entityStore.toggleModal(false);

      expect(entityStore.openModal).toBeFalsy();
    });
  });
});
