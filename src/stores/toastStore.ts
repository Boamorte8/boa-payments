import { defineStore } from 'pinia';

import { generateId } from '@app/utils';
import type { Toast, ToastState } from './models';

export const useToastStore = defineStore('toast', {
  state: (): ToastState => ({
    toasts: [],
  }),
  actions: {
    addToast(toast: Toast): number {
      toast.id = generateId();
      this.toasts.push(toast);
      return toast.id;
    },
    clearToast(id: number) {
      const index = this.toasts.findIndex((toast) => toast.id === id);
      this.toasts.splice(index, 1);
    },
  },
});
