import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { mount } from '@vue/test-utils';

import BaseLabel from '@atoms/BaseLabel.vue';
import CurrencyInput from '../CurrencyInput.vue';
import i18n from '../../i18n';
import { ref } from 'vue';

describe('CurrencyInput', () => {
  const defaultTemplate = `
    <CurrencyInput v-model="test" :options="{ currency: 'COP' }" />
  `;
  function factory(template = defaultTemplate, options?: TestingOptions) {
    const testModel = ref(0);
    const App = {
      components: {
        CurrencyInput,
        BaseLabel,
      },
      template,
      data: () => ({ test: testModel }),
    };
    const wrapper = mount(App, {
      global: {
        components: {
          BaseLabel,
        },
        plugins: [i18n, createTestingPinia(options)],
      },
    });

    return { wrapper, testModel };
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should create component', async () => {
    const { wrapper, testModel } = factory(undefined, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeFalsy();
    expect(input.element.value).toEqual('');
    expect(testModel.value).toBe(0);
  });

  test('should create component with label', async () => {
    const template = `<CurrencyInput v-model="test" label="Test" :options="{ currency: 'COP' }" />`;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(input.element.value).toEqual('');
    expect(testModel.value).toBe(0);
  });

  test('should return default value', async () => {
    const template = `<CurrencyInput v-model="test" label="Test" :options="{ currency: 'COP' }" />`;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');
    await input.setValue('stringTest');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(input.element.value).toContain('COP 0');
    expect(testModel.value).toBe(0);
  });

  test('should return default value on write string at input', async () => {
    const template = `<CurrencyInput v-model="test" label="Test" :options="{ currency: 'COP' }" />`;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');
    await input.setValue(0);
    await input.setValue('stringTest');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(input.element.value).toBe('');
    expect(testModel.value).toBe(0);
  });

  test('should return the value on write a number at input', async () => {
    const template = `<CurrencyInput v-model="test" label="Test" :options="{ currency: 'COP' }" />`;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');
    await input.setValue(0);
    await input.setValue(2000);
    vi.runAllTimers();

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(input.element.value).toEqual('COP 2,000');
    expect(testModel.value).toBe(2000);
  });
});
