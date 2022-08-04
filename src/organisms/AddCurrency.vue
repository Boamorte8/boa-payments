<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { watchDebounced } from '@vueuse/core';

import { generateId } from '@app/utils';
import { TypeToast, type Currency } from '@stores/models';
import { useCurrencyStore } from '@stores/currencyStore';
import { useToastStore } from '@stores/toastStore';

const { t } = useI18n();
const currencyStore = useCurrencyStore();
const toastStore = useToastStore();

const text = ref('');
const value = ref('');
const isDuplicated = ref(false);
const errorMessage = computed(() =>
  t('duplicatedError', { entity: t('entity').toLowerCase() })
);
const valueLabel = computed(() => t('value') + '*');
const textLabel = computed(() => t('text') + '*');
const openModal = computed(() => currencyStore.openModal);
const disabled = computed(
  () => !value.value || !text.value || isDuplicated.value
);

watchDebounced(
  value,
  () => {
    isDuplicated.value = currencyStore.getCurrencies.some(
      (currency) => currency.value === value.value
    );
  },
  { debounce: 500 }
);

const onCloseModal = () => {
  currencyStore.toggleModal(false);
};

const onAddNewCurrency = async () => {
  onCloseModal();
  const newCurrency: Currency = {
    id: generateId().toString(),
    value: value.value,
    text: text.value,
    userId: '',
  };
  try {
    const errorMessage = t('errorCreatingEntity', {
      entity: t('currency').toLowerCase(),
    });
    await currencyStore.createCurrency(newCurrency, errorMessage);
  } catch (error: any) {
    toastStore.addToast({
      id: 0,
      title: t('error'),
      type: TypeToast.WARNING,
      message: error,
    });
  }
};
</script>

<template>
  <BaseDialog
    :show="openModal"
    :title="t('addNewEntity', { entity: t('currency').toLowerCase() })"
  >
    <div class="flex justify-end w-full">
      <p class="text-sm dark:text-white">{{ t('fieldsRequired') }}</p>
    </div>

    <div class="flex flex-col align-center gap-4 w-full">
      <BaseInput
        id="value"
        v-model.trim="value"
        type="text"
        name="value"
        :label="valueLabel"
        :placeholder="t('addEntity', { entity: t('value').toLowerCase() })"
        :has-error="isDuplicated"
        :error-message="errorMessage"
      />

      <BaseInput
        id="text"
        v-model.trim="text"
        type="text"
        name="text"
        :label="textLabel"
        :placeholder="t('addEntity', { entity: t('text').toLowerCase() })"
      />
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

      <BaseButton :disabled="disabled" @click="onAddNewCurrency">
        {{ t('add') }}
      </BaseButton>
    </template>
  </BaseDialog>
</template>
