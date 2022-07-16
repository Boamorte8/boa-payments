<script setup lang="ts">
import type { PropType } from 'vue';
import type { Toast } from '@stores/models';

const props = defineProps({
  toast: {
    type: Object as PropType<Toast>,
    required: true,
  },
});
</script>

<template>
  <div class="toast">
    <div class="header">
      <h3>{{ toast.title }}</h3>
    </div>
    <div class="content">
      <p>{{ toast.message }}</p>
    </div>
  </div>
</template>
