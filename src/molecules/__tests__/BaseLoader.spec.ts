import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';

import BaseButton from '@atoms/BaseButton.vue';
import BaseSpinner from '@atoms/BaseSpinner.vue';
import i18n from '../../i18n';
import router from '../../router';
import BaseDialog from '../BaseDialog.vue';
import BaseLoader from '../BaseLoader.vue';

describe('BaseLoader', () => {
  function factory(options?: TestingOptions) {
    const wrapper = mount(BaseLoader, {
      global: {
        components: {
          BaseButton,
          BaseDialog,
          BaseSpinner,
        },
        plugins: [i18n, router, createTestingPinia(options)],
        stubs: {
          teleport: true,
        },
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
    const overlay = wrapper.find('.bg-overlay');
    const spinner = wrapper.find('.lds-roller');

    expect(overlay.exists()).toBeFalsy();
    expect(spinner.exists()).toBeFalsy();
  });

  // test('should display spinner when loading is true', async () => {
  //   const { wrapper } = factory({
  //     createSpy: vi.fn,
  //   });
  //   await wrapper.setProps({
  //     loading: true,
  //   });

  //   const overlay = wrapper.find('.bg-overlay');
  //   const spinner = wrapper.find('.lds-roller');

  //   expect(overlay.exists()).toBeTruthy();
  //   expect(spinner.exists()).toBeTruthy();
  // });
});
