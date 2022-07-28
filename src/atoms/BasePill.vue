<script setup lang="ts">
import type { PropType } from 'vue';

import type { BaseItem } from '@app/models';

defineProps({
  item: {
    type: Object as PropType<BaseItem>,
    required: true,
  },
});

const emit = defineEmits(['delete']);

const onDelete = (item: BaseItem) => {
  emit('delete', item);
};
</script>

<template>
  <div
    class="flex gap-1 items-center px-2 py-1 rounded-xl bg-primary-700 text-white"
  >
    <span class="font-light text-sm">
      {{ item.name }}
    </span>

    <button class="h-4 w-4 rounded-[50%]" type="button" @click="onDelete(item)">
      <PlusIcon class="rotate-45" />
    </button>
  </div>
</template>
