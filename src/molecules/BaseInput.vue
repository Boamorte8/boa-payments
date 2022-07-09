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
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div>
    <base-label v-if="!!props.label" :for="props.name" class="mb-2">
      {{ props.label }}
    </base-label>
    <input
      class="w-full h-10 block border border-transparent py-2 px-4 rounded-md dark:bg-background-300 dark:text-white focus:border-primary-700 focus:outline-none focus:bg-gray-50"
      :type="props.type"
      :name="props.name"
      :value="modelValue"
      :placeholder="props.label"
      @input="updateValue"
    />
  </div>
</template>
