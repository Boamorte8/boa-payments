import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import i18n from '../../i18n';
import { mockToasts } from '../../tests/toast-test.utils';
import PlusIcon from '@atoms/PlusIcon.vue';
import ToastContainer from '../ToastContainer.vue';
import { useAuthUserStore } from '../../stores';

describe('TheHeader', () => {
  function factory(options?: TestingOptions) {
    const wrapper = mount(ToastContainer, {
      global: {
        components: {
          PlusIcon,
        },
        plugins: [i18n, createTestingPinia(options)],
      },
    });

    const authUser = useAuthUserStore();

    return { wrapper, authUser };
  }

  test('should create component', () => {
    expect(ToastContainer).toBeTruthy();
  });

  test('should not display any toast', async () => {
    const { wrapper } = factory({
      createSpy: vi.fn,
    });

    expect(wrapper.text()).toBe('');
  });

  test('should display 4 toasts', async () => {
    const { wrapper } = factory({
      initialState: {
        toast: {
          toasts: mockToasts,
        },
      },
      createSpy: vi.fn,
    });

    const toasts = wrapper.findAll('.toast');

    expect(toasts.length).toBe(4);
  });
});
