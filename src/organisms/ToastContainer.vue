<script setup lang="ts">
import { computed } from 'vue';

import BaseToast from '@molecules/BaseToast.vue';
import { useToastStore } from '@stores/toastStore';

const store = useToastStore();
const toasts = computed(() => store.toasts);
</script>

<template>
  <div
    v-if="toasts.length"
    class="toasts-wrapper fixed right-8 bottom-4 flex flex-col"
  >
    <TransitionGroup
      tag="div"
      move-class="transition duration-400 ease-out"
      enter-active-class="transition duration-400 ease-out"
      enter-from-class="transform translate-y-[70px] opacity-0"
      enter-to-class="transform translate-y-[0] opacity-100"
      leave-active-class="transition duration-400 ease-in"
      leave-from-class="transform translate-y-[0] opacity-100"
      leave-to-class="transform -translate-y-[70px] opacity-0"
    >
      <BaseToast v-for="toast of toasts" :key="toast.id" :toast="toast" />
    </TransitionGroup>
  </div>
</template>
