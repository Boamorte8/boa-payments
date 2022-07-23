<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { usePaymentStore } from '@stores/paymentStore';

const { t } = useI18n();
const paymentStore = usePaymentStore();
const errorMessage = ref(null);
const errorLoadingMessage = computed(
  () => paymentStore.loaded && !!errorMessage.value
);
const isLoading = computed(() => paymentStore.isLoading);
const noPayments = computed(() => paymentStore.noPayments);

const loadPayments = async () => {
  try {
    const errorMessage = t('errorLoadingEntity', {
      entity: t('payments', 2).toLowerCase(),
    });
    await paymentStore.loadPayments(errorMessage);
  } catch (error: any) {
    errorMessage.value = error || errorMessage;
  }
};

loadPayments();
</script>

<template>
  <div>
    <BaseLoader :loading="isLoading" />

    <ErrorMessage v-if="!!errorLoadingMessage" class="pt-5">
      <p class="dark:text-white">
        {{ errorMessage }}
        <a class="text-primary-700 dark:text-primary-300" @click="loadPayments">
          {{ t('tryAgain') }}
        </a>
      </p>
    </ErrorMessage>

    <EmptyMessage v-if="noPayments && !errorLoadingMessage" class="pt-5">
      <p class="dark:text-white">
        {{
          t('emptyEntityMessage', {
            entity: t('payments', 2).toLowerCase(),
          })
        }}
        <router-link
          class="text-primary-700 dark:text-primary-300"
          :to="{ name: 'new-payment' }"
        >
          {{
            t('addNewEntity', {
              entity: t('payments').toLowerCase(),
            })
          }}
        </router-link>
      </p>
    </EmptyMessage>
  </div>
</template>
