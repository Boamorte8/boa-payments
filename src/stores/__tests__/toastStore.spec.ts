import { beforeEach, describe, expect, test } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { mockToasts } from '../../tests/toast-test.utils';
import { useToastStore } from '../toastStore';

describe('Toast Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('addToast', () => {
    test('should add new toast to the store', () => {
      const toastStore = useToastStore();

      toastStore.addToast(mockToasts[0]);

      expect(toastStore.toasts).toStrictEqual([mockToasts[0]]);
    });
  });

  describe('clearToast', () => {
    test('should remove specific toast from store', () => {
      const toastStore = useToastStore();
      toastStore.addToast(mockToasts[0]);
      toastStore.addToast(mockToasts[1]);
      toastStore.addToast(mockToasts[2]);
      toastStore.addToast(mockToasts[3]);

      toastStore.clearToast(mockToasts[1].id);

      expect(toastStore.toasts).toStrictEqual([
        mockToasts[0],
        mockToasts[2],
        mockToasts[3],
      ]);
    });
  });
});
