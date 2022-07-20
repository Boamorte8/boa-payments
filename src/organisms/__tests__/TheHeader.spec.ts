import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';

import BaseButton from '@atoms/BaseButton.vue';
import DropdownItem from '@atoms/DropdownItem.vue';
import i18n from '../../i18n';
import LogoApp from '@atoms/LogoApp.vue';
import LogoutIcon from '@atoms/LogoutIcon.vue';
import OptionsIcon from '@atoms/OptionsIcon.vue';
import { router } from '../../router';
import TheHeader from '../TheHeader.vue';
import TranslateIcon from '@atoms/TranslateIcon.vue';
import { useAuthUserStore } from '../../stores';

describe('TheHeader', () => {
  function factory(options?: TestingOptions) {
    const wrapper = mount(TheHeader, {
      global: {
        components: {
          BaseButton,
          DropdownItem,
          LogoApp,
          LogoutIcon,
          OptionsIcon,
          TranslateIcon,
        },
        plugins: [i18n, router, createTestingPinia(options)],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const authUser = useAuthUserStore();

    return { wrapper, authUser };
  }

  test('should create component', () => {
    expect(TheHeader).toBeTruthy();
  });

  test('should display app title and Login button', async () => {
    const msg = 'BP';
    const { wrapper } = factory({
      createSpy: vi.fn,
    });

    expect(wrapper.find('.title').text()).toEqual(msg);
    expect(wrapper.findAll('.link').length).toBe(2);
  });

  test('should display app title and 2 buttons', async () => {
    const msg = 'BP';
    const { wrapper } = factory({
      initialState: {
        'auth/user': {
          token: 'testTokenId',
        },
      },
      createSpy: vi.fn,
    });

    expect(wrapper.find('.title').text()).toEqual(msg);
    expect(wrapper.findAll('.link').length).toBe(3);
  });
});
