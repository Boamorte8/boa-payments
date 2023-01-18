<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <BaseDialog loader fixed :show="loading">
    <BaseSpinner />
  </BaseDialog>
</template>
