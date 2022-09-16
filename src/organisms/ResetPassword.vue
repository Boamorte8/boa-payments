<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthUserStore } from '../stores';
import { validatePassword } from '@app/utils';

const { t } = useI18n();
const password = ref('');
const formIsValid = ref(true);
const isLoading = ref(false);
const passwordUpdated = ref(false);
const store = useAuthUserStore();
const errorMessage = ref(null);
const router = useRouter();
let code: string;

onMounted(() => {
  const { oobCode } = router.currentRoute.value.query;
  if (!oobCode) {
    router.replace('/auth');
    return;
  }
  code = oobCode.toString();
});

const submitForm = async () => {
  formIsValid.value = true;
  if (!validatePassword(password.value)) {
    formIsValid.value = false;
    return;
  }

  isLoading.value = true;
  try {
    await store.resetPassword(
      code,
      password.value,
      t('resetPage.resetPasswordError')
    );
    passwordUpdated.value = true;
  } catch (error: any) {
    errorMessage.value = error || t('resetPage.resetPasswordError');
  }

  isLoading.value = false;
};

const handleError = () => {
  errorMessage.value = null;
};

const goToLogin = () => {
  passwordUpdated.value = false;
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
      :show="passwordUpdated"
      :title="t('resetPage.resetPasswordTitle')"
      @close="goToLogin"
    >
      <p class="dark:text-white">{{ t('resetPage.resetPasswordMessage') }}</p>
    </BaseDialog>

    <BaseLoader :loading="isLoading" />

    <form
      class="w-full flex flex-col items-center"
      @submit.prevent="submitForm"
    >
      <p class="dark:text-white">{{ t('resetPage.instructions') }}</p>

      <BaseInput
        id="password"
        v-model="password"
        class="form-control"
        type="password"
        name="password"
        :label="t('newPassword')"
      ></BaseInput>

      <p v-if="!formIsValid" class="text-sm mb-2 text-red-600">
        {{ t('resetPage.formError') }}
      </p>

      <div class="flex flex-col items-center">
        <BaseButton class="mb-4" type="submit">{{
          t('resetPage.resetPassword')
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
