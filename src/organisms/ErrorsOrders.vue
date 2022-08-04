<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { TypeToast } from '@stores/models';
import { useCategoryStore } from '@stores/categoryStore';
import { useCurrencyStore } from '@stores/currencyStore';
import { useEntityStore } from '@stores/entityStore';
import { useOrderStore } from '@stores/orderStore';
import { usePaymentStore } from '@stores/paymentStore';
import { useToastStore } from '@stores/toastStore';

const { t } = useI18n();
const store = useOrderStore();
const categoryStore = useCategoryStore();
const currencyStore = useCurrencyStore();
const entityStore = useEntityStore();
const paymentStore = usePaymentStore();
const toastStore = useToastStore();
const errorMessage = ref(null);
const errorLoadingMessage = computed(
  () => store.loaded && !!errorMessage.value
);
const isLoading = computed(
  () =>
    store.isLoading ||
    categoryStore.isLoading ||
    entityStore.isLoading ||
    currencyStore.isLoading
);
const noOrders = computed(() => store.noOrders);

const displayError = (error: string) => {
  toastStore.addToast({
    id: 0,
    title: t('error'),
    type: TypeToast.WARNING,
    message: error,
  });
};

const loadEntities = async () => {
  try {
    const errorMessage = t('errorLoadingEntity', {
      entity: t('entity', 2).toLowerCase(),
    });
    await entityStore.loadEntities(errorMessage);
  } catch (error: any) {
    displayError(error);
  }
};

const loadCategories = async () => {
  try {
    const errorMessage = t('errorLoadingEntity', {
      entity: t('category', 2).toLowerCase(),
    });
    await categoryStore.loadCategories(errorMessage);
  } catch (error: any) {
    displayError(error);
  }
};

const loadCurrencies = async () => {
  try {
    const errorMessage = t('errorLoadingEntity', {
      entity: t('currency', 2).toLowerCase(),
    });
    await currencyStore.loadCurrencies(errorMessage);
  } catch (error: any) {
    displayError(error);
  }
};

const loadOrders = async () => {
  try {
    const errorMessage = t('errorLoadingEntity', {
      entity: t('orders', 2).toLowerCase(),
    });
    await store.loadOrders(errorMessage);
  } catch (error: any) {
    errorMessage.value = error || errorMessage;
  }
};

const loadPayments = async () => {
  try {
    const errorMessage = t('errorLoadingEntity', {
      entity: t('payments', 2).toLowerCase(),
    });
    await paymentStore.loadPayments(errorMessage);
  } catch (error: any) {
    displayError(error);
  }
};

loadPayments();
loadOrders();
loadEntities();
loadCategories();
loadCurrencies();
</script>

<template>
  <div>
    <BaseLoader :loading="isLoading" />

    <ErrorMessage v-if="!!errorLoadingMessage" class="pt-5">
      <p class="dark:text-white">
        {{ errorMessage }}
        <a class="text-primary-700 dark:text-primary-300" @click="loadOrders">
          {{ t('tryAgain') }}
        </a>
      </p>
    </ErrorMessage>

    <EmptyMessage v-if="noOrders && !errorLoadingMessage" class="pt-5">
      <p class="dark:text-white">
        {{
          t('emptyEntityMessage', {
            entity: t('orders', 2).toLowerCase(),
          })
        }}
        <router-link
          class="text-primary-700 dark:text-primary-300"
          :to="{ name: 'new-order' }"
        >
          {{
            t('addNewEntity', {
              entity: t('orders').toLowerCase(),
            })
          }}
        </router-link>
      </p>
    </EmptyMessage>
  </div>
</template>
