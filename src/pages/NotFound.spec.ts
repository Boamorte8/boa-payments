import { mount } from '@vue/test-utils';

import NotFound from './NotFound.vue';

describe('NotFound', () => {
  it('should display header text', () => {
    const msg = 'Page not found';
    const wrapper = mount(NotFound);

    expect(wrapper.find('h2').text()).toEqual(msg);
  });
});