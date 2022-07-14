import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import BaseLabel from '@atoms/BaseLabel.vue';
import BaseSelect from '../BaseSelect.vue';
import CheckIcon from '@atoms/CheckIcon.vue';
import i18n from '../../i18n';
import SelectIcon from '@atoms/SelectIcon.vue';

describe('BaseSelect', () => {
  const defaultTemplate = `
    <BaseSelect v-model="test"
              item-key="value"
              :items="items"/>
  `;
  const itemsTest = [
    { value: 'test0' },
    { value: 'test1' },
    { value: 'test2' },
  ];
  function factory(template = defaultTemplate, options?: TestingOptions) {
    const testModel = ref(null);
    const App = {
      components: {
        BaseSelect,
        BaseLabel,
      },
      template,
      data: () => ({
        test: testModel,
        items: itemsTest,
      }),
    };
    const wrapper = mount(App, {
      global: {
        components: {
          BaseLabel,
          CheckIcon,
          SelectIcon,
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
    const list = wrapper.find('ul');

    expect(button.exists()).toBeTruthy();
    expect(label.exists()).toBeFalsy();
    expect(list.exists()).toBeFalsy();
    expect(testModel.value).toBeNull();
  });

  test('should create component with label', async () => {
    const template = `
    <BaseSelect v-model="test"
              item-key="value"
              label="Test"
              :items="items"/>
  `;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const button = wrapper.find('button');
    const label = wrapper.find('label');
    const list = wrapper.find('ul');

    expect(button.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(list.exists()).toBeFalsy();
    expect(testModel.value).toBeNull();
  });

  test('should create component with label and options after click', async () => {
    const template = `
    <BaseSelect v-model="test"
              item-key="value"
              label="Test"
              :items="items"/>
  `;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const button = wrapper.find('button');
    const label = wrapper.find('label');
    await button.trigger('click');
    const list = wrapper.find('ul');
    const options = wrapper.findAll('li');

    expect(button.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(list.exists()).toBeTruthy();
    expect(options.length).toBe(3);
    expect(testModel.value).toBeNull();
  });

  test('should set value to model after click option', async () => {
    const template = `
    <BaseSelect v-model="test"
              item-key="value"
              label="Test"
              :items="items"/>
  `;
    const { wrapper, testModel } = factory(template, {
      createSpy: vi.fn,
    });

    const button = wrapper.find('button');
    const label = wrapper.find('label');
    await button.trigger('click');
    const list = wrapper.find('ul');
    const options = wrapper.findAll('li');
    await options[1].trigger('click');

    expect(button.exists()).toBeTruthy();
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('Test');
    expect(list.exists()).toBeTruthy();
    expect(options.length).toBe(3);
    expect(testModel.value).toStrictEqual(itemsTest[1]);
  });
});
