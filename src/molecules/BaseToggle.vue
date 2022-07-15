<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '@headlessui/vue';

const enabled = ref(false);

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: null,
  },
  modelValue: {
    type: Boolean,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleDate = (modelData: unknown) => {
  emit('update:modelValue', modelData);
};
</script>

<template>
  <div>
    <BaseLabel v-if="!!props.label" class="mb-2">
      {{ props.label }}
    </BaseLabel>
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-primary-700' : 'bg-primary-300'"
      class="relative inline-flex h-[32px] w-[68px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      @update:model-value="handleDate"
    >
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-9' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
  </div>
</template>
