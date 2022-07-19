<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { watchDebounced } from '@vueuse/core';

import { generateId } from '@app/utils';
import { TypeToast, type Entity } from '@stores/models';
import { useEntityStore } from '@stores/entityStore';
import { useToastStore } from '@stores/toastStore';

const { t } = useI18n();
const entityStore = useEntityStore();
const toastStore = useToastStore();

const name = ref('');
const description = ref('');
const isDuplicated = ref(false);
const errorMessage = computed(() =>
  t('duplicatedError', { entity: t('entity').toLowerCase() })
);
const nameLabel = computed(() => t('name') + '*');
const descriptionLabel = computed(() => t('description') + '*');
const openModal = computed(() => entityStore.openModal);
const disabled = computed(
  () => !name.value || !description.value || isDuplicated.value
);

watchDebounced(
  name,
  () => {
    isDuplicated.value = entityStore.entities.some(
      (entity) => entity.name === name.value
    );
  },
  { debounce: 500 }
);

const onCloseModal = () => {
  entityStore.toggleModal(false);
};

const onAddNewEntity = async () => {
  onCloseModal();
  const newEntity: Entity = {
    id: generateId().toString(),
    name: name.value,
    description: description.value,
    userId: '',
  };
  try {
    const errorMessage = t('errorLoadingEntity', {
      entity: t('entity', 2).toLowerCase(),
    });
    await entityStore.createEntity(newEntity, errorMessage);
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
    :title="t('addNewEntity', { entity: t('entity').toLowerCase() })"
  >
    <div class="flex justify-end w-full">
      <p class="text-sm dark:text-white">{{ t('fieldsRequired') }}</p>
    </div>

    <div class="flex flex-col align-center gap-4 w-full">
      <BaseInput
        id="name"
        v-model.trim="name"
        type="text"
        name="name"
        :label="nameLabel"
        :placeholder="t('addEntity', { entity: t('name').toLowerCase() })"
        :has-error="isDuplicated"
        :error-message="errorMessage"
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

      <BaseButton :disabled="disabled" @click="onAddNewEntity">
        {{ t('add') }}
      </BaseButton>
    </template>
  </BaseDialog>
</template>
