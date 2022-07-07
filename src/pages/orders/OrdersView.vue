<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emptyOrders = true;

const onAddNewOrder = () => {
  console.log('onAddNewOrder');
};
</script>

<template>
  <div class="p-4">
    <empty-message class="pt-5">
      <p class="dark:text-white">
        {{ t('pageOrders.emptyMessage') }}
      </p>
    </empty-message>
    <FloatButton @click="onAddNewOrder" />
  </div>
</template>
