<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import { formatCurrency, formatDate } from '@app/utils';
import { OrderType, type Payment } from '@stores/models';

const { t } = useI18n();
const props = defineProps({
  payment: {
    type: Object as PropType<Payment>,
    required: true,
  },
});

const totalAmount = computed(() => {
  const { payment } = props;
  const currency = payment.order.currency;
  return `${formatCurrency(
    payment.amount,
    currency
  )}/${currency.toLowerCase()}`;
});

const payDate = computed(() => formatDate(new Date(props.payment.payDate)));

const isLoan = computed(() => props.payment.order.type === OrderType.LOAN);
</script>

<template>
  <BaseCard class="block min-w-[310px] md:min-w-[325px] lg:min-w-[350px]">
    <div class="w-full">
      <header class="flex w-full gap-4 mb-4">
        <div
          class="flex justify-center items-center rounded-[50%] bg-primary-700 text-white h-12 w-12"
        >
          <CashIcon v-if="isLoan" class="h-7 w-7 text-success-700" />
          <LibraryIcon v-else class="h-7 w-7 text-error-700" />
        </div>

        <div class="w-[53%] dark:text-white">
          <h3 class="font-bold text-xl">{{ payment.title }}</h3>
          <p class="text-sm">{{ payment.order.title }}</p>
        </div>
      </header>

      <section>
        <DisplayInfo :label="t('totalAmount')" :value="totalAmount" />
        <DisplayInfo :label="t('payDate')" :value="payDate" />
        <DisplayInfo
          class="pb-2"
          :label="t('description')"
          :value="payment.description"
          mode="vertical"
        />
      </section>
    </div>
  </BaseCard>
</template>
