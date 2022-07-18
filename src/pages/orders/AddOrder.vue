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
  type Currency,
} from '@stores/models';
import { useCategoryStore } from '@stores/categoryStore';
import { useEntityStore } from '@stores/entityStore';
import { useToastStore } from '@stores/toastStore';

const categoryStore = useCategoryStore();
const entityStore = useEntityStore();
const toastStore = useToastStore();
const { t } = useI18n();
const title = ref('');
const description = ref('');
const amount = ref(0);
const currency = ref('COP');
const isSubscription = ref(false);
const startDate = ref();
const nextDate = ref();
const category = ref();
const entity = ref();
const currencyList = currencies;
const orderTypeList: BaseSelectItem[] = orderTypes.map((type) => ({
  ...type,
  text: t(type.text),
}));
const currencyModel = ref(null);
const type = ref(null);
const categories = computed(() => categoryStore.categories);
const entities = computed(() => entityStore.entities);
const isLoading = computed(
  () => entityStore.isLoading || categoryStore.loading
);
const startDateLabel = computed(() => t('startDate') + '*');
const nextDateLabel = computed(() => t('nextDate') + '*');
const titleLabel = computed(() => t('title') + '*');
const descriptionLabel = computed(() => t('description') + '*');
const entityLabel = computed(() => t('entity') + '*');
const categoryLabel = computed(() => t('category', 2) + '*');
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

loadEntities();
loadCategories();

const addNewOrder = () => {
  console.log(
    'addNewOrder',
    amount.value,
    title.value,
    description.value,
    isSubscription.value
  );
  console.log('addNewOrder', startDate.value, nextDate.value);
  displayError('Testing toast');
};

const addNewEntity = () => {
  entityStore.toggleModal(true);
};

const addNewCategory = () => {
  categoryStore.toggleModal(true);
};

// TODO - 1 Implement 'Add Categories' logic
// TODO - 2 Add pills component for display selected categories
// TODO - 3 Add create order action
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

          <div class="flex gap-4 flex-wrap">
            <BaseInput
              id="title"
              v-model="title"
              type="text"
              name="title"
              :label="titleLabel"
              :placeholder="
                t('addEntity', { entity: t('title').toLowerCase() })
              "
            />

            <BaseInput
              id="description"
              v-model="description"
              type="text"
              name="description"
              :label="descriptionLabel"
              :placeholder="
                t('addEntity', { entity: t('description').toLowerCase() })
              "
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
                  v-model="category"
                  item-key="name"
                  name="category"
                  :default-value-index="0"
                  :items="categories"
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
