<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import SummaryUserData from '@organisms/SummaryUserData.vue';
import { OrderType } from '@stores/models';
import { SummaryData } from '@stores/models/types';
import { useOrderStore } from '@stores/orderStore';

const { t } = useI18n();
const orderStore = useOrderStore();

const totalAmounts = computed(() =>
  orderStore.allOrders
    .filter((order) => !order.finished)
    .reduce((prevValue: SummaryData[], order) => {
      const result = [...prevValue];
      const index = prevValue.findIndex(
        (data) => data.currency === order.currency
      );
      if (!result.length || index < 0) {
        const newSummary: SummaryData = {
          currency: order.currency,
          totalAmountLoan: 0,
          totalCurrentAmountLoan: 0,
          totalAmountDebt: 0,
          totalCurrentAmountDebt: 0,
        };
        if (order.type === OrderType.LOAN) {
          newSummary.totalAmountLoan = order.amount;
          newSummary.totalCurrentAmountLoan = order.currentAmount;
        } else {
          newSummary.totalAmountDebt = order.amount;
          newSummary.totalCurrentAmountDebt = order.currentAmount;
        }
        result.push(newSummary);
      } else {
        if (order.type === OrderType.LOAN) {
          result[index].totalAmountLoan = order.amount;
          result[index].totalCurrentAmountLoan = order.currentAmount;
        } else {
          result[index].totalAmountDebt = order.amount;
          result[index].totalCurrentAmountDebt = order.currentAmount;
        }
      }
      return result;
    }, [])
);
</script>

<template>
  <div class="p-2 md:p-4">
    <h1 class="dark:text-white font-bold text-xl mb-4">
      {{ t('summary') }}
    </h1>

    <BaseCard class="card flex-col mb-4">
      <div class="flex h-7 gap-2 mb-4 w-full">
        <div class="w-8">
          <LibraryIcon class="text-error-700" />
        </div>
        <h2 class="dark:text-white font-bold text-xl">
          {{ t('debt', 2) }}
        </h2>
      </div>

      <SummaryUserData
        v-for="amount in totalAmounts"
        :key="amount.currency"
        :amount="amount"
        :total-amount="amount.totalAmountDebt"
        :total-current-amount="amount.totalCurrentAmountDebt"
      />
    </BaseCard>

    <BaseCard class="card flex-col mb-4">
      <div class="flex h-7 gap-2 mb-4 w-full">
        <div class="w-8">
          <CashIcon class="text-success-700" />
        </div>
        <h2 class="dark:text-white font-bold text-xl">
          {{ t('loan', 2) }}
        </h2>
      </div>

      <SummaryUserData
        v-for="amount in totalAmounts"
        :key="amount.currency"
        :amount="amount"
        :total-amount="amount.totalAmountLoan"
        :total-current-amount="amount.totalCurrentAmountLoan"
      />
    </BaseCard>
  </div>
</template>
