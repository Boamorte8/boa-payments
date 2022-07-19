<script setup lang="ts">
import type { PropType } from 'vue';

import type { Toast } from '@stores/models';
import { useToastStore } from '@stores/toastStore';

const toastStore = useToastStore();
const props = defineProps({
  toast: {
    type: Object as PropType<Toast>,
    required: true,
  },
});

const dismissToast = () => {
  toastStore.clearToast(props.toast.id);
};

if (!props.toast.stopAutoDismiss) {
  setTimeout(() => {
    dismissToast();
  }, 5000);
}
</script>

<template>
  <div
    class="toast w-80 min-h-12 rounded-xl box-border mb-4 p-4 shadow-md bg-white text-black shadow-gray-300"
    :class="toast.type"
  >
    <div class="flex w-full justify-between mb-1">
      <h3 class="font-semibold text-base">{{ toast.title }}</h3>

      <button class="rounded-[50%]" @click="dismissToast">
        <PlusIcon class="h-6 w-6 rotate-45" />
      </button>
    </div>

    <p>{{ toast.message }}</p>
  </div>
</template>

<style lang="postcss" scoped>
.toast {
  &.success,
  &.info,
  &.warning,
  &.error {
    @apply text-white;
  }

  &.success {
    @apply bg-success-700 shadow-success-300;
  }

  &.info {
    @apply bg-secondary-700 shadow-secondary-300;
  }

  &.error {
    @apply bg-error-700 shadow-error-300;
  }

  &.warning {
    @apply bg-warning-700 shadow-warning-300;
  }
}
</style>
