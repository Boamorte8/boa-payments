<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const emptyOrders = true;

const onAddNewOrder = () => {
  router.push('new-order');
};
</script>

<template>
  <div class="p-4">
    <empty-message class="pt-5">
      <p class="dark:text-white">
        {{ t('pageOrders.emptyMessage') }}
        <router-link
          class="text-primary-700 dark:text-primary-300"
          :to="{ name: 'new-order' }"
        >
          {{ t('pageOrders.addNewOrder') }}
        </router-link>
      </p>
    </empty-message>
    <FloatButton @click="onAddNewOrder" />
  </div>
</template>
