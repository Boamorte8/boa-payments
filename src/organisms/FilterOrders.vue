<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { watchDebounced } from '@vueuse/core';

import type { Category, OrderKey } from '@stores/models';
import { useCategoryStore } from '@stores/categoryStore';
import { useOrderStore } from '@stores/orderStore';

const categoryStore = useCategoryStore();
const orderStore = useOrderStore();
const { t } = useI18n();
const entities = [
  { value: t('title') },
  { value: t('description') },
  { value: t('amount') },
];
const sortValues = [
  { text: t('oldFirst'), value: 'oldFirst' },
  { text: t('newFirst'), value: 'newFirst' },
  { text: t('title'), value: 'title' },
  { text: t('description'), value: 'description' },
  { text: t('amount'), value: 'amount' },
];
const search = ref();
const by: Ref<{ value: string }> = ref(entities[0]);
const sortBy = ref();
const category = ref();
const categoryKey = ref(0);
const selectedCategories: Ref<Category[]> = ref([]);
const categoryList = computed(() =>
  categoryStore.categories.filter(
    (category) =>
      !selectedCategories.value.some(
        (selected: Category) => selected.id === category.id
      )
  )
);

const onDelete = (category: Category) => {
  selectedCategories.value = selectedCategories.value.filter(
    (selected: Category) => selected.id !== category.id
  );
};

const clearFilters = () => {
  search.value = null;
  selectedCategories.value = [];
};

watch(
  () => category.value,
  (value: Category) => {
    if (value) {
      selectedCategories.value.push(value);
      category.value = null;
      categoryKey.value += 1;
      orderStore.filterByCategory(selectedCategories.value);
    }
  }
);

watchDebounced(
  search,
  (value) => orderStore.filter(value, by.value.value.toLowerCase() as OrderKey),
  { debounce: 1000 }
);

watchDebounced(
  by,
  (value) => {
    if (value) {
      orderStore.filter(search.value, value.value as OrderKey);
    }
  },
  { debounce: 1000 }
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
          id="category"
          :key="categoryKey"
          v-model="category"
          item-key="name"
          name="category"
          class="min-w-[220px]"
          :label="t('category')"
          :items="categoryList"
          :placeholder="
            t('selectEntity', { entity: t('category').toLowerCase() })
          "
          :no-items-message="
            t('noEntities', {
              entities: t('category', 2).toLowerCase(),
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

      <PillList
        v-if="!!selectedCategories.length"
        class="mt-4"
        :label="t('selectedEntity', { entity: t('category', 2).toLowerCase() })"
        :items="selectedCategories"
        @delete="onDelete($event)"
      />

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
