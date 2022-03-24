import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, fn, test } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';

import DropdownItem from '@components/ui/DropdownItem.vue';
import i18n from '../../i18n';
import router from '../../router';

describe('DropdownItem', () => {
  function factory(options?: TestingOptions) {
    const wrapper = mount(DropdownItem, {
      global: {
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
      createSpy: fn,
    });
    expect(DropdownItem).toBeTruthy();
  });

  // test('should display a button', async () => {
  //   const { wrapper } = factory();
  //   wrapper.setProps({
  //     mode: 'flat',
  //   });

  //   expect(wrapper.find('button')).toBeTruthy();
  // });

  // test('should display a link', async () => {
  //   const { wrapper } = factory();
  //   wrapper.setProps({
  //     link: true,
  //   });
  //   await flushPromises();

  //   expect(wrapper.find('a')).toBeTruthy();
  // });
});
