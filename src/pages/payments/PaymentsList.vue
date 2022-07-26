<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import ErrorsPayments from '@organisms/ErrorsPayments.vue';
import FilterPayments from '@organisms/FilterPayments.vue';
import PaymentCard from '@organisms/PaymentCard.vue';
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

      <FilterPayments class="mb-7" />

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

    <FloatButton @click="onAddNewPayment" />
  </div>
</template>
