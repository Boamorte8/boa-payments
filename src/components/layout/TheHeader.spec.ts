import { mount  } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import i18n from '../../i18n';
import router from '../../router';
import TheHeader from './TheHeader.vue';


describe('NotFound', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should display app title', () => {
    const msg = 'Boa Payments';
    const wrapper = mount(TheHeader, {
      global: {
        components: {
        },
        plugins: [i18n, router],
      },
      stubs: ['router-link'],
    });

    expect(wrapper.find('h1').text()).toEqual(msg);
  });
});