<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { formatCurrency, formatDate } from '@app/utils';
import { useOrderStore } from '@stores/orderStore';
import { usePaymentStore } from '@stores/paymentStore';
import { Category, OrderType } from '@stores/models';

const { t } = useI18n();
const orderStore = useOrderStore();
const paymentStore = usePaymentStore();
const order = computed(() => orderStore.selectedOrder);
const payments = computed(() => paymentStore.orderPayments);

const totalAmount = computed(() =>
  order.value
    ? `${formatCurrency(
        order.value.amount,
        order.value.currency
      )}/${order.value.currency.toLowerCase()}`
    : ''
);

const currentAmount = computed(() =>
  order.value
    ? `${formatCurrency(
        order.value.currentAmount,
        order.value.currency
      )}/${order.value.currency.toLowerCase()}`
    : ''
);

const nextDate = computed(() =>
  order.value ? formatDate(new Date(order.value.nextDate)) : ''
);
const startDate = computed(() =>
  order.value ? formatDate(new Date(order.value.startDate)) : ''
);
const finishedText = computed(() =>
  order.value ? (order.value.finished ? 'yes' : 'no') : 'no'
);
const subscriptionText = computed(() =>
  order.value ? (order.value.subscription ? 'yes' : 'no') : 'no'
);
const categories = computed(() =>
  order.value
    ? (order.value.category as Array<Category>)
        .map((item: Category) => item.name)
        .join(', ')
    : ''
);
const isLoan = computed(() =>
  order.value ? order.value.type === OrderType.LOAN : ''
);
</script>

<template>
  <div class="p-4">
    <BaseCard class="card flex-col mb-4">
      <div class="flex items-center gap-4 mb-4">
        <h1 class="dark:text-white font-bold text-xl">
          {{ t('orderDetails') }}
        </h1>

        <div class="h-9 w-9">
          <CashIcon v-if="isLoan" class="text-success-700" />
          <LibraryIcon v-else class="text-error-700" />
        </div>
      </div>

      <div v-if="order" class="flex w-full gap-4 flex-wrap">
        <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('orders')"
          :value="order.title"
        />
        <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('totalAmount')"
          :value="totalAmount"
        />
        <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('currentAmount')"
          :value="currentAmount"
        />
        <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('nextDate')"
          :value="nextDate"
        />
        <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('startDate')"
          :value="startDate"
        />
        <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('subscription')"
          :value="t(subscriptionText)"
        />
        <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('finished')"
          :value="t(finishedText)"
        />
        <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('description')"
          :value="order.description"
        />
        <DisplayInfo
          class="info"
          mode="vertical"
          :label="t('category', 2)"
          :value="categories"
        />
      </div>
    </BaseCard>

    <h2 class="dark:text-white font-bold text-l mb-4">
      {{ t('payments', 2) }}
    </h2>

    <div v-if="!!payments.length" class="flex flex-wrap gap-4">
      <PaymentCard
        v-for="payment in payments"
        :key="payment.id"
        :payment="payment"
      />
    </div>
    <EmptyMessage v-else class="pt-5">
      <p class="dark:text-white">
        {{
          t('emptyEntityMessage', {
            entity: t('payments', 2).toLowerCase(),
          })
        }}
      </p>
    </EmptyMessage>
  </div>
</template>

<style>
.card.card {
  @apply items-start;
}

.info.info {
  @apply w-full sm:w-[calc(50%-16px)] md:w-[calc(33%-16px)] lg:w-[calc(25%-16px)];
}
</style>
