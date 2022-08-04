<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Payment, TypeToast } from '@stores/models';
import { usePaymentStore } from '@stores/paymentStore';
import { useToastStore } from '@stores/toastStore';

const { t } = useI18n();
const paymentStore = usePaymentStore();
const toastStore = useToastStore();

const payment = computed(() => paymentStore.getDeletingPayment);
const openModal = computed(() => paymentStore.openConfirmDeleteModal);

const onCloseModal = () => {
  paymentStore.toggleModal(false, null);
};

const onDeletePayment = async () => {
  const deletePayment = { ...payment.value } as Payment;
  onCloseModal();
  try {
    if (deletePayment) {
      const errorMessage = t('errorDeletingEntity', {
        entity: t('payments').toLowerCase(),
      });
      await paymentStore.deletePayment(deletePayment, errorMessage);
    }
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
  <BaseDialog :show="openModal" :title="t('confirmDelete')">
    <div class="">
      <p class="dark:text-white mb-2">
        {{
          t('confirmDeleteEntity', {
            entity: t('payments').toLowerCase(),
          })
        }}
      </p>

      <template v-if="payment">
        <p class="dark:text-white">
          {{ t('title') }}
          {{ payment.title }}
        </p>
        <p class="dark:text-white">
          {{ t('orders') }}
          {{ payment.order.title }}
        </p>
        <p class="dark:text-white">
          {{ t('description') }}
          {{ payment.description }}
        </p>
      </template>
    </div>

    <template #actions>
      <BaseButton
        mode="outline"
        class="outline-none"
        type="reset"
        @click="onCloseModal"
      >
        {{ t('cancel') }}
      </BaseButton>

      <BaseButton @click="onDeletePayment">
        {{ t('confirm') }}
      </BaseButton>
    </template>
  </BaseDialog>
</template>
