import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';

import {Menu, MenuButton } from '@headlessui/vue';

import BaseButton from '@atoms/BaseButton.vue';
import i18n from '../../i18n';
import router from '../../router';

describe('BaseButton', () => {
  function factory(optionsMount = {}, optionsPinia?: TestingOptions) {
    const wrapper = mount(BaseButton, {
      global: {
        components: {
          MenuButton,
        },
        plugins: [i18n, router, createTestingPinia(optionsPinia)],
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
      ...optionsMount,
    });

    return { wrapper };
  }

  test('should create component', () => {
    expect(BaseButton).toBeTruthy();
  });

  test('should display a button', async () => {
    const options = {
      slots: {
        default: 'Test',
      },
    }
    const { wrapper } = factory(options, {
      createSpy: vi.fn,
    });
    await wrapper.setProps({
      mode: 'flat',
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBeTruthy();
    expect(button.text()).toBe('Test');
  });

  test('should display a link', async () => {
    const options = {
      slots: {
        default: 'Test',
      },
    }
    const { wrapper } = factory(options, {
      createSpy: vi.fn,
    });
    await wrapper.setProps({
      link: true,
      to: '/',
    });

    const element = wrapper.find('.link');
    expect(element.exists()).toBeTruthy();
    expect(element.attributes().href).toBe('/');
    expect(element.text()).toBe('Test');
  });

  test('should display a menu button', async () => {
    const App = {
      components: {
        BaseButton,
        Menu,
        MenuButton,
      },
      template: `
        <Menu>
          <base-button :menu="true">Test</base-button>
        </Menu>
      `
    }
    const wrapper = mount(App, {
      global: {
        components: {
          BaseButton,
          Menu,
          MenuButton,
        },
        plugins: [
          i18n,
          router,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    const element = wrapper.find('.button');
    expect(element.exists()).toBeTruthy();
    expect(element.text()).toBe('Test');
  });
});
