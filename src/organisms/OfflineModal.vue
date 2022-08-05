<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
// import { useRegisterSW } from 'virtual:pwa-register/vue';

const { t } = useI18n();
// const {
//   offlineReady,
//   // needRefresh,
//   // updateServiceWorker,
// } = useRegisterSW();
const offlineReady = ref(false);

watch(
  () => offlineReady.value,
  (value) => {
    console.log('OfflineModal', value, offlineReady.value);
  }
);

const onCloseModal = () => {
  offlineReady.value = false;
};
</script>

<template>
  <BaseDialog :title="t('offlinePage.title')" :show="offlineReady">
    <div class="flex w-full">
      <p class="dark:text-white">{{ t('offlinePage.description') }}</p>
    </div>

    <template #actions>
      <BaseButton @click="onCloseModal">
        {{ t('close') }}
      </BaseButton>
    </template>
  </BaseDialog>
</template>
