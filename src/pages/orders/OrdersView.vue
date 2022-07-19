<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import ErrorsOrders from '@organisms/ErrorsOrders.vue';
import { useOrderStore } from '@stores/orderStore';

const { t } = useI18n();
const router = useRouter();
const store = useOrderStore();
const isLoading = ref(false);
const orders = ref(null);

const onAddNewOrder = () => {
  router.push('new-order');
};
</script>

<template>
  <div class="p-2 md:p-4">
    <ErrorsOrders />

    <FloatButton @click="onAddNewOrder" />
  </div>
</template>
