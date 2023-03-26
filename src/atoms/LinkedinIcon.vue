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
    <title>LinkedIn</title>
    <path data-name="Path 9" d="M0 0h24v24H0Z" fill="none" />
    <path
      data-name="Path 10"
      d="M18.34 18.34h-2.67v-4.18c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.09-1.6 2.2v4.25h-2.67V9.75h2.56v1.17h.04a2.81 2.81 0 0 1 2.53-1.39c2.7 0 3.2 1.78 3.2 4.1v4.7ZM7 8.57a1.55 1.55 0 1 1 1.55-1.54A1.55 1.55 0 0 1 7 8.57Zm1.34 9.77H5.67V9.75h2.67v8.59ZM19.67 3H4.33A1.31 1.31 0 0 0 3 4.3v15.4A1.31 1.31 0 0 0 4.33 21h15.34A1.32 1.32 0 0 0 21 19.7V4.3A1.32 1.32 0 0 0 19.67 3Z"
      fill="currentColor"
    />
  </svg>
</template>
