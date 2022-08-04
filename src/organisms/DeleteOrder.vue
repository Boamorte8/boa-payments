<script setup lang="ts">
import { computed, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { Order, TypeToast } from '@stores/models';
import { useOrderStore } from '@stores/orderStore';
import { useToastStore } from '@stores/toastStore';

const { t } = useI18n();
const orderStore = useOrderStore();
const toastStore = useToastStore();
const router = useRouter();

const props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true,
  },
});

const openModal = computed(() => orderStore.openConfirmDeleteModal);

const onCloseModal = () => {
  orderStore.toggleModal(false);
};

const onDeleteOrder = async () => {
  onCloseModal();
  try {
    const errorMessage = t('errorDeletingEntity', {
      entity: t('orders').toLowerCase(),
    });
    await orderStore.deleteOrder(props.order, errorMessage);
    router.push('/orders');
  } catch (error: any) {
    toastStore.addToast({
      id: 0,
      title: t('error'),
      type: TypeToast.ERROR,
      message: error,
    });
  }
};
</script>

<template>
  <BaseDialog :show="openModal" :title="t('confirmDelete')">
    <div class="">
      <p class="dark:text-white">
        {{
          t('confirmDeleteEntity', {
            entity: t('orders').toLowerCase(),
          })
        }}
      </p>
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

      <BaseButton @click="onDeleteOrder">
        {{ t('confirm') }}
      </BaseButton>
    </template>
  </BaseDialog>
</template>
