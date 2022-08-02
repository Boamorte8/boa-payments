<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="p-2 md:p-4">
    <h1 class="dark:text-white font-bold text-xl mb-4">
      {{ t('information') }}
    </h1>

    <p class="dark:text-white mb-4">{{ t('pageInfo.description') }}</p>

    <p class="dark:text-white mb-4">{{ t('pageInfo.madeBy') }}</p>

    <p class="dark:text-white mb-4">
      {{ t('pageInfo.myGithub') }}
      <a
        class="text-primary-700 dark:text-primary-300"
        href="https://github.com/Boamorte8"
        target="_blank"
      >
        {{ t('pageInfo.githubProfile') }}
      </a>
    </p>
  </div>
</template>
