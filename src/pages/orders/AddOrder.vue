<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const title = ref('');
const description = ref('');

</script>

<template>
  <form class="p-4">
    <BaseCard>
      <div class="w-full flex flex-col gap-4">
        <div class="flex justify-between pb-4 w-full">
          <h2 class="text-xl dark:text-white font-bold">{{ t('pageOrders.addNewOrder') }}</h2>
          <p class="text-sm dark:text-white">{{ t('fieldsRequired') }}</p>
        </div>

        <div class="flex gap-4 flex-wrap">
          <BaseInput
            id="title"
            v-model="title"
            class=""
            type="text"
            name="title"
            :label="t('title')"
          ></BaseInput>

          <BaseInput
            id="description"
            v-model="description"
            class=""
            type="text"
            name="description"
            :label="t('description')"
          ></BaseInput>
        </div>

        <div class="flex justify-end gap-4">
          <BaseButton mode="outline" type="reset" link :to="{ name: 'orders' }" class="outline-none">
            {{ t('cancel') }}
          </BaseButton>

          <BaseButton type="submit">{{ t('add') }}</BaseButton>
        </div>
      </div>
    </BaseCard>
  </form>
</template>
