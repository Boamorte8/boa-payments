<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import ErrorsOrders from '@organisms/ErrorsOrders.vue';
import OrderCard from '@organisms/OrderCard.vue';
import { useOrderStore } from '@stores/orderStore';

const { t } = useI18n();
const router = useRouter();
const store = useOrderStore();
const ordersLoaded = computed(() => store.areOrdersLoaded);
const orders = computed(() => store.filteredOrders);

const onAddNewOrder = () => {
  router.push('new-order');
};
</script>

<template>
  <div class="p-2 md:p-4">
    <ErrorsOrders />

    <div v-if="ordersLoaded" class="flex gap-4">
      <OrderCard v-for="order in orders" :key="order.id" :order="order" />
    </div>

    <FloatButton @click="onAddNewOrder" />
  </div>
</template>
