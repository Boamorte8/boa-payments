import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';

import AddEntity from '../AddEntity.vue';
import { AutoFocus } from '@plugins/AutoFocus';
import BaseButton from '@atoms/BaseButton.vue';
import BaseDialog from '@molecules/BaseDialog.vue';
import BaseInput from '@molecules/BaseInput.vue';
import BaseLabel from '@atoms/BaseLabel.vue';
import i18n from '../../i18n';

describe('BaseDialog', () => {
  function factory(options?: TestingOptions) {
    const wrapper = mount(AddEntity, {
      global: {
        components: {
          BaseButton,
          BaseDialog,
          BaseInput,
          BaseLabel,
        },
        directives: { focus: AutoFocus },
        plugins: [i18n, createTestingPinia(options)],
        stubs: {
          teleport: true,
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { wrapper };
  }

  test('should create component', async () => {
    const { wrapper } = factory({
      initialState: {
        entity: {
          openModal: true,
        },
      },
      createSpy: vi.fn,
    });

    const title = wrapper.find('h2');
    const overlay = wrapper.find('.bg-overlay');
    const dialog = wrapper.find('dialog');
    const required = wrapper.find('p');
    const closeButton = wrapper.find('button');

    expect(overlay.exists()).toBeTruthy();
    expect(dialog.exists()).toBeTruthy();
    expect(title.exists()).toBeTruthy();
    expect(required.exists()).toBeTruthy();
    expect(required.text()).toBe('*Fields required');
    expect(closeButton.exists()).toBeTruthy();
    expect(closeButton.text()).toBe('Cancel');
  });
});
