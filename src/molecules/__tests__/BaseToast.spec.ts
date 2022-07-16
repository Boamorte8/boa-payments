import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import BaseToast from '../BaseToast.vue';
import i18n from '../../i18n';
import { mockToasts } from '../../tests/toast-test.utils';
import PlusIcon from '@atoms/PlusIcon.vue';

describe('BaseToggle', () => {
  const defaultProps = {
    toast: mockToasts[0],
  };
  function factory(props = defaultProps, options?: TestingOptions) {
    const wrapper = mount(BaseToast, {
      global: {
        components: { PlusIcon },
        plugins: [i18n, createTestingPinia(options)],
      },
      props,
    });

    return { wrapper };
  }

  test('should create component', async () => {
    const { wrapper } = factory(undefined, {
      createSpy: vi.fn,
    });

    const button = wrapper.find('button');
    const title = wrapper.find('h3');
    const message = wrapper.find('p');

    expect(button.exists()).toBeTruthy();
    expect(title.exists()).toBeTruthy();
    expect(message.exists()).toBeTruthy();
    expect(title.text()).toBe(mockToasts[0].title);
    expect(message.text()).toBe(mockToasts[0].message);
  });
});
