<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import { formatCurrency, formatDate } from '@app/utils';
import { OrderType, type Category, type Order } from '@stores/models';

const { t } = useI18n();
const props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true,
  },
});

const totalAmount = computed(
  () =>
    `${formatCurrency(
      props.order.amount,
      props.order.currency
    )}/${props.order.currency.toLowerCase()}`
);

const currentAmount = computed(
  () =>
    `${formatCurrency(
      props.order.currentAmount,
      props.order.currency
    )}/${props.order.currency.toLowerCase()}`
);

const nextDate = computed(() => formatDate(new Date(props.order.nextDate)));
const startDate = computed(() => formatDate(new Date(props.order.startDate)));
const finishedText = computed(() => (props.order.finished ? 'yes' : 'no'));
const subscriptionText = computed(() =>
  props.order.subscription ? 'yes' : 'no'
);
const categories = computed(() =>
  (props.order.category as Array<Category>)
    .map((item: Category) => item.name)
    .join(', ')
);

const isLoan = computed(() => props.order.type === OrderType.LOAN);
</script>

<template>
  <BaseCard class="block min-w-[310px] md:min-w-[325px] lg:min-w-[350px]">
    <div class="w-full">
      <header class="flex w-full gap-4 justify-between mb-4">
        <div
          class="flex justify-center items-center rounded-[50%] bg-primary-700 text-white h-12 w-12"
        >
          <UserIcon class="h-6 w-6" />
        </div>

        <div class="w-[53%] dark:text-white">
          <h3 class="font-bold text-xl">{{ order.title }}</h3>
          <p class="text-sm">{{ order.entity.name }}</p>
        </div>

        <div class="h-9 w-9">
          <CashIcon v-if="isLoan" class="text-success-700" />
          <LibraryIcon v-else class="text-error-700" />
        </div>
      </header>

      <section>
        <DisplayInfo :label="t('totalAmount')" :value="totalAmount" />
        <DisplayInfo :label="t('currentAmount')" :value="currentAmount" />
        <DisplayInfo :label="t('nextDate')" :value="nextDate" />
        <DisplayInfo :label="t('startDate')" :value="startDate" />
        <DisplayInfo :label="t('subscription')" :value="t(subscriptionText)" />
        <DisplayInfo
          class="mb-2"
          :label="t('finished')"
          :value="t(finishedText)"
        />
        <DisplayInfo
          class="pb-2"
          :label="t('description')"
          :value="order.description"
          mode="vertical"
        />
        <DisplayInfo
          :label="t('category', 2)"
          :value="categories"
          mode="vertical"
        />
      </section>
    </div>
  </BaseCard>
</template>
