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
  @apply inline-flex no-underline text-white leading-4 h-9 rounded-lg py-2 px-4 border-2 border-primary bg-primary
    hover:bg-primary-700 hover:border-primary-700 active:bg-primary active:border-primary-300;
}

.button.router-link-active,
.link.router-link-active {
  @apply border-primary-300;
}

.flat {
  @apply bg-transparent text-purple-900 border-0;
}

.outline {
  @apply bg-transparent border-purple-900 text-purple-900;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  @apply bg-purple-200;
}
</style>
