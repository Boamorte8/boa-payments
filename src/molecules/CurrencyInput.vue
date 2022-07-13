<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { watch } from 'vue';
import {
  type CurrencyInputOptions,
  useCurrencyInput,
} from 'vue-currency-input';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: null,
  },
  options: {
    type: Object,
    required: true,
  },
  name: {
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
    type: Number,
    default: null,
  },
});
const { inputRef, numberValue, setOptions, setValue } = useCurrencyInput(
  props.options as CurrencyInputOptions,
  false
);

const emit = defineEmits(['update:modelValue']);

watch(
  () => props.modelValue,
  (value) => {
    setValue(value);
  }
);

watch(
  () => props.options,
  (options) => {
    setOptions(options as CurrencyInputOptions);
  }
);

watchDebounced(numberValue, (value) => emit('update:modelValue', value), {
  debounce: 1000,
});
</script>

<template>
  <div>
    <BaseLabel v-if="!!props.label" :for="props.name" class="mb-2">
      {{ props.label }}
    </BaseLabel>
    <input
      ref="inputRef"
      class="w-full h-10 block border border-transparent py-2 px-4 rounded-md dark:bg-background-300 dark:text-white focus:border-primary-700 focus:outline-none focus:bg-gray-50"
      type="text"
      :name="props.name"
      :placeholder="props.placeholder ?? props.label"
    />
  </div>
</template>
