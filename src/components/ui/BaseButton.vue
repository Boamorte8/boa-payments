<script setup lang="ts">
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
  to: {
    type: String,
    required: false,
    default: '/',
  },
});
</script>

<template>
  <button v-if="!props.link" class="button" :class="props.mode">
    <slot></slot>
  </button>
  <router-link v-else class="link" :to="props.to" :class="props.mode">
    <slot></slot>
  </router-link>
</template>

<style scoped>
.button,
.link {
  @apply inline-block no-underline text-white rounded-3xl py-3 px-6 border-2 border-purple-900
    bg-purple-900 hover:bg-purple-700 hover:border-purple-700 active:bg-purple-700 active:border-purple-700;

  font: inherit;
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
