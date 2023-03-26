<script setup lang="ts">
defineProps({
  classes: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<template>
  <svg
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <title>Github</title>
    <path data-name="Path 11" d="M0 0h24v24H0Z" fill="none" />
    <path
      data-name="Path 12"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.86c-2.52.46-3.17-.61-3.37-1.17a3.64 3.64 0 0 0-1.02-1.42c-.35-.18-.85-.65-.02-.66a2 2 0 0 1 1.54 1.03 2.14 2.14 0 0 0 2.91.82 2.1 2.1 0 0 1 .64-1.34c-2.22-.25-4.55-1.11-4.55-4.93a3.9 3.9 0 0 1 1.02-2.7 3.6 3.6 0 0 1 .1-2.64s.84-.26 2.75 1.02a9.43 9.43 0 0 1 5 0c1.92-1.3 2.75-1.02 2.75-1.02a3.6 3.6 0 0 1 .1 2.65 3.87 3.87 0 0 1 1.03 2.69c0 3.83-2.34 4.68-4.56 4.93a2.37 2.37 0 0 1 .67 1.85l-.01 2.75c0 .27.19.58.69.48A10 10 0 0 0 12 2Z"
      fill="currentColor"
    />
  </svg>
</template>
