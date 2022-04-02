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
      slots: {
        default: '<span>test</span>',
      },
    });

    return { wrapper };
  }

  test('should create component', () => {
    const { wrapper } = factory({
      createSpy: fn,
    });

    const element = wrapper.find('span');

    expect(element.text()).toBe('test');
    expect(element).toBeTruthy();
    expect(DropdownItem).toBeTruthy();
  });
});
