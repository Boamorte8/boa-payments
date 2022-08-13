<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import NotFoundImage from '@atoms/NotFoundImage.vue';

const { t } = useI18n();
</script>

<template>
  <section class="pt-4">
    <BaseCard class="flex-col m-2 max-w-lg mx-auto md:my-4">
      <h2 class="font-bold mb-4 text-lg dark:text-white">
        {{ t('pageNotFound.title') }}
      </h2>
      <p class="dark:text-white text-center mb-4">
        {{ t('pageNotFound.description') }}
        <router-link class="underline" to="/auth">{{ t('login') }}</router-link>
      </p>
      <NotFoundImage class="max-w-lg p-4 max-h-96" />
    </BaseCard>
  </section>
</template>
