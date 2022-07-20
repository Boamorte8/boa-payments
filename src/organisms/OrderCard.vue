<script setup lang="ts">
import { computed, type PropType } from 'vue';

import { OrderType, type Order } from '@stores/models';

const props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true,
  },
});

const isLoan = computed(() => props.order.type === OrderType.LOAN);
</script>

<template>
  <BaseCard class="min-w-[300px]">
    <header class="flex w-full gap-4 justify-between">
      <div
        class="flex justify-center items-center rounded-[50%] bg-primary-700 text-white h-12 w-12"
      >
        <UserIcon class="h-6 w-6" />
      </div>

      <div class="w-[50%] dark:text-white">
        <h3 class="font-bold text-xl">{{ order.title }}</h3>
        <p class="text-sm">{{ order.entity.name }}</p>
      </div>

      <div class="h-9 w-9">
        <CashIcon v-if="isLoan" class="text-success-700" />
        <LibraryIcon v-else class="text-error-700" />
      </div>
    </header>
  </BaseCard>
</template>
