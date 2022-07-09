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
  <base-dialog loader fixed :show="props.loading">
    <BaseSpinner />
  </base-dialog>
</template>
