<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});
console.log(props.loading);
</script>

<template>
  <BaseDialog loader fixed :show="loading">
    <BaseSpinner />
  </BaseDialog>
</template>
