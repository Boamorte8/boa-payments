import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import BaseLabel from '@atoms/BaseLabel.vue';
import i18n from '../../i18n';

describe('BaseLabel', () => {
  function factory(optionsPinia?: TestingOptions) {
    const wrapper = mount(BaseLabel, {
      global: {
        components: {},
        plugins: [i18n, createTestingPinia(optionsPinia)],
      },
      slots: {
        default: 'Test',
      },
    });

    return { wrapper };
  }

  test('should create component', () => {
    expect(BaseLabel).toBeTruthy();
  });

  test('should display test text', () => {
    const { wrapper } = factory({
      createSpy: vi.fn,
    });

    const label = wrapper.find('label');
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
  });
});
