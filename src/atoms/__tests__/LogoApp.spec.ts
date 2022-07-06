import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import i18n from '../../i18n';
import LogoApp from '@atoms/LogoApp.vue';
import { LogoType } from '@app/models';

describe('LogoApp', () => {
  function factory(options?: TestingOptions) {
    const wrapper = mount(LogoApp, {
      global: {
        components: {},
        plugins: [i18n, createTestingPinia(options)],
      },
    });

    return { wrapper };
  }

  test('should create component', () => {
    expect(LogoApp).toBeTruthy();
  });

  test('should display only the logo', async () => {
    const { wrapper } = factory({
      createSpy: vi.fn,
    });

    expect(wrapper.findAll('.title').length).toBe(1);
  });

  test('should display only the logo', async () => {
    const { wrapper } = factory({
      createSpy: vi.fn,
    });

    await wrapper.setProps({
      mode: LogoType.Complete,
    });

    expect(wrapper.findAll('.title').length).toBe(2);
  });
});
