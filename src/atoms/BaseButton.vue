<script setup lang="ts">
import type { PropType } from 'vue';
import { MenuButton } from '@headlessui/vue';

type LinkType = string | { name: string };

const props = defineProps({
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
  to: {
    type: Object as PropType<LinkType>,
    required: false,
    default: () => ({ name: '/' }),
  },
});
</script>

<template>
  <button v-if="!props.link && !props.menu" class="button" :class="props.mode">
    <slot></slot>
  </button>
  <MenuButton v-else-if="props.menu" class="button" :class="props.mode">
    <slot></slot>
  </MenuButton>
  <router-link v-else class="link" :to="props.to" :class="props.mode">
    <slot></slot>
  </router-link>
</template>

<style scoped>
.button,
.link {
  @apply inline-flex items-center no-underline text-white leading-4 h-9 rounded-lg py-2 px-4 border-2 border-primary
    bg-primary hover:bg-primary-700 hover:border-primary-700 active:bg-primary active:border-primary-300;
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
  /* @apply bg-primary-300; */
  @apply bg-primary-300 dark:text-primary-700;
}
</style>
