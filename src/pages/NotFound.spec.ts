import { mount } from '@vue/test-utils';
// import * as VueRouter from 'vue-router';

import NotFound from './NotFound.vue';

describe('NotFound', () => {
  it('should display header text', () => {
    const msg = 'Page not found';
    const wrapper = mount(NotFound, {
      // global: {
      //   plugins: [VueRouter],
      //   config: {
      //     compilerOptions: {
      //       isCustomElement: (tag: string) => tag.startsWith('router-') || tag.startsWith('base-'),
      //     },
      //   },
      // },
    });

    expect(wrapper.find('h2').text()).toEqual(msg);
  });
});