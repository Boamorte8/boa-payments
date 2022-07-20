<script setup lang="ts">
const props = defineProps({
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
  <div>Test</div>
</template>
