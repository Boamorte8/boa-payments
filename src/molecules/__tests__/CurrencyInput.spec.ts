import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import CurrencyInput from '../CurrencyInput.vue';
import BaseLabel from '@atoms/BaseLabel.vue';
import i18n from '../../i18n';

describe('CurrencyInput', () => {
  const defaultTemplate = `
    <CurrencyInput v-model="test" :options="{ currency: 'COP' }" />
  `;
  function factory(template = defaultTemplate, options?: TestingOptions) {
    const App = {
      components: {
        CurrencyInput,
        BaseLabel,
      },
      template,
      data: () => ({ test: 0 }),
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
    <CurrencyInput v-model="test" label="Test" :options="{ currency: 'COP' }" />
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
