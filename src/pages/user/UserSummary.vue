<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { CurrencyValue, OrderType } from '@stores/models';
import { formatCurrency } from '@app/utils';
import { useOrderStore } from '@stores/orderStore';

const { t } = useI18n();
const orderStore = useOrderStore();
interface SummaryData {
  currency: CurrencyValue;
  totalAmountLoan: number;
  totalCurrentAmountLoan: number;
  totalAmountDebt: number;
  totalCurrentAmountDebt: number;
}

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
console.log('totalAmounts', totalAmounts);
</script>

<template>
  <div class="p-2 md:p-4">
    <h1 class="dark:text-white font-bold text-xl mb-4">
      {{ t('summary') }}
    </h1>

    <BaseCard class="card flex-col mb-4">
      <div class="mb-4">
        <h2 class="dark:text-white font-bold text-lg">
          {{ t('debt', 2) }}
        </h2>
      </div>

      <div
        v-for="amount in totalAmounts"
        :key="amount.currency"
        class="w-full mb-4 last:mb-0"
      >
        <h3 class="dark:text-white font-bold text-base mb-2">
          {{ amount.currency }}
        </h3>

        <div class="flex w-full gap-4 flex-wrap">
          <DisplayInfo
            class="info"
            mode="vertical"
            :label="t('totalAmount')"
            :value="formatCurrency(amount.totalAmountDebt, amount.currency)"
          />

          <DisplayInfo
            class="info"
            mode="vertical"
            :label="t('currentAmount')"
            :value="
              formatCurrency(amount.totalCurrentAmountDebt, amount.currency)
            "
          />
        </div>
      </div>
    </BaseCard>

    <BaseCard class="card flex-col mb-4">
      <div class="mb-4">
        <h2 class="dark:text-white font-bold text-xl">
          {{ t('loan', 2) }}
        </h2>
      </div>

      <div
        v-for="amount in totalAmounts"
        :key="amount.currency"
        class="w-full mb-4 last:mb-0"
      >
        <h3 class="dark:text-white font-bold text-base mb-2">
          {{ amount.currency }}
        </h3>

        <div class="flex w-full gap-4 flex-wrap">
          <DisplayInfo
            class="info"
            mode="vertical"
            :label="t('totalAmount')"
            :value="formatCurrency(amount.totalAmountLoan, amount.currency)"
          />

          <DisplayInfo
            class="info"
            mode="vertical"
            :label="t('currentAmount')"
            :value="
              formatCurrency(amount.totalCurrentAmountLoan, amount.currency)
            "
          />
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<style>
.info.info {
  @apply w-full sm:w-[calc(50%-16px)] md:w-[calc(33%-16px)] lg:w-[calc(25%-16px)];
}
</style>
