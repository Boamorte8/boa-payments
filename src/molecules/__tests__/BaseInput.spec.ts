import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import BaseInput from '../BaseInput.vue';
import BaseLabel from '@atoms/BaseLabel.vue';
import i18n from '../../i18n';

describe('BaseInput', () => {
  const defaultTemplate = `
    <base-input v-model="test"></base-input>
  `;
  function factory(template = defaultTemplate, options?: TestingOptions) {
    const App = {
      components: {
        BaseInput,
        BaseLabel,
      },
      template,
      data: () => ({ test: '' }),
    };
    const wrapper = mount(App, {
      global: {
        components: {
          BaseLabel,
        },
        plugins: [i18n, createTestingPinia(options)],
      },
    });

    return { wrapper };
  }

  test('should create component', async () => {
    const { wrapper } = factory(undefined, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeFalsy();
  });

  test('should create component with label', async () => {
    const template = `
    <base-input v-model="test" label="Test"></base-input>
  `;
    const { wrapper } = factory(template, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
  });
});
