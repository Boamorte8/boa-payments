<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section>
    <base-card class="flex-col">
      <h2 class="font-bold mb-4 text-lg">{{ t('pageNotFound.title') }}</h2>
      <p>{{ t('pageNotFound.description') }} <router-link class="underline" to="/auth">{{ t('login') }}</router-link></p>
    </base-card>
  </section>
</template>