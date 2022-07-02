<script setup lang="ts">
import { LogoType } from '@app/models';

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: LogoType.Simple,
  },
});
</script>

<template>
  <div class="flex gap-4 items-center">
    <div
      class="title h-10 w-14 rounded-lg p-3 bg-primary-700 flex justify-center items-center"
    >
      BP
    </div>
    <h2 v-if="props.mode === LogoType.Complete" class="title">Boa Payments</h2>
  </div>
</template>

<style scoped>
.title {
  @apply text-xl leading-5 text-white font-bold;
}
</style>
