<script setup lang="ts">
import { computed, ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { usePreferencesUserStore } from '@stores/preferencesStore';

const date = ref();
const prefStore = usePreferencesUserStore();
const isDark = computed(() => {
  return prefStore.theme === 'dark';
});

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: null,
  },
  placeholder: {
    type: String,
    required: false,
    default: null,
  },
  modelValue: {
    type: Date,
    default: null,
  },
  minDate: {
    type: Date,
    required: false,
    default: null,
  },
  formatInput: {
    type: String,
    required: false,
    default: 'MM/dd/yyyy',
  },
  enableTimePicker: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleDate = (modelData: Date) => {
  emit('update:modelValue', modelData);
};
</script>

<template>
  <div>
    <BaseLabel v-if="!!props.label" class="mb-2">
      {{ props.label }}
    </BaseLabel>
    <Datepicker
      v-model="date"
      auto-apply
      calendar-class-name="dp-custom-calendar"
      input-class-name="dp-custom-input"
      menu-class-name="dp-custom-menu"
      :dark="isDark"
      :format="props.formatInput"
      :placeholder="props.placeholder"
      :min-date="props.minDate"
      :enable-time-picker="props.enableTimePicker"
      @update:model-value="handleDate"
    />
  </div>
</template>

<style lang="postcss">
.dp-custom-input {
  @apply rounded-md h-10;
  --dp-background-color: var(--bg-300);
  --dp-primary-color: var(--primary);
  --dp-border-color-hover: var(--primary);
}

.dp-custom-menu {
  @apply rounded-md;
  --dp-background-color: var(--bg-300);
  --dp-primary-color: var(--primary);
}
</style>
