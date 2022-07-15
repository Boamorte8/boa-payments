import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import BaseLabel from '@atoms/BaseLabel.vue';
import BaseToggle from '../BaseToggle.vue';
import i18n from '../../i18n';

describe('BaseToggle', () => {
  const defaultTemplate = `<BaseToggle v-model="test"/>`;
  function factory(template = defaultTemplate, options?: TestingOptions) {
    const testModel = ref(null);
    const App = {
      components: {
        BaseToggle,
        BaseLabel,
      },
      template,
      data: () => ({
        test: testModel,
      }),
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
    const { wrapper, testModel } = factory(undefined, {
      createSpy: vi.fn,
    });

    const button = wrapper.find('button');
    const label = wrapper.find('label');

    expect(button.exists()).toBeTruthy();
    expect(label.exists()).toBeFalsy();
    expect(testModel.value).toBeFalsy();
  });

  test('should create component with label', async () => {
    const template = `<BaseToggle v-model="test" label="Test"/>`;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const button = wrapper.find('button');
    const label = wrapper.find('label');

    expect(button.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(testModel.value).toBeFalsy();
  });

  test('should create component with label and change model after click', async () => {
    const template = `<BaseToggle v-model="test" label="Test"/>`;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const button = wrapper.find('button');
    const label = wrapper.find('label');
    await button.trigger('click');

    expect(button.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(testModel.value).toBeTruthy();
  });
});
