<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { LogoType } from '@app/models';

const { t } = useI18n();
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
      {{ t('logo') }}
    </div>
    <h2 v-if="props.mode === LogoType.Complete" class="title">
      {{ t('logoComplete') }}
    </h2>
  </div>
</template>

<style scoped>
.title {
  @apply text-xl leading-5 text-white font-bold;
}
</style>
