<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { generateId } from '@app/utils';
import { TypeToast, type Category } from '@stores/models';
import { useCategoryStore } from '@stores/categoryStore';
import { useToastStore } from '@stores/toastStore';
import { watchDebounced } from '@vueuse/core';

const { t } = useI18n();
const categoryStore = useCategoryStore();
const toastStore = useToastStore();

const name = ref('');
const isDuplicated = ref(true);
const nameLabel = computed(() => t('name') + '*');
const openModal = computed(() => categoryStore.openModal);
const disabled = computed(() => !name.value);
const errorMessage = computed(() =>
  t('duplicatedError', { entity: t('category').toLowerCase() })
);

watchDebounced(
  name,
  () => {
    isDuplicated.value = categoryStore.categories.some(
      (category) => category.name === name.value
    );
  },
  { debounce: 500 }
);

const onCloseModal = () => {
  categoryStore.toggleModal(false);
};

const onAddNewCategory = async () => {
  onCloseModal();
  const newCategory: Category = {
    id: generateId().toString(),
    name: name.value,
    userId: '',
  };
  try {
    const errorMessage = t('errorLoadingEntity', {
      entity: t('category', 2).toLowerCase(),
    });
    // await categoryStore.createEntity(newCategory, errorMessage);
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
    :title="t('addNewEntity', { entity: t('category').toLowerCase() })"
  >
    <div class="flex justify-end w-full">
      <p class="text-sm dark:text-white">{{ t('fieldsRequired') }}</p>
    </div>

    <div class="flex flex-col align-center gap-4 w-full">
      <BaseInput
        id="name"
        v-model="name"
        type="text"
        name="name"
        :label="nameLabel"
        :placeholder="t('addEntity', { entity: t('name').toLowerCase() })"
        :has-error="isDuplicated"
        :error-message="errorMessage"
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

      <BaseButton :disabled="disabled" @click="onAddNewCategory">
        {{ t('add') }}
      </BaseButton>
    </template>
  </BaseDialog>
</template>
