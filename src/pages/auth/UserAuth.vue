<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAuthUserStore } from '../../stores';

const { t } = useI18n();
const email = ref('');
const password = ref('');
const formIsValid = ref(true);
const isLoading = ref(false);
const store = useAuthUserStore();
const mode = ref('login');
const errorMessage = ref(null);
const switchModeButtonCaption = computed(() =>
  mode.value === 'login' ? 'loginSwitch' : 'signSwitch'
);

const switchAuthMode = () => {
  mode.value = mode.value === 'login' ? 'signup' : 'login';
};

const route = useRoute();
const router = useRouter();

if (route.query.redirect) {
  mode.value = 'signup';
}

const submitForm = async () => {
  formIsValid.value = true;
  if (
    email.value === '' ||
    !email.value.includes('@') ||
    password.value.length < 6
  ) {
    formIsValid.value = false;
    return;
  }

  isLoading.value = true;
  const payload = {
    email: email.value,
    password: password.value,
  };

  try {
    if (mode.value === 'login') {
      await store.login(payload);
    } else {
      await store.signup(payload);
    }
    const redirectUrl = '/' + (route.query.redirect || 'orders');
    router.replace(redirectUrl);
  } catch (error: any) {
    errorMessage.value = error || t('loginErrorGeneric');
  }

  isLoading.value = false;
};

const handleError = () => {
  errorMessage.value = null;
};
</script>

<template>
  <div class="p-2 md:p-4">
    <BaseDialog
      :show="!!errorMessage"
      :title="t('defaultError')"
      @close="handleError"
    >
      <p class="dark:text-white">{{ errorMessage }}</p>
    </BaseDialog>

    <BaseLoader :loading="isLoading" />

    <h1 class="dark:text-white font-bold text-xl mb-4">
      {{ t(mode) }}
    </h1>

    <BaseCard
      v-if="mode === 'signup'"
      class="flex gap-4 mx-auto max-w-fit mb-4"
    >
      <WarningIcon class="text-warning-700 h-8 w-8" />

      <p class="dark:text-white font-bold">
        {{ t('pageAuth.warning') }}
        <router-link
          class="text-primary-700 dark:text-primary-300"
          :to="{ name: 'info' }"
        >
          {{ t('pageAuth.infoPage') }}
        </router-link>
      </p>
    </BaseCard>

    <BaseCard class="max-w-2xl mx-auto">
      <form
        class="w-full flex flex-col items-center m-4 p-4"
        @submit.prevent="submitForm"
      >
        <BaseInput
          id="email"
          v-model.trim="email"
          class="form-control"
          type="email"
          name="email"
          :label="t('email')"
        ></BaseInput>

        <BaseInput
          id="password"
          v-model="password"
          class="form-control"
          type="password"
          name="password"
          :label="t('password')"
        ></BaseInput>

        <p v-if="!formIsValid" class="text-sm mb-2 text-red-600">
          {{ t('loginFormError') }}
        </p>

        <div class="flex flex-col items-center">
          <BaseButton class="mb-4" type="submit">{{ t(mode) }}</BaseButton>

          <BaseButton mode="flat" type="reset" @click="switchAuthMode">
            {{ t(switchModeButtonCaption) }}
          </BaseButton>
        </div>
      </form>
    </BaseCard>
  </div>
</template>

<style lang="postcss" scoped>
.form {
  &-control {
    @apply w-60 my-2.5;

    &:nth-child(2) {
      @apply mb-8;
    }
  }
}
</style>
