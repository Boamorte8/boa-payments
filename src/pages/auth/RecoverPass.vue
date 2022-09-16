<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="p-2 md:p-4">
    <BaseCard class="max-w-2xl mx-auto">
      <div class="w-full flex flex-col items-center m-4 p-4">
        <h1 class="dark:text-white font-bold text-xl mb-4">
          {{ t('recoverPage.recoverPassword') }}
        </h1>

        <router-view v-slot="slotProps">
          <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
          </transition>
        </router-view>
      </div>
    </BaseCard>
  </div>
</template>

<style lang="postcss" scoped>
.form-control {
  @apply w-60 my-2.5 mb-8;
}

.route-enter-from {
  @apply opacity-0 -translate-y-8;
}

.route-leave-to {
  @apply opacity-0 translate-y-8;
}

.route-enter-active {
  @apply transition-all ease-out duration-300;
}

.route-leave-active {
  @apply transition-all ease-in duration-300;
}

.route-enter-to,
.route-leave-from {
  @apply opacity-100 translate-y-0;
}
</style>
