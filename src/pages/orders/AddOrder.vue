<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import type { BaseSelectItem } from '@app/models';
import { currencies, orderTypes, type Currency } from '@stores/models';

const { t } = useI18n();
const title = ref('');
const description = ref('');
const amount = ref(0);
const currency = ref('COP');
const isSubscription = ref(false);
const startDate = ref();
const nextDate = ref();
const currencyList = currencies;
const orderTypeList: BaseSelectItem[] = orderTypes.map((type) => ({
  ...type,
  text: t(type.text),
}));
const currencyModel = ref(null);
const type = ref(null);
const startDateLabel = computed(() => t('startDate') + '*');
const nextDateLabel = computed(() => t('nextDate') + '*');
const titleLabel = computed(() => t('title') + '*');
const titlePlaceholder = computed(
  () => `${t('add')} ${t('title').toLowerCase()}`
);
const descriptionLabel = computed(() => t('description') + '*');
const descriptionPlaceholder = computed(
  () => `${t('add')} ${t('description').toLowerCase()}`
);
const disabled = computed(() => {
  return !title.value || amount.value <= 0;
});

watch(
  () => currencyModel.value,
  (value) => {
    if (value) {
      currency.value = (value as Currency).value;
    }
  }
);

const addNewOrder = () => {
  console.log('addNewOrder', amount.value, title.value, description.value, isSubscription.value);
  console.log('addNewOrder', startDate.value, nextDate.value);
};

// TODO - 3 Add datepicker component
// TODO - 6 Add entity input
// TODO - 7 Add get entities action
// TODO - 8 Add 'Add Entity' modal
// TODO - 9 Add categories input
// TODO - 10 Add get categories action
// TODO - 11 Add 'Add Categories' modal
</script>

<template>
  <form class="p-4" @submit.prevent="addNewOrder">
    <BaseCard>
      <div class="w-full flex flex-col gap-4">
        <div class="flex justify-between pb-4 w-full">
          <h2 class="text-xl dark:text-white font-bold">
            {{ t('pageOrders.addNewOrder') }}
          </h2>
          <p class="text-sm dark:text-white">{{ t('fieldsRequired') }}</p>
        </div>

        <div class="flex gap-4 flex-wrap">
          <BaseInput
            id="title"
            v-model="title"
            type="text"
            name="title"
            :label="titleLabel"
            :placeholder="titlePlaceholder"
          />

          <BaseInput
            id="description"
            v-model="description"
            type="text"
            name="description"
            :label="descriptionLabel"
            :placeholder="descriptionPlaceholder"
          />

          <CurrencyInput
            id="amount"
            v-model="amount"
            name="amount"
            :label="t('amount') + '*'"
            :options="{ currency }"
          />
          <BaseSelect
            id="currency"
            v-model="currencyModel"
            item-key="value"
            :default-value-index="1"
            :items="currencyList"
            :label="t('currency')"
          />
          <BaseSelect
            id="type"
            v-model="type"
            item-key="text"
            :default-value-index="0"
            :items="orderTypeList"
            :label="t('type')"
          />
          <BaseToggle
            id="subscription"
            v-model="isSubscription"
            :label="t('pageAddOrder.isSubscription')"
          />
          <BaseCalendar
            id="startDate"
            v-model="startDate"
            :label="startDateLabel"
            :placeholder="t('selectDate')"
          />
          <BaseCalendar
            id="nextDate"
            v-model="nextDate"
            :label="nextDateLabel"
            :placeholder="t('selectDate')"
            :min-date="startDate"
          />
        </div>

        <div class="flex justify-end gap-4">
          <BaseButton
            mode="outline"
            class="outline-none"
            type="reset"
            link
            :disabled="disabled"
            :to="{ name: 'orders' }"
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
</template>
