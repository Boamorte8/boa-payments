<template>
  <div>
    <h1 class="max-w-2xl mx-auto my-8 flex justify-center text-3xl font-bold">Boa Payments</h1>
    <base-card>
      <form class="w-full flex flex-col items-center" @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input id="email" v-model.trim="email" type="email" name="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input id="password" v-model.trim="password" type="password" name="password">
        </div>
        <!-- <p v-if="!formIsValid">Please enter a valid email and password (must be at least 6 characters long).</p> -->
        <div class="flex justify-center">
          <base-button class="mr-4">{{ t(mode) }}</base-button>
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
.form-control {
  @apply w-80 my-2.5 flex justify-between;

  &:nth-child(2) {
    @apply mb-8;
  }
}
</style>