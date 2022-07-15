<script setup lang="ts">
import { computed } from '@vue/reactivity';

import { breakpointsTailwind, useMediaQuery } from '@vueuse/core';
import { Menu } from '@headlessui/vue';
import { useI18n } from 'vue-i18n';

import { UserTheme } from '@stores/models';
import { useAuthUserStore, usePreferencesUserStore } from '@stores/index';
import DropdownOptions from '@molecules/DropdownOptions.vue';
import LogoApp from '@atoms/LogoApp.vue';
import { LogoType } from '@app/models';

const { t } = useI18n();
const store = useAuthUserStore();
const prefStore = usePreferencesUserStore();
const isMedium = useMediaQuery(`(min-width: ${breakpointsTailwind.sm}px)`);

const mode = computed(() =>
  isMedium.value ? LogoType.Complete : LogoType.Simple
);
prefStore.updateTheme(UserTheme.DARK);
</script>

<template>
  <Menu>
    <header class="header">
      <nav class="nav">
        <router-link class="link" to="/">
          <LogoApp :mode="mode" />
        </router-link>
        <div class="flex gap-2">
          <template v-if="!store.isAuthenticated">
            <base-button link :to="{ name: 'auth' }">{{
              t('login')
            }}</base-button>
          </template>
          <template v-else>
            <base-button link :to="{ name: 'orders' }">{{
              t('orders', 2)
            }}</base-button>
            <base-button link :to="{ name: 'payments' }">{{
              t('payments', 2)
            }}</base-button>
          </template>
          <base-button menu class="inline-flex items-center">
            <OptionsIcon />
          </base-button>
        </div>
      </nav>
    </header>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <DropdownOptions />
    </transition>
  </Menu>
</template>

<style lang="postcss" scoped>
.header {
  @apply w-full h-20 p-4 flex items-center justify-center bg-primary-700 dark:bg-background;
}

.nav {
  @apply w-full flex items-center justify-between;
}
</style>
