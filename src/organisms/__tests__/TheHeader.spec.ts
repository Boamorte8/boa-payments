import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';

import BaseButton from '@atoms/BaseButton.vue';
import DropdownItem from '@atoms/DropdownItem.vue';
import InfoIcon from '@atoms/InfoIcon.vue';
import LogoutIcon from '@atoms/LogoutIcon.vue';
import OptionsIcon from '@atoms/OptionsIcon.vue';
import ReportIcon from '@atoms/ReportIcon.vue';
import SettingsIcon from '@atoms/SettingsIcon.vue';
import TranslateIcon from '@atoms/TranslateIcon.vue';
import LogoApp from '@molecules/LogoApp.vue';
import i18n from '../../i18n';
import router from '../../router';
import { useAuthUserStore } from '../../stores';
import TheHeader from '../TheHeader.vue';

describe('TheHeader', () => {
  function factory(options?: TestingOptions) {
    const wrapper = mount(TheHeader, {
      global: {
        components: {
          BaseButton,
          DropdownItem,
          InfoIcon,
          LogoApp,
          LogoutIcon,
          OptionsIcon,
          ReportIcon,
          SettingsIcon,
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
