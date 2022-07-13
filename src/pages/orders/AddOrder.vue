<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const title = ref('');
const description = ref('');
const amount = ref(0);
const currency = ref('COP');
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

const addNewOrder = () => {
  console.log('addNewOrder', amount.value, title.value, description.value);
};
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
