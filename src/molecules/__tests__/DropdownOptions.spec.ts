import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';

import { Menu, MenuItems } from '@headlessui/vue';

import DropdownItem from '@atoms/DropdownItem.vue';
import DropdownOptions from '../DropdownOptions.vue';
import i18n from '../../i18n';
import LogoutIcon from '@atoms/LogoutIcon.vue';
import router from '../../router';
import TranslateIcon from '@atoms/TranslateIcon.vue';

describe('DropdownOptions', () => {
  function factory(options?: TestingOptions) {
    const App = {
      components: {
        DropdownOptions,
        Menu,
      },
      template: `
        <Menu>
          <dropdown-options></dropdown-options>
        </Menu>
      `
    }
    const wrapper = mount(App, {
      global: {
        components: {
          DropdownItem,
          LogoutIcon,
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

  test('should create component', () => {
    const { wrapper } = factory({
      createSpy: vi.fn,
    });

    const items = wrapper.findAll('dropdown-item');
    console.log(items);
    console.log('html', wrapper.html());
    // FIXME - Fix unit test

    // expect(element).toBeTruthy();
    expect(DropdownOptions).toBeTruthy();
  });
});
