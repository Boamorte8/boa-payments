import { createTestingPinia, type TestingOptions } from '@pinia/testing';
import { describe, expect, test, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';

import BaseButton from '@atoms/BaseButton.vue';
import BaseDialog from '../BaseDialog.vue';
import i18n from '../../i18n';
import { router } from '../../router';

describe('BaseDialog', () => {
  const defaultTemplate = `
    <base-dialog :show="true">Test</base-dialog>
  `;
  function factory(template = defaultTemplate, options?: TestingOptions) {
    const App = {
      components: {
        BaseDialog,
      },
      template,
    };
    const wrapper = mount(App, {
      global: {
        components: {
          BaseButton,
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

  test('should create component', async () => {
    const { wrapper } = factory(undefined, {
      createSpy: vi.fn,
    });

    const title = wrapper.find('h2');
    const overlay = wrapper.find('.bg-overlay');
    const dialog = wrapper.find('dialog');
    const section = wrapper.find('section');
    const closeButton = wrapper.find('button');

    expect(overlay.exists()).toBeTruthy();
    expect(dialog.exists()).toBeTruthy();
    expect(title.exists()).toBeFalsy();
    expect(section.exists()).toBeTruthy();
    expect(section.text()).toBe('Test');
    expect(closeButton.exists()).toBeTruthy();
    expect(closeButton.text()).toBe('Close');
  });

  test('should create component with header', async () => {
    const template = `
    <base-dialog title="Test title" :show="true">Test dialog with header</base-dialog>
  `;
    const { wrapper } = factory(template, {
      createSpy: vi.fn,
    });

    const title = wrapper.find('h2');
    const overlay = wrapper.find('.bg-overlay');
    const dialog = wrapper.find('dialog');
    const section = wrapper.find('section');
    const closeButton = wrapper.find('button');

    expect(overlay.exists()).toBeTruthy();
    expect(dialog.exists()).toBeTruthy();
    expect(title.exists()).toBeTruthy();
    expect(title.text()).toBe('Test title');
    expect(section.exists()).toBeTruthy();
    expect(section.text()).toBe('Test dialog with header');
    expect(closeButton.exists()).toBeTruthy();
    expect(closeButton.text()).toBe('Close');
  });

  test('should create component without actions', async () => {
    const template = `
    <base-dialog fixed :show="true">Test dialog without actions</base-dialog>
  `;
    const { wrapper } = factory(template, {
      createSpy: vi.fn,
    });

    const title = wrapper.find('h2');
    const overlay = wrapper.find('.bg-overlay');
    const dialog = wrapper.find('dialog');
    const section = wrapper.find('section');
    const closeButton = wrapper.find('button');

    expect(overlay.exists()).toBeTruthy();
    expect(dialog.exists()).toBeTruthy();
    expect(title.exists()).toBeFalsy();
    expect(section.exists()).toBeTruthy();
    expect(section.text()).toBe('Test dialog without actions');
    expect(closeButton.exists()).toBeFalsy();
  });
});
