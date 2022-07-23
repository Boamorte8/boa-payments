<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import ErrorsPayments from '@organisms/ErrorsPayments.vue';
import FilterOrders from '@organisms/FilterOrders.vue';
import OrderCard from '@organisms/OrderCard.vue';
import { usePaymentStore } from '@stores/paymentStore';

const { t } = useI18n();
const router = useRouter();
const store = usePaymentStore();
const paymentsLoaded = computed(() => store.arePaymentsLoaded);
const payments = computed(() => store.filteredPayments);

const onAddNewPayment = () => {
  router.push('new-payment');
};
</script>

<template>
  <div class="p-2 md:p-4">
    <ErrorsPayments />

    <div v-if="paymentsLoaded">
      <h1 class="dark:text-white font-bold text-xl mb-4">
        {{ t('payments', 2) }}
      </h1>

      <!-- <FilterOrders class="mb-7" /> -->

      <div class="flex flex-wrap gap-4">
        <!-- <OrderCard v-for="order in orders" :key="order.id" :order="order" /> -->
      </div>
    </div>

    <FloatButton @click="onAddNewPayment" />
  </div>
</template>
