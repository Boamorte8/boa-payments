<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { ref } from 'vue';

import type { SelectType } from '@app/models';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: null,
  },
  itemKey: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: null,
  },
  defaultValueIndex: {
    type: Number,
    required: false,
    default: null,
  },
  placeholder: {
    type: String,
    required: false,
    default: null,
  },
  noItemsMessage: {
    type: String,
    required: false,
    default: 'There are no items available',
  },
  name: {
    type: String,
    required: false,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const defaultValue =
  props.defaultValueIndex >= 0
    ? (props.items as unknown[] as SelectType[])[props.defaultValueIndex]
    : undefined;
const selectedItem = ref(defaultValue);

const handleDate = (modelData: unknown) => {
  emit('update:modelValue', modelData);
};
</script>

<template>
  <Listbox
    v-model="selectedItem"
    :name="props.name"
    @update:model-value="handleDate"
  >
    <div class="relative">
      <BaseLabel v-if="!!props.label">{{ props.label }}</BaseLabel>
      <ListboxButton
        class="flex justify-between gap-4 h-10 w-full min-w-[100px] cursor-default rounded-md bg-white py-2 pl-4 pr-2 text-left border border-transparent focus:outline-none focus-visible:border-primary-700 dark:bg-background-300 dark:text-white"
      >
        <span class="block truncate">
          <template v-if="!!selectedItem">
            {{ selectedItem[props.itemKey] }}
          </template>
          <span v-else class="font-normal text-gray-400">
            {{ props.placeholder }}
          </span>
        </span>
        <span class="pointer-events-none flex items-center">
          <SelectIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-background-300"
        >
          <div
            v-if="!props.items || !props.items.length"
            class="p-4 font-normal text-gray-400"
          >
            {{ props.noItemsMessage }}
          </div>
          <ListboxOption
            v-for="item in (props.items as SelectType[])"
            v-slot="{ active, selected }"
            :key="item[props.itemKey]"
            :value="item"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-primary-300 dark:bg-primary-700' : '',
                'relative cursor-default select-none py-2 pl-10 pr-4 text-purple-900 dark:text-white',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ item[props.itemKey] }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-700 dark:text-primary-300"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
