<script setup lang="ts">
import type { PropType } from 'vue';

import type { BaseItem } from '@app/models';
import BasePill from '../atoms/BasePill.vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: null,
  },
  items: {
    type: Array as PropType<BaseItem[]>,
    required: true,
  },
});

const emit = defineEmits(['delete']);

const onDelete = (item: BaseItem) => {
  emit('delete', item);
};
</script>

<template>
  <div>
    <BaseLabel v-if="!!label" class="mb-2">
      {{ label }}
    </BaseLabel>

    <div class="flex gap-2">
      <BasePill
        v-for="item in items"
        :key="item.id"
        :item="item"
        @delete="onDelete($event)"
      />
    </div>
  </div>
</template>
