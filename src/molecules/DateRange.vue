<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';

interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<DateRange>,
    default: null,
  },
});

const { t } = useI18n();
const startDate = ref();
const endDate = ref();

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex gap-4">
    <BaseCalendar
      id="startDate"
      v-model="startDate"
      name="startDate"
      :label="t('startDate')"
      :placeholder="t('addEntity', { entity: t('date').toLowerCase() })"
      :max-date="endDate"
    />

    <BaseCalendar
      id="endDate"
      v-model="endDate"
      name="endDate"
      :label="t('endDate')"
      :placeholder="t('addEntity', { entity: t('date').toLowerCase() })"
      :min-date="startDate"
    />
  </div>
</template>
