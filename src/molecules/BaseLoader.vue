<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <BaseDialog loader fixed :show="props.loading">
    <BaseSpinner />
  </BaseDialog>
</template>
