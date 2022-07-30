<script setup lang="ts">
import { computed } from 'vue';
import { MenuItems } from '@headlessui/vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthUserStore } from '@stores/index';

const { t, locale } = useI18n();
const store = useAuthUserStore();

const router = useRouter();

const changeLanguage = () => {
  locale.value = locale.value === 'en' ? 'es' : 'en';
};

const changeLangTo = computed(() => (locale.value === 'en' ? 'es' : 'en'));

const goToSettings = () => {
  router.push({ name: 'config' });
};

const goToInfo = () => {
  router.push({ name: 'info' });
};

const logout = () => {
  store.logout();
  router.replace('/');
};
</script>

<template>
  <MenuItems
    class="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white dark:bg-background divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    <dropdown-item @click="changeLanguage">
      <TranslateIcon class="mr-2 text-primary-300" /> {{ t('changeLang') }}
      {{ changeLangTo }}
    </dropdown-item>

    <dropdown-item v-if="store.isAuthenticated" @click="goToSettings">
      <SettingsIcon class="mr-2 text-primary-300" /> {{ t('userSettings') }}
    </dropdown-item>

    <dropdown-item @click="goToInfo">
      <InfoIcon class="mr-2 text-primary-300" /> {{ t('information') }}
    </dropdown-item>

    <dropdown-item v-if="store.isAuthenticated" @click="logout">
      <LogoutIcon class="mr-2 text-primary-300" /> {{ t('logout') }}
    </dropdown-item>
  </MenuItems>
</template>
