<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
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
  maxDate: {
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
  name: {
    type: String,
    required: false,
    default: null,
  },
  teleport: {
    type: String,
    required: false,
    default: 'body',
  },
});

const emit = defineEmits(['update:modelValue']);

const handleDate = (modelData: Date) => {
  emit('update:modelValue', modelData);
};

onMounted(() => {
  const { modelValue } = props;
  if (modelValue) {
    date.value = modelValue;
    handleDate(modelValue);
  }
});
</script>

<template>
  <div>
    <BaseLabel v-if="!!label" class="mb-2">
      {{ label }}
    </BaseLabel>
    <Datepicker
      v-model="date"
      auto-apply
      calendar-class-name="dp-custom-calendar"
      input-class-name="dp-custom-input"
      menu-class-name="dp-custom-menu"
      :dark="isDark"
      :format="formatInput"
      :placeholder="placeholder"
      :min-date="minDate"
      :max-date="maxDate"
      :name="name"
      :enable-time-picker="enableTimePicker"
      :teleport="teleport"
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
