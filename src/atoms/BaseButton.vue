<script setup lang="ts">
import type { PropType } from 'vue';
import { MenuButton } from '@headlessui/vue';
import type { RouteLocationRaw } from 'vue-router';

type ButtonType = 'button' | 'reset' | 'submit';

defineProps({
  mode: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  menu: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String as PropType<ButtonType>,
    required: false,
    default: 'button',
  },
  to: {
    type: Object as PropType<RouteLocationRaw>,
    required: false,
    default: () => ({ name: '/' }),
  },
});
</script>

<template>
  <button
    v-if="!link && !menu"
    class="button"
    :class="mode"
    :type="type"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
  <MenuButton
    v-else-if="menu"
    class="button"
    :class="mode"
    :disabled="disabled"
  >
    <slot></slot>
  </MenuButton>
  <router-link v-else class="link" :to="to" :class="mode" :disabled="disabled">
    <slot></slot>
  </router-link>
</template>

<style lang="postcss" scoped>
.button,
.link {
  @apply inline-flex items-center no-underline text-white leading-4 h-9 rounded-lg py-2 px-4 border-2 border-primary
    bg-primary hover:bg-primary-700 hover:border-primary-700 active:bg-primary active:border-primary-300
    disabled:bg-gray-500 disabled:border-gray-500;
}

.button.router-link-active,
.link.router-link-active {
  @apply border-primary-300;
}

.flat {
  @apply bg-transparent text-primary-700 dark:text-primary-300 border-0;
}

.outline {
  @apply bg-transparent border-primary-700 text-primary-700 dark:border-primary-300 dark:text-primary-300;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  @apply bg-primary-300 dark:text-primary-700;
}
</style>
