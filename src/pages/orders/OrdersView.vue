<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useOrderStore } from '../../stores';

const { t } = useI18n();
const router = useRouter();
const store = useOrderStore();
const isLoading = ref(false);
const errorMessage = ref(null);
const errorLoadingMessage = computed(
  () => store.loaded && !!errorMessage.value
);
const orders = ref(null);

const loadOrders = async () => {
  isLoading.value = true;

  try {
    const errorMessage = t('pageOrders.errorLoadingOrders');
    await store.loadOrders(errorMessage);
  } catch (error: any) {
    errorMessage.value = error || errorMessage;
  }

  isLoading.value = false;
};

loadOrders();

const onAddNewOrder = () => {
  router.push('new-order');
};
</script>

<template>
  <div class="p-2 md:p-4">
    <BaseLoader :loading="isLoading" />

    <ErrorMessage v-if="!!errorLoadingMessage" class="pt-5">
      <p class="dark:text-white">
        {{ errorMessage }}
        <a class="text-primary-700 dark:text-primary-300" @click="loadOrders">
          {{ t('tryAgain') }}
        </a>
      </p>
    </ErrorMessage>

    <EmptyMessage v-if="!orders && !errorLoadingMessage" class="pt-5">
      <p class="dark:text-white">
        {{ t('pageOrders.emptyMessage') }}
        <router-link
          class="text-primary-700 dark:text-primary-300"
          :to="{ name: 'new-order' }"
        >
          {{ t('pageOrders.addNewOrder') }}
        </router-link>
      </p>
    </EmptyMessage>
    <FloatButton @click="onAddNewOrder" />
  </div>
</template>
