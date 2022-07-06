<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: undefined,
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
  loader: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { fixed } = toRefs(props);
const { t } = useI18n();

const loaderClass = computed(() => (props.loader ? 'loader' : ''));

const tryClose = () => {
  if (fixed.value) {
    return;
  }
  emit('close');
};
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      class="bg-overlay w-full h-screen top-0 left-0 fixed z-10"
      @click="tryClose"
    ></div>
    <transition name="dialog">
      <dialog v-if="show" open :class="loaderClass">
        <header
          v-if="title"
          class="w-full p-4 text-white bg-primary-700 dark:bg-background-300"
        >
          <slot name="header">
            <h2 class="m-0 font-semibold">{{ props.title }}</h2>
          </slot>
        </header>
        <section class="p-4">
          <slot></slot>
        </section>
        <menu v-if="!fixed" class="flex justify-end m-0 p-4">
          <slot name="actions">
            <base-button @click="tryClose">{{ t('close') }}</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<style lang="postcss" scoped>
dialog {
  @apply fixed rounded-lg border-none overflow-hidden m-0 p-0 w-4/5 bg-white shadow dark:bg-background-700 dark:shadow-primary;
  top: 20vh;
  left: 10%;
  z-index: 100;

  &.loader {
    @apply bg-transparent shadow-transparent;
  }
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
