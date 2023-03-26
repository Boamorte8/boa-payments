<script setup lang="ts">
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import { formatCurrency } from '@app/utils';
import { SummaryData } from '@stores/models/types';

const { t } = useI18n();

defineProps({
  amount: {
    type: Object as PropType<SummaryData>,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalCurrentAmount: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="w-full mb-4 last:mb-0">
    <h3 class="dark:text-white font-bold text-base mb-2">
      {{ amount.currency }}
    </h3>

    <div class="flex w-full gap-4 flex-wrap">
      <DisplayInfo
        class="info"
        mode="vertical"
        :label="t('totalAmount')"
        :value="formatCurrency(totalAmount, amount.currency)"
      />

      <DisplayInfo
        class="info"
        mode="vertical"
        :label="t('currentAmount')"
        :value="formatCurrency(totalCurrentAmount, amount.currency)"
      />
    </div>
  </div>
</template>

<style>
.info.info {
  @apply w-full sm:w-[calc(50%-16px)] md:w-[calc(33%-16px)] lg:w-[calc(25%-16px)];
}
</style>
