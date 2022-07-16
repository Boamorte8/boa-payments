<script setup lang="ts">
import { computed } from 'vue';

import BaseToast from '@atoms/BaseToast.vue';
import { useToastStore } from '@stores/toastStore';

const store = useToastStore();
const toasts = computed(() => store.toasts);
</script>

<template>
  <div v-if="toasts.length" class="toasts-wrapper">
    <BaseToast v-for="(toast, index) of toasts" :key="index" :toast="toast" />
  </div>
</template>
