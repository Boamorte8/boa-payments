<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { OrderType } from '@stores/models/order.model';
import { useOrderStore } from '@stores/orderStore';

const { t } = useI18n();
const orderStore = useOrderStore();

const totalAmountDebts = computed(() =>
  orderStore.allOrders
    .filter((order) => order.type === OrderType.DEBT && !order.finished)
    .reduce((prevValue, order) => prevValue + order.amount, 0)
);
</script>

<template>
  <div class="p-2 md:p-4">
    <h1 class="dark:text-white font-bold text-xl mb-4">
      {{ t('summary') }}
    </h1>

    <BaseCard class="card flex-col mb-4">
      <div class="flex items-center gap-4 mb-4">
        <h1 class="dark:text-white font-bold text-xl">
          {{ t('debt', 2) }}
        </h1>
      </div>

      <div class="flex w-full gap-4 flex-wrap">
        <!-- <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('totalAmount')"
          :value="order.title"
        /> -->
      </div>
    </BaseCard>

    <BaseCard class="card flex-col mb-4">
      <div class="flex items-center gap-4 mb-4">
        <h1 class="dark:text-white font-bold text-xl">
          {{ t('loan', 2) }}
        </h1>
      </div>

      <div class="flex w-full gap-4 flex-wrap">
        <!-- <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('totalAmount')"
          :value="order.title"
        /> -->
      </div>
    </BaseCard>
  </div>
</template>
