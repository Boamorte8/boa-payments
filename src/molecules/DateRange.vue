<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { DatesRange } from '@app/models';

defineProps({
  modelValue: {
    type: Object as PropType<DatesRange>,
    default: null,
  },
  minLimit: {
    type: Date,
    required: false,
    default: null,
  },
  maxLimit: {
    type: Date,
    required: false,
    default: null,
  },
});

const { t } = useI18n();
const startDate = ref();
const endDate = ref();

const emit = defineEmits(['update:modelValue']);

watch(
  () => startDate.value,
  (value) => {
    const modelData: DatesRange = {
      startDate: value,
      endDate: endDate.value,
    };
    emit('update:modelValue', modelData);
  }
);

watch(
  () => endDate.value,
  (value) => {
    const modelData: DatesRange = {
      startDate: startDate.value,
      endDate: value,
    };
    emit('update:modelValue', modelData);
  }
);
</script>

<template>
  <div class="flex gap-4">
    <BaseCalendar
      id="startDate"
      v-model="startDate"
      name="startDate"
      :label="t('startDate')"
      :placeholder="t('addEntity', { entity: t('date').toLowerCase() })"
      :min-date="minLimit"
      :max-date="endDate || maxLimit"
    />

    <BaseCalendar
      id="endDate"
      v-model="endDate"
      name="endDate"
      :label="t('endDate')"
      :placeholder="t('addEntity', { entity: t('date').toLowerCase() })"
      :min-date="startDate || minLimit"
      :max-date="maxLimit"
    />
  </div>
</template>
