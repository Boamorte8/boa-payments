<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { watchDebounced } from '@vueuse/core';

import { SortValue } from '@app/models';
import type { Order, PaymentKey } from '@stores/models';
import { useOrderStore } from '@stores/orderStore';
import { usePaymentStore } from '@stores/paymentStore';

const orderStore = useOrderStore();
const paymentStore = usePaymentStore();
const { t } = useI18n();
const isSearch = ref(true);
const entities = [
  { id: 'title', value: t('title') },
  { id: 'description', value: t('description') },
  { id: 'amount', value: t('amount') },
  { id: 'amountRange', value: t('entityRange', { entity: t('amount') }) },
  { id: 'dateRange', value: t('entityRange', { entity: t('date') }) },
];
const sortValues = [
  { text: t('oldFirst'), value: SortValue.OldFirst },
  { text: t('newFirst'), value: SortValue.NewFirst },
  { text: t('title'), value: SortValue.Title },
  { text: t('description'), value: SortValue.Description },
  { text: t('smallestAmounts'), value: SortValue.SmallestAmounts },
  { text: t('largeAmounts'), value: SortValue.LargeAmounts },
];
const search = ref();
const by: Ref<{ id: string; value: string }> = ref(entities[0]);
const sortBy = ref();
const order = ref();
const orders = computed(() => orderStore.allOrders);

const clearFilters = () => {
  search.value = null;
  order.value = null;
};

watch(
  () => order.value,
  (value: Order) => {
    if (value) {
      paymentStore.filterByOrder(value);
    }
  }
);

watchDebounced(sortBy, (value) => paymentStore.setSorting(value.value), {
  debounce: 200,
});

watchDebounced(
  search,
  (value) =>
    paymentStore.filter(value, by.value.value.toLowerCase() as PaymentKey),
  { debounce: 400 }
);

watchDebounced(
  by,
  (value) => {
    if (value) {
      const { id } = value;
      if (id !== 'dateRange' && id !== 'amountRange') {
        paymentStore.filter(search.value, value.value as PaymentKey);
        isSearch.value = true;
      } else {
        isSearch.value = false;
      }
    }
  },
  { debounce: 400 }
);
</script>

<template>
  <BaseCard class="w-full lg:p-5 block">
    <div class="w-full">
      <div class="w-full flex flex-wrap gap-4 lg:gap-5">
        <BaseInput
          id="search"
          v-model.trim="search"
          type="text"
          name="search"
          :label="t('search')"
          :placeholder="
            t('searchEntity', { entity: t('orders').toLowerCase() })
          "
        />

        <BaseSelect
          id="by"
          v-model="by"
          item-key="value"
          name="by"
          class="min-w-[220px]"
          :default-value-index="0"
          :label="t('by')"
          :items="entities"
        />

        <BaseSelect
          id="order"
          v-model="order"
          item-key="title"
          name="order"
          class="min-w-[220px]"
          :label="t('orders')"
          :items="orders"
          :placeholder="
            t('selectEntity', { entity: t('orders').toLowerCase() })
          "
          :no-items-message="
            t('noEntities', {
              entities: t('orders', 2).toLowerCase(),
            })
          "
        />

        <BaseSelect
          id="sortBy"
          v-model="sortBy"
          item-key="text"
          name="sortBy"
          class="min-w-[220px]"
          :default-value-index="0"
          :label="t('sortBy')"
          :items="sortValues"
        />
      </div>

      <div class="flex justify-end mt-4">
        <BaseButton
          mode="outline"
          class="outline-none"
          type="reset"
          @click="clearFilters"
        >
          {{ t('clearFilters') }}
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>
