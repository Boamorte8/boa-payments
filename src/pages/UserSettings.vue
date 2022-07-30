<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { usePreferencesUserStore } from '@stores/preferencesStore';
import { UserTheme } from '@stores/models';

const { t } = useI18n();
const prefStore = usePreferencesUserStore();
const activeDarkMode = ref(prefStore.isDarkTheme);

watch(
  () => activeDarkMode.value,
  (value) => {
    const mode = value ? UserTheme.DARK : UserTheme.LIGHT;
    prefStore.updateTheme(mode);
  }
);
</script>

<template>
  <div class="p-2 md:p-4">
    <h1 class="dark:text-white font-bold text-xl mb-4">
      {{ t('userSettings') }}
    </h1>

    <div class="flex justify-between items-center mb-4">
      <BaseLabel class="mb-0">{{ t('darkMode') }}</BaseLabel>

      <BaseToggle id="darkMode" v-model="activeDarkMode" />
    </div>
  </div>
</template>
