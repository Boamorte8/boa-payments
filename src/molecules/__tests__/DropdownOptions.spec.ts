/* eslint-disable @intlify/vue-i18n/no-raw-text */
import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';

import { Menu, MenuButton } from '@headlessui/vue';

import BaseButton from '@atoms/BaseButton.vue';
import DropdownItem from '@atoms/DropdownItem.vue';
import DropdownOptions from '../DropdownOptions.vue';
import i18n from '../../i18n';
import InfoIcon from '@atoms/InfoIcon.vue';
import LogoutIcon from '@atoms/LogoutIcon.vue';
import ReportIcon from '@atoms/ReportIcon.vue';
import SettingsIcon from '@atoms/SettingsIcon.vue';
import router from '../../router';
import TranslateIcon from '@atoms/TranslateIcon.vue';

describe('DropdownOptions', () => {
  function factory(options?: TestingOptions) {
    const App = {
      components: {
        BaseButton,
        DropdownOptions,
        Menu,
      },
      template: `
        <Menu>
          <BaseButton :menu="true">Options</BaseButton>
          <DropdownOptions />
        </Menu>
      `,
    };
    const wrapper = mount(App, {
      global: {
        components: {
          DropdownItem,
          InfoIcon,
          LogoutIcon,
          MenuButton,
          ReportIcon,
          SettingsIcon,
          TranslateIcon,
        },
        plugins: [i18n, router, createTestingPinia(options)],
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    return { wrapper };
  }

  test('should create component', async () => {
    const { wrapper } = factory({
      createSpy: vi.fn,
    });
    const button = wrapper.find('#headlessui-menu-button-1');
    await button.trigger('click');

    const items = wrapper.findAll('[role="menuitem"]');

    expect(DropdownOptions).toBeTruthy();
    expect(items.length).toBe(2);
    expect(items[0].text()).toBe('Change lang to es');
  });

  test('should display 5 menu items WHEN the user is authenticated', async () => {
    const { wrapper } = factory({
      createSpy: vi.fn,
      initialState: {
        'auth/user': {
          token: 'token test',
        },
      },
    });
    const button = wrapper.find('#headlessui-menu-button-5');
    await button.trigger('click');

    const items = wrapper.findAll('[role="menuitem"]');

    expect(items.length).toBe(5);
    expect(items[0].text()).toBe('Change lang to es');
    expect(items[1].text()).toBe('User Settings');
    expect(items[2].text()).toBe('Summary');
    expect(items[3].text()).toBe('Information');
    expect(items[4].text()).toBe('Logout');
  });
});
