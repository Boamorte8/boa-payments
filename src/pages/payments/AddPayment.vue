<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { generateId } from '@app/utils';
import { TypeToast, type Order, type Payment } from '@stores/models';
import { usePaymentStore } from '@stores/paymentStore';
import { useOrderStore } from '@stores/orderStore';
import { useToastStore } from '@stores/toastStore';

const orderStore = useOrderStore();
const paymentStore = usePaymentStore();
const toastStore = useToastStore();
const router = useRouter();
const { t } = useI18n();
const title = ref('');
const description = ref('');
const amount = ref(0);
const currency = ref();
const orders = computed(() => orderStore.unfinishedOrders);
const order = ref();
const payDate = ref(new Date());
const nextDate = ref();
const isLoading = computed(
  () => paymentStore.isLoading || orderStore.isLoading
);
const payDateLabel = computed(() => t('payDate') + '*');
const nextDateLabel = computed(() => t('nextDate') + '*');
const titleLabel = computed(() => t('title') + '*');
const descriptionLabel = computed(() => t('description') + '*');
const finished = computed(() => {
  const { value } = order;
  return value ? !(value.currentAmount - amount.value) : false;
});
const disabled = computed(() => {
  return (
    !order.value ||
    !title.value ||
    !description.value ||
    amount.value <= 0 ||
    !payDate.value ||
    !nextDate.value
  );
});

watch(
  () => order.value,
  (value) => {
    if (value) {
      currency.value = (value as Order).currency;
    }
  }
);

const addNewPayment = async () => {
  const newPayment: Payment = {
    id: generateId().toString(),
    title: title.value,
    description: description.value,
    amount: amount.value,
    order: order.value,
    payDate: payDate.value.toISOString(),
    nextDate: !finished.value ? nextDate.value.toISOString() : null,
  };
  const updatedOrder: Order = {
    ...order.value,
    finished: finished.value,
    currentAmount: order.value.currentAmount - amount.value,
    nextDate: newPayment.nextDate,
  };
  try {
    const errorMessage = t('errorCreatingEntity', {
      entity: t('payments').toLowerCase(),
    });
    const errorUpdatingMessage = t('errorUpdatingEntity', {
      entity: t('orders').toLowerCase(),
    });
    await paymentStore.createPayment(newPayment, errorMessage);
    await orderStore.updateOrder(updatedOrder, errorUpdatingMessage);
    router.push('/payments');
  } catch (error: any) {
    toastStore.addToast({
      id: 0,
      title: t('error'),
      type: TypeToast.ERROR,
      message: error,
    });
  }
};
</script>

<template>
  <div>
    <BaseLoader :loading="isLoading" />

    <form class="p-4" @submit.prevent="addNewPayment">
      <BaseCard>
        <div class="w-full flex flex-col gap-4">
          <div class="flex justify-between pb-4 w-full">
            <h1 class="text-xl dark:text-white font-bold">
              {{
                t('addNewEntity', {
                  entity: t('payments').toLowerCase(),
                })
              }}
            </h1>

            <p class="text-sm dark:text-white">{{ t('fieldsRequired') }}</p>
          </div>

          <div class="flex gap-4 md:gap-5 flex-wrap">
            <BaseSelect
              id="order"
              v-model="order"
              item-key="title"
              name="order"
              class="min-w-[220px]"
              :default-value-index="0"
              :items="orders"
              :label="t('orders') + '*'"
            />

            <BaseInput
              id="title"
              v-model.trim="title"
              type="text"
              name="title"
              :label="titleLabel"
              :placeholder="
                t('addEntity', { entity: t('title').toLowerCase() })
              "
            />

            <BaseInput
              id="description"
              v-model.trim="description"
              type="text"
              name="description"
              :label="descriptionLabel"
              :placeholder="
                t('addEntity', { entity: t('description').toLowerCase() })
              "
            />

            <CurrencyInput
              v-if="!!currency"
              id="amount"
              v-model.lazy="amount"
              name="amount"
              :label="t('amount') + '*'"
              :options="{ currency }"
            />

            <BaseCalendar
              id="payDate"
              v-model="payDate"
              name="payDate"
              :label="payDateLabel"
              :placeholder="t('addEntity', { entity: t('date').toLowerCase() })"
            />

            <BaseCalendar
              id="nextDate"
              v-model="nextDate"
              name="nextDate"
              :label="nextDateLabel"
              :placeholder="t('addEntity', { entity: t('date').toLowerCase() })"
              :min-date="payDate"
            />
          </div>

          <div class="flex justify-end gap-4">
            <BaseButton
              mode="outline"
              class="outline-none"
              type="reset"
              link
              :to="{ name: 'payments' }"
            >
              {{ t('cancel') }}
            </BaseButton>

            <BaseButton type="submit" :disabled="disabled">
              {{ t('add') }}
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </form>
  </div>
</template>
