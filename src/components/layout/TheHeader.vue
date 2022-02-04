<script setup lang="ts">
import { computed } from 'vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthUserStore, usePreferencesUserStore } from '../../stores';
import { UserTheme } from '../../stores/models';

const { t, locale } = useI18n();
const store = useAuthUserStore();
const prefStore = usePreferencesUserStore();

prefStore.updateTheme(UserTheme.LIGHT);

const router = useRouter();

const changeLanguage = () => {
  locale.value = locale.value === 'en' ? 'es' : 'en';
};

const changeLangTo = computed(() => locale.value === 'en' ? 'es' : 'en');

const goToProfile = () => {
  router.push('/user');
};

const logout = () => {
  store.logout();
  router.replace('/');
};
</script>

<template>
  <Menu>
    <header class="header">
      <nav class="nav">
        <h1 class="logo"><router-link class="link" to="/">Boa Payments</router-link></h1>
        <div class="flex gap-2">
          <ul class="nav-list flex gap-2">
            <li v-if="!store.isAuthenticated"><router-link class="nav-item" to="/auth">{{ t('login') }}</router-link></li>
            <li v-if="store.isAuthenticated"><router-link class="nav-item" to="/orders">{{ t('orders') }}</router-link></li>
            <li v-if="store.isAuthenticated"><router-link class="nav-item" to="/payments">{{ t('payments') }}</router-link></li>
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
                leave-to-class="transform scale-95 opacity-0">
      <MenuItems
                  class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md
                  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
                @click="changeLanguage">
                <TranslateIcon class="mr-2 text-violet-400"/>
                {{ t('changeLang') }} {{ changeLangTo }}
              </button>
            </MenuItem>
          </div>
          <div v-if="store.isAuthenticated" class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                      :class="[active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex rounded-md items-center w-full px-2 py-2 text-sm']"
                      @click="goToProfile">
                <TranslateIcon class="mr-2 text-violet-400" />
                {{ t('profile') }}
              </button>
            </MenuItem>
          </div>
          <div v-if="store.isAuthenticated" class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                      :class="[active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex rounded-md items-center w-full px-2 py-2 text-sm']"
                      @click="logout">
                {{ t('logout') }}
              </button>
            </MenuItem>
          </div>
      </MenuItems>
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
    @apply flex items-center justify-center p-0 m-0 list-none;
  }

  &-item {
    @apply inline-flex justify-center w-fit px-4 py-2 h-10 font-medium text-white bg-black rounded-md bg-opacity-20
      hover:bg-opacity-30 focus:outline-none;
  }
}

.logo {
  @apply m-0 font-bold text-xl;

  .link {
    @apply text-white m-0 hover:border-transparent ;

    .router-link-active {
      @apply border-transparent;
    }
  }
}

/*a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
} */
</style>