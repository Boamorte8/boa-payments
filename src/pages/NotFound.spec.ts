import { mount  } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import i18n from '../i18n';
import router from '../router';
import NotFound from './NotFound.vue';
import BaseCard from '../components/ui/BaseCard.vue';


describe('NotFound', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should display header text', () => {
    const msg = 'Page not found';
    const wrapper = mount(NotFound, {
      global: {
        components: {
          BaseCard,
        },
        plugins: [i18n, router],
      },
      stubs: ['router-link'],
    });

    expect(wrapper.find('h2').text()).toEqual(msg);
  });
});