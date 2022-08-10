import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { Menu, MenuButton } from '@headlessui/vue';

import DropdownItem from '../DropdownItem.vue';
import i18n from '../../i18n';
import router from '../../router';

describe('DropdownItem', () => {
  function factory(options?: TestingOptions) {
    const App = {
      components: {
        DropdownItem,
        Menu,
        MenuButton,
      },
      template: `
        <Menu>
          <dropdown-item><span>test</span></dropdown-item>
        </Menu>
      `,
    };
    const wrapper = mount(App, {
      global: {
        components: {
          DropdownItem,
          Menu,
          MenuButton,
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

    const element = wrapper.find('span');

    expect(element.text()).toBe('test');
    expect(element).toBeTruthy();
    expect(DropdownItem).toBeTruthy();
  });
});
