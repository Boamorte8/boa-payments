<script setup lang="ts">
// import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
// import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

import { useAuthUserStore } from '../../stores';

const { t } = useI18n();
const store = useAuthUserStore();

const logout = () => {
  store.logout();
};

// export default {
//   components: {
//     Menu,
//     MenuButton,
//     MenuItems,
//     MenuItem,
//   },
//   setup() {

//     return {
//       isLoggedIn: store.isAuthenticated,
//       t,
//       logout,
//     };
//   },
// }
</script>

<template>
  <header class="header">
    <nav class="nav">
      <h1 class="logo"><router-link class="link" to="/">Boa Payments</router-link></h1>
      <ul class="nav-list">
        <template v-if="store.isAuthenticated">
          <!-- <li><router-link to="/requests">Requests</router-link></li> -->
          <li class="nav-item"><base-button @click="logout">{{ t('logout') }}</base-button></li>
        </template>
        <li v-else class="nav-item"><router-link to="/auth">{{ t('login') }}</router-link></li>
      </ul>
    </nav>
  </header>
  <!-- <Menu>
    <MenuButton>More</MenuButton>
    <MenuItems>
      <MenuItem v-slot="{ active }">
        <a :class='{ "bg-blue-500": active }' href="/account-settings">
          Account settings
        </a>
      </MenuItem>
      <MenuItem v-slot="{ active }">
        <a :class='{ "bg-blue-500": active }' href="/account-settings">
          Documentation
        </a>
      </MenuItem>
      <MenuItem disabled>
        <span class="opacity-75">Invite a friend (coming soon!)</span>
      </MenuItem>
    </MenuItems>
  </Menu> -->
</template>

<style scoped>
.header {
  @apply w-full h-20 flex items-center justify-center bg-purple-900;

  a {
    @apply no-underline inline-block border border-transparent rounded-lg text-gray-300 py-3 px-6
      active:border-gray-300 hover:border-gray-300;

    .router-link-active {
      @apply active:border-gray-300 hover:border-gray-300;
    }
  }
}

.nav {
  @apply w-11/12 m-auto flex items-center justify-between;

  &-list {
    @apply flex items-center justify-center p-0 m-0 list-none;
  }

  &-item {
    @apply my-0 mx-2;
  }
}

.logo {
  @apply m-0;

  .link {
    @apply text-white m-0;

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