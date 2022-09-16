<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthUserStore } from '../stores';
import { validateEmail } from '@app/utils';

const { t } = useI18n();
const email = ref('');
const formIsValid = ref(true);
const isLoading = ref(false);
const emailSent = ref(false);
const store = useAuthUserStore();
const errorMessage = ref(null);

const router = useRouter();

const submitForm = async () => {
  formIsValid.value = true;
  if (!validateEmail(email.value)) {
    formIsValid.value = false;
    return;
  }

  isLoading.value = true;
  try {
    await store.sendEmailReset(email.value, t('recoverPage.noExistsEmail'));
    emailSent.value = true;
  } catch (error: any) {
    errorMessage.value = error || t('recoverPage.sendingEmailError');
  }

  isLoading.value = false;
};

const handleError = () => {
  errorMessage.value = null;
};

const goToLogin = () => {
  emailSent.value = false;
  router.replace('/auth');
};
</script>

<template>
  <div class="w-full">
    <BaseDialog
      :show="!!errorMessage"
      :title="t('defaultError')"
      @close="handleError"
    >
      <p class="dark:text-white">{{ errorMessage }}</p>
    </BaseDialog>

    <BaseDialog
      :show="emailSent"
      :title="t('recoverPage.sendingEmailTitle')"
      @close="goToLogin"
    >
      <p class="dark:text-white">{{ t('recoverPage.sendingEmailMessage') }}</p>
    </BaseDialog>

    <BaseLoader :loading="isLoading" />

    <form
      class="w-full flex flex-col items-center"
      @submit.prevent="submitForm"
    >
      <p class="dark:text-white">{{ t('recoverPage.instructions') }}</p>

      <BaseInput
        id="email"
        v-model.trim="email"
        class="form-control"
        type="email"
        name="email"
        :label="t('email')"
      ></BaseInput>

      <p v-if="!formIsValid" class="text-sm mb-2 text-red-600">
        {{ t('recoverPage.formError') }}
      </p>

      <div class="flex flex-col items-center">
        <BaseButton class="mb-4" type="submit">{{
          t('recoverPage.recoverPassword')
        }}</BaseButton>

        <BaseButton mode="flat" type="reset" @click="goToLogin">
          {{ t('login') }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<style lang="postcss" scoped>
.form-control {
  @apply w-60 my-2.5 mb-8;
}
</style>
