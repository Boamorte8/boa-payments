<script setup lang="ts">
import { Menu, MenuItem } from '@headlessui/vue';
</script>

<template>
  <Menu>
    <div class="px-1 py-1">
      <MenuItem v-slot="{ active }">
        <button
          :class="[
            active ? 'bg-primary text-white' : 'text-gray-900',
            'group flex rounded-md items-center w-full px-2 py-2 text-sm dark:text-white',
          ]"
        >
          <slot></slot>
        </button>
      </MenuItem>
    </div>
  </Menu>
</template>
