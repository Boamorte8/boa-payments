<script setup lang="ts">
const props = defineProps({
  for: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<template>
  <label class="font-bold mb-2 block dark:text-white" :for="props.for">
    <slot></slot>
  </label>
</template>
