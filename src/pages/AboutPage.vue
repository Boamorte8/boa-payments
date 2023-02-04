<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import GithubIcon from '@atoms/GithubIcon.vue';
import LinkedinIcon from '@atoms/LinkedinIcon.vue';

const { t } = useI18n();
</script>

<template>
  <div class="p-8 lg:p-10">
    <h1 class="dark:text-white font-bold text-xl mb-4">
      {{ t('information') }}
    </h1>

    <p class="dark:text-white mb-4">{{ t('pageInfo.description') }}</p>

    <p class="dark:text-white mb-4">{{ t('pageInfo.madeBy') }}</p>

    <div class="link-wrapper">
      <img src="/boamorte.svg" class="h-7" alt="Esteban Salazar Logo" />
      <p class="dark:text-white">
        {{ t('pageInfo.myPortfolio') }}
        <a class="link" href="https://boamorte.dev" target="_blank"
          >boamorte.dev</a
        >
      </p>
    </div>

    <div class="link-wrapper">
      <LinkedinIcon classes="h-7 w-7 text-white" />
      <p class="dark:text-white">
        {{ t('pageInfo.myLinkedIn') }}
        <a
          class="link"
          href="https:///www.linkedin.com/in/esteban-salazar-zapata/"
          target="_blank"
          >Esteban Salazar Zapata</a
        >
      </p>
    </div>

    <div class="link-wrapper">
      <GithubIcon classes="h-7 w-7 text-white" />
      <p class="dark:text-white">
        {{ t('pageInfo.myGithub') }}
        <a class="link" href="https://github.com/Boamorte8" target="_blank"
          >Boamorte8</a
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
.link {
  @apply text-primary-700 dark:text-primary-300 transition-transform hover:scale-105;
}

.link-wrapper {
  @apply flex gap-4 items-center mb-4;
}
</style>
