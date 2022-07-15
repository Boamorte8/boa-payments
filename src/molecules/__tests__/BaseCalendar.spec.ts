import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import BaseLabel from '@atoms/BaseLabel.vue';
import BaseCalendar from '../BaseCalendar.vue';
import i18n from '../../i18n';

describe('BaseCalendar', () => {
  const defaultTemplate = `
    <div id="testDiv">
      <BaseCalendar v-model="test" />
    </div>
  `;
  function factory(template = defaultTemplate, options?: TestingOptions) {
    const testModel = ref();
    const App = {
      components: {
        BaseCalendar,
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
    const { wrapper, testModel } = factory(undefined, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeFalsy();
    expect(input.element.value).toEqual('');
    expect(testModel.value).toBeUndefined();
  });

  test('should create component with label', async () => {
    const template = `<BaseCalendar v-model="test" label="Test" />`;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(input.element.value).toEqual('');
    expect(testModel.value).toBeUndefined();
  });
});
