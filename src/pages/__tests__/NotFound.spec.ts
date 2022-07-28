import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, it, expect } from 'vitest';
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils';

import BaseCard from '@atoms/BaseCard.vue';
import i18n from '../../i18n';
import NotFound from '../NotFound.vue';
import router from '../../router';

describe('NotFound', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should display header text', async () => {
    const msg = 'Page not found';
    const wrapper = mount(NotFound, {
      global: {
        components: {
          BaseCard,
        },
        plugins: [i18n, router],
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    await flushPromises();

    expect(wrapper.find('h2').text()).toEqual(msg);
    expect(wrapper.find('a').text()).toBe('Login');
  });
});
