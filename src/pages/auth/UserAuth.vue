<template>
  <div>
    <h1 class="max-w-2xl mx-auto my-8 flex justify-center text-3xl font-bold">Boa Payments</h1>
    <base-card>
      <form class="w-full flex flex-col items-center m-4 p-4" @submit.prevent="submitForm">
        <div class="form-control">
          <label class="form-label" for="email">{{ t('email') }}</label>
          <input id="email" v-model.trim="email" class="form-input" type="email" name="email" />
        </div>
        <div class="form-control">
          <label class="form-label" for="password">{{ t('password') }}</label>
          <input id="password" v-model.trim="password" class="form-input" type="password" name="password">
        </div>
        <!-- <p v-if="!formIsValid">Please enter a valid email and password (must be at least 6 characters long).</p> -->
        <div class="flex flex-col items-center">
          <base-button class="mb-4">{{ t(mode) }}</base-button>
          <base-button mode="flat" @click="switchAuthMode">{{ t(switchModeButtonCaption) }}</base-button>
        </div>
      </form>

    </base-card>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
// import { useStore } from '../../store';

export default {
  setup() {
    const { t } = useI18n();
    const email = ref('');
    const password = ref('');
    // const { getters, dispatch } = useStore();
    const mode = ref('login');
    const switchModeButtonCaption = computed(() => mode.value === 'login' ? 'loginSwitch' : 'signSwitch');

    const switchAuthMode = () => {
      mode.value = mode.value === 'login' ? 'signup' : 'login';
    };

    const route = useRoute();

    if (route.query.redirect) {
      mode.value = 'signup';
    }
    // const incrementCounter = () => {
    //   dispatch('incrementCounter');
    // };

    const submitForm = () => {
      // dispatch('submitForm');
    };
    return {
      mode,
      email,
      password,
      t,
      submitForm,
      switchAuthMode,
      switchModeButtonCaption,
      // counter,
      // incrementCounter,
    };
  }
}
</script>

<style scoped>
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