<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: false,
    default: 'horizontal',
  },
});
</script>

<template>
  <div
    class="flex w-full"
    :class="
      mode === 'vertical'
        ? 'flex-col gap-1 mb-2 last:mb-0'
        : 'justify-between py-2'
    "
  >
    <BaseLabel class="mb-0">{{ label }}</BaseLabel>
    <span class="dark:text-white">{{ value }}</span>
  </div>
</template>
