<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: null,
  },
  for: {
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
  modelValue: {
    type: String,
    default: null,
  },
});
// TODO - Create unit tests

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div>
    <base-label v-if="!!props.label" :for="props.for" class="mb-2">
      {{ props.label }}
    </base-label>
    <input
      class="w-full block border border-gray-300 p-0.5 rounded-md focus:border-primary-700 focus:outline-none focus:bg-gray-50"
      :type="props.type"
      :name="props.name"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>
