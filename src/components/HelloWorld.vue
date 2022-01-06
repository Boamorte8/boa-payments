/*global defineProps*/
/*eslint no-undef: "error"*/
<script setup lang="ts">
  // import { defineProps } from 'vue';

  defineProps<{ msg: string }>();
</script>

<template>
  <h1>{{ msg }}</h1>

</template>

<style scoped>

</style>
