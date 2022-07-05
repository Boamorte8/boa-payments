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
  <div>
    <base-dialog
      :show="!!errorMessage"
      title="An error ocurred"
      @close="handleError"
    >
      <p>{{ errorMessage }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card class="max-w-2xl mx-auto my-8">
      <form
        class="w-full flex flex-col items-center m-4 p-4"
        @submit.prevent="submitForm"
      >
        <div class="form-control">
          <label class="form-label" for="email">{{ t('email') }}</label>
          <input
            id="email"
            v-model.trim="email"
            class="form-input"
            type="email"
            name="email"
          />
        </div>

        <div class="form-control">
          <label class="form-label" for="password">{{ t('password') }}</label>
          <input
            id="password"
            v-model.trim="password"
            class="form-input"
            type="password"
            name="password"
          />
        </div>

        <p v-if="!formIsValid" class="text-sm mb-2 text-red-600">
          {{ t('loginFormError') }}
        </p>

        <div class="flex flex-col items-center">
          <base-button class="mb-4">{{ t(mode) }}</base-button>
          <base-button mode="flat" @click="switchAuthMode">{{
            t(switchModeButtonCaption)
          }}</base-button>
        </div>
      </form>
    </base-card>
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

  &-label {
    @apply font-bold mb-2 block;
  }

  &-input {
    @apply w-full block border border-gray-300 p-0.5 rounded-md focus:border-purple-900 focus:outline-none focus:bg-gray-50;
  }
}
</style>
