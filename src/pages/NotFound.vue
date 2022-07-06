<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="pt-4">
    <base-card class="flex-col m-2 max-w-lg md:mx-auto md:my-4">
      <h2 class="font-bold mb-4 text-lg dark:text-white">
        {{ t('pageNotFound.title') }}
      </h2>
      <p class="dark:text-white text-center">
        {{ t('pageNotFound.description') }}
        <router-link class="underline" to="/auth">{{ t('login') }}</router-link>
      </p>
    </base-card>
  </section>
</template>
