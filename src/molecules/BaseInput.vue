<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: null,
  },
  type: {
    type: String,
    required: false,
    default: 'text',
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
    type: String,
    default: null,
  },
  hasError: {
    type: Boolean,
    required: false,
    default: false,
  },
  errorMessage: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div>
    <BaseLabel v-if="!!label" :for="name" class="mb-2">
      {{ label }}
    </BaseLabel>
    <input
      class="w-full h-10 block border border-transparent py-2 px-4 rounded-md dark:bg-background-300 dark:text-white focus:border-primary-700 focus:outline-none focus:bg-gray-50"
      :class="hasError ? 'border-error-700' : ''"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder ?? label"
      @input="updateValue"
    />
    <p v-if="hasError" class="text-sm text-error-700 mt-2">
      {{ errorMessage }}
    </p>
  </div>
</template>
