<template>
  <div>
    <base-card>
      <div>
        <h1>{{ t('hello') }} to Auth page</h1>
        <p>{{ counter }}</p>
        <button @click="incrementCounter()">Increment</button>
      </div>
      <!-- <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model.trim="password">
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password (must be at least 6 characters long).</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
      </form> -->

    </base-card>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useStore } from '../../store';

export default {
  setup() {
    const { t } = useI18n();
    const { getters, dispatch } = useStore();
    const counter = computed(() => getters.counter);

    const incrementCounter = () => {
      dispatch('incrementCounter');
    };

    return { t, counter, incrementCounter };
  }
}
</script>