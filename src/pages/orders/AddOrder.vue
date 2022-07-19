<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import AddCategory from '@organisms/AddCategory.vue';
import AddEntity from '@organisms/AddEntity.vue';
import type { BaseSelectItem } from '@app/models';
import {
  currencies,
  orderTypes,
  TypeToast,
  type Category,
  type Currency,
} from '@stores/models';
import { useCategoryStore } from '@stores/categoryStore';
import { useEntityStore } from '@stores/entityStore';
import { useToastStore } from '@stores/toastStore';

const categoryStore = useCategoryStore();
const entityStore = useEntityStore();
const { t } = useI18n();
const title = ref('');
const description = ref('');
const amount = ref(0);
const currency = ref('COP');
const isSubscription = ref(false);
const startDate = ref(new Date());
const nextDate = ref();
const category = ref();
const selectedCategories = ref([]);
const entity = ref();
const categoryKey = ref(0);
const currencyList = currencies;
const orderTypeList: BaseSelectItem[] = orderTypes.map((type) => ({
  ...type,
  text: t(type.text),
}));
const currencyModel = ref(null);
const type = ref(null);
const categoryList = computed(() =>
  categoryStore.categories.filter(
    (category) =>
      !selectedCategories.value.some(
        (selected: Category) => selected.id === category.id
      )
  )
);
const entities = computed(() => entityStore.entities);
const isLoading = computed(
  () => entityStore.isLoading || categoryStore.isLoading
);
const startDateLabel = computed(() => t('startDate') + '*');
const nextDateLabel = computed(() => t('nextDate') + '*');
const titleLabel = computed(() => t('title') + '*');
const descriptionLabel = computed(() => t('description') + '*');
const entityLabel = computed(() => t('entity') + '*');
const categoryLabel = computed(() => t('category', 2) + '*');
const disabled = computed(() => {
  return !title.value || !description.value || amount.value <= 0 || !startDate.value || !nextDate.value  ||
    !entity.value || !selectedCategories.value.length;
});

watch(
  () => currencyModel.value,
  (value) => {
    if (value) {
      currency.value = (value as Currency).value;
    }
  }
);

watch(
  () => category.value,
  (value: Category) => {
    if (value) {
      selectedCategories.value.push(value);
      category.value = null;
      categoryKey.value += 1;
    }
  }
);

const addNewOrder = () => {
  console.log(
    'addNewOrder',
    amount.value,
    title.value,
    description.value,
    isSubscription.value
  );
  console.log('addNewOrder', startDate.value, nextDate.value);
  console.log('addNewOrder', entity.value, selectedCategories.value);
};

const addNewEntity = () => {
  entityStore.toggleModal(true);
};

const addNewCategory = () => {
  categoryStore.toggleModal(true);
};

const onDelete = (category: Category) => {
  selectedCategories.value = selectedCategories.value.filter(
    (selected: Category) => selected.id !== category.id
  );
};

// TODO - 1 Add create order action
</script>

<template>
  <div>
    <BaseLoader :loading="isLoading" />
    <AddEntity />
    <AddCategory />

    <form class="p-4" @submit.prevent="addNewOrder">
      <BaseCard>
        <div class="w-full flex flex-col gap-4">
          <div class="flex justify-between pb-4 w-full">
            <h2 class="text-xl dark:text-white font-bold">
              {{
                t('addNewEntity', {
                  entity: t('orders').toLowerCase(),
                })
              }}
            </h2>

            <p class="text-sm dark:text-white">{{ t('fieldsRequired') }}</p>
          </div>

          <div class="flex gap-4 md:gap-5 flex-wrap">
            <BaseInput
              id="title"
              v-model.trim="title"
              type="text"
              name="title"
              :label="titleLabel"
              :placeholder="
                t('addEntity', { entity: t('title').toLowerCase() })
              "
            />

            <BaseInput
              id="description"
              v-model.trim="description"
              type="text"
              name="description"
              :label="descriptionLabel"
              :placeholder="
                t('addEntity', { entity: t('description').toLowerCase() })
              "
            />

            <CurrencyInput
              id="amount"
              v-model.lazy="amount"
              name="amount"
              :label="t('amount') + '*'"
              :options="{ currency }"
            />

            <BaseSelect
              id="currency"
              v-model="currencyModel"
              item-key="value"
              name="currency"
              :default-value-index="1"
              :items="currencyList"
              :label="t('currency')"
            />

            <BaseSelect
              id="type"
              v-model="type"
              item-key="text"
              name="type"
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
              name="startDate"
              :label="startDateLabel"
              :placeholder="t('addEntity', { entity: t('date').toLowerCase() })"
            />

            <BaseCalendar
              id="nextDate"
              v-model="nextDate"
              name="nextDate"
              :label="nextDateLabel"
              :placeholder="t('addEntity', { entity: t('date').toLowerCase() })"
              :min-date="startDate"
            />

            <div>
              <BaseLabel class="mb-2">{{ entityLabel }}</BaseLabel>

              <div class="flex gap-4 items-center">
                <BaseSelect
                  id="entity"
                  v-model="entity"
                  item-key="name"
                  name="entity"
                  :default-value-index="0"
                  :items="entities"
                  :placeholder="
                    t('addEntity', { entity: t('entity').toLowerCase() })
                  "
                  :no-items-message="
                    t('noEntities', { entities: t('entity', 2).toLowerCase() })
                  "
                />

                <BaseButton mode="flat" @click="addNewEntity">
                  {{
                    t('addNewEntity', {
                      entity: t('entity').toLowerCase(),
                    })
                  }}
                </BaseButton>
              </div>
            </div>

            <div>
              <BaseLabel class="mb-2">{{ categoryLabel }}</BaseLabel>

              <div class="flex gap-4 items-center">
                <BaseSelect
                  id="category"
                  :key="categoryKey"
                  v-model="category"
                  item-key="name"
                  name="category"
                  :items="categoryList"
                  :placeholder="
                    t('addEntity', { entity: t('category', 2).toLowerCase() })
                  "
                  :no-items-message="
                    t('noEntities', {
                      entities: t('category', 2).toLowerCase(),
                    })
                  "
                />

                <BaseButton mode="flat" @click="addNewCategory">
                  {{
                    t('addNewEntity', {
                      entity: t('category').toLowerCase(),
                    })
                  }}
                </BaseButton>
              </div>
            </div>
          </div>

          <PillList
            v-if="!!selectedCategories.length"
            :label="
              t('selectedEntity', { entity: t('category', 2).toLowerCase() })
            "
            :items="selectedCategories"
            @delete="onDelete($event)"
          />

          <div class="flex justify-end gap-4">
            <BaseButton
              mode="outline"
              class="outline-none"
              type="reset"
              link
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
  </div>
</template>
