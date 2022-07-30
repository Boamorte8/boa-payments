<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="p-2 md:p-4">
    <h1 class="dark:text-white font-bold text-xl mb-4">
      {{ t('information') }}
    </h1>

    <p class="dark:text-white">{{ t('pageInfo.description') }}</p>
  </div>
</template>
