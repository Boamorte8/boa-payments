<template>
  <button v-if="!link" class="button" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else class="link" :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
export default {
  props: {
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
  },
}
</script>

<style scoped>
.button,
.link {
  @apply inline-block no-underline cursor-pointer text-white rounded-3xl py-3 px-6 border-2 border-purple-900
    bg-purple-900 hover:bg-purple-700 hover:border-purple-700 active:bg-purple-700 active:border-purple-700;

  font: inherit;
}

/* a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
} */

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