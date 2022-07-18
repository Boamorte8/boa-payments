import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import BaseInput from '../BaseInput.vue';
import BaseLabel from '@atoms/BaseLabel.vue';
import i18n from '../../i18n';

describe('BaseInput', () => {
  const defaultTemplate = `
    <BaseInput v-model="test" />
  `;
  function factory(template = defaultTemplate, options?: TestingOptions) {
    const testModel = ref('');
    const App = {
      components: {
        BaseInput,
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

  test('should create component', async () => {
    const { wrapper } = factory(undefined, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');
    const error = wrapper.find('p');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeFalsy();
    expect(error.exists()).toBeFalsy();
  });

  test('should create component with label', async () => {
    const template = `
    <BaseInput v-model="test" label="Test" />
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

  test('should update model on write at input', async () => {
    const template = `
    <BaseInput v-model="test" label="Test" />
  `;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');
    await input.setValue('inputTest');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(input.element.value).toBe('inputTest');
    expect(testModel.value).toBe('inputTest');
  });

  test('should display error message when hasError is true', async () => {
    const template = `
    <BaseInput v-model="test" label="Test" errorMessage="Text error message" :hasError="true" />
  `;
    const { wrapper } = factory(template, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');
    const error = wrapper.find('p');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(error.exists()).toBeTruthy();
    expect(error.text()).toBe('Text error message');
  });
});
