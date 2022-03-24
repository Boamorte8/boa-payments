import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, fn, test } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';

import i18n from '../../i18n';
import router from '../../router';
import TheHeader from '../layout/TheHeader.vue';
import DropdownItem from '../ui/DropdownItem.vue';
import LogoutIcon from '../common/LogoutIcon.vue';
import OptionsIcon from '../common/OptionsIcon.vue';
import TranslateIcon from '../common/TranslateIcon.vue';
import { useAuthUserStore } from '../../stores';

describe('TheHeader', () => {
  function factory(options?: TestingOptions) {
    const wrapper = mount(TheHeader, {
      global: {
        components: {
          DropdownItem,
          LogoutIcon,
          OptionsIcon,
          TranslateIcon,
        },
        plugins: [i18n, router, createTestingPinia(options)],
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    const authUser = useAuthUserStore();

    return { wrapper, authUser };
  }

  test('should create component', () => {
    const { wrapper } = factory({
      createSpy: fn,
    });
    expect(TheHeader).toBeTruthy();
  });

  test('should display app title and Login button', () => {
    const msg = 'Boa Payments';
    const { wrapper } = factory({
      createSpy: fn,
    });

    expect(wrapper.find('h1').text()).toEqual(msg);
    expect(wrapper.find('.nav-item').text()).toEqual('Login');
    expect(wrapper.find('.nav-item').text()).not.toEqual('Orders');
  });

  test('should display app title and 2 buttons', async () => {
    const msg = 'Boa Payments';
    const { wrapper } = factory({
      initialState: {
        'auth/user': {
          token: 'testTokenId',
        },
      },
      createSpy: fn,
    });

    expect(wrapper.find('h1').text()).toEqual(msg);
    expect(wrapper.find('.nav-item').text()).toEqual('Orders');
    expect(wrapper.find('.nav-item').text()).not.toEqual('Login');
  });
});
