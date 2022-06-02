import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';

import BaseButton from '@atoms/BaseButton.vue';
import i18n from '../../i18n';
import router from '../../router';

describe('BaseButton', () => {
  function factory(options?: TestingOptions) {
    const wrapper = mount(BaseButton, {
      global: {
        plugins: [i18n, router, createTestingPinia(options)],
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    return { wrapper };
  }

  test('should create component', () => {
    expect(BaseButton).toBeTruthy();
  });

  test('should display a button', async () => {
    const { wrapper } = factory({
      createSpy: vi.fn,
    });
    wrapper.setProps({
      mode: 'flat',
    });

    expect(wrapper.find('button')).toBeTruthy();
  });

  test('should display a link', () => {
    const { wrapper } = factory({
      createSpy: vi.fn,
    });
    wrapper.setProps({
      link: true,
    });

    expect(wrapper.find('a')).toBeTruthy();
  });
});
