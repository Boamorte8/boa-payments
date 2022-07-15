import { defineStore } from 'pinia';

import { endpoints } from '@app/config';
import { useAuthUserStore } from './authStore';
import type { EntityState } from './models';

export const useEntityStore = defineStore('entity', {
  state: (): EntityState => ({
    entities: [],
    loaded: false,
    loading: false,
  }),
  getters: {
    areEntitiesLoaded: ({ entities, loaded }) => loaded && !!entities.length,
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
  },
});
