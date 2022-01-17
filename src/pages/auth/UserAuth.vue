<template>
  <div>
    <h1 class="max-w-2xl mx-auto my-8 flex justify-center text-3xl font-bold">Boa Payments</h1>
    <base-card>
      <!-- <div>
        <h1>{{ t('hello') }} to Auth page</h1>
        <p>{{ counter }}</p>
        <button @click="incrementCounter()">Increment</button>
      </div> -->
      <form class="w-full flex flex-col items-center" @submit.prevent="submitForm">
        <!-- <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model.trim="password">
        </div> -->
        <!-- <p v-if="!formIsValid">Please enter a valid email and password (must be at least 6 characters long).</p> -->
        <div class="flex justify-center">
          <base-button class="mr-4">{{ t(mode) }}</base-button>
          <base-button type="button" mode="flat" @click="switchAuthMode">{{ t(switchModeButtonCaption) }}</base-button>
        </div>
      </form>

    </base-card>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// import { useStore } from '../../store';

export default {
  setup() {
    const { t } = useI18n();
    const mode = ref('login');
    // const { getters, dispatch } = useStore();
    const switchModeButtonCaption = computed(() => mode.value === 'login' ? 'loginSwitch' : 'signSwitch');

    // const incrementCounter = () => {
    //   dispatch('incrementCounter');
    // };

    const submitForm = () => {
      // dispatch('submitForm');
    };

    const switchAuthMode = () => {
      mode.value = mode.value === 'login' ? 'signup' : 'login';
    };

    return {
      mode,
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