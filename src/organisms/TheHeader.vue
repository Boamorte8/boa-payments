<script setup lang="ts">
import { Menu, MenuButton } from '@headlessui/vue';
import { useI18n } from 'vue-i18n';

import { UserTheme } from '@stores/models';
import { useAuthUserStore, usePreferencesUserStore } from '@stores/index';
import DropdownOptions from '@molecules/DropdownOptions.vue';

const { t } = useI18n();
const store = useAuthUserStore();
const prefStore = usePreferencesUserStore();

prefStore.updateTheme(UserTheme.LIGHT);
</script>

<template>
  <Menu>
    <header class="header">
      <nav class="nav">
        <h1 class="logo">
          <router-link class="link" to="/">Boa Payments</router-link>
        </h1>
        <div class="flex gap-2">
          <ul class="nav-list">
            <li v-if="!store.isAuthenticated">
              <router-link class="nav-item" :to="{ name: 'auth' }">{{
                t('login')
              }}</router-link>
            </li>
            <li v-if="store.isAuthenticated">
              <router-link class="nav-item" :to="{ name: 'orders' }">{{
                t('orders')
              }}</router-link>
            </li>
            <li v-if="store.isAuthenticated">
              <router-link class="nav-item" :to="{ name: 'payments' }">{{
                t('payments')
              }}</router-link>
            </li>
          </ul>
          <MenuButton class="nav-item"><OptionsIcon /></MenuButton>
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
      <dropdown-options></dropdown-options>
    </transition>
  </Menu>
</template>

<style lang="postcss" scoped>
.header {
  @apply w-full h-20 flex items-center justify-center bg-purple-900;
  .router-link-active {
    @apply active:border-gray-300 hover:border-gray-300;
  }
}

.nav {
  @apply w-11/12 m-auto flex items-center justify-between;

  &-list {
    @apply flex items-center justify-center p-0 m-0 list-none gap-2;
  }

  &-item {
    @apply inline-flex justify-center w-fit px-4 py-2 h-10 font-medium text-white bg-black rounded-md bg-opacity-20
      hover:bg-opacity-30 focus:outline-none;
  }
}

.logo {
  @apply m-0 font-bold text-xl;

  .link {
    @apply text-white m-0 hover:border-transparent;

    .router-link-active {
      @apply border-transparent;
    }
  }
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid transparent;
  @apply border-primary-300;
}
</style>
