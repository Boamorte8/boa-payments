import { defineStore } from 'pinia';

import { endpoints } from '@app/config';
import { useAuthUserStore } from './authStore';
import type { Entity, EntityState } from './models';

export const useEntityStore = defineStore('entity', {
  state: (): EntityState => ({
    entities: [],
    loaded: false,
    loading: false,
    openModal: false,
    saving: false,
  }),
  getters: {
    isLoading: ({ loading, saving }) => loading || saving,
  },
  actions: {
    async loadEntities(errorMessage: string) {
      let { userId, token } = useAuthUserStore();
      this.loading = true;
      this.loaded = false;
      userId = userId || '';
      token = token || '';
      const response = await fetch(endpoints.getEntities(userId, token));
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.loaded = true;
        this.loading = false;
        throw error;
      }
      const entities = [];

      for (const entityId in responseData) {
        const entity = {
          ...responseData[entityId],
          id: entityId,
        };
        entities.push(entity);
      }

      this.entities = entities;
      this.loaded = true;
      this.loading = false;
    },
    async createEntity(entity: Entity, errorMessage: string) {
      this.saving = true;
      let { userId, token } = useAuthUserStore();
      userId = userId || '';
      token = token || '';
      entity.userId = userId;
      const response = await fetch(endpoints.getEntities(userId, token), {
        method: 'POST',
        body: JSON.stringify(entity),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || errorMessage);
        this.saving = false;
        throw error;
      }
      this.entities.push(entity);

      this.saving = false;
    },
    toggleModal(openModal: boolean) {
      this.openModal = openModal;
    },
  },
});
