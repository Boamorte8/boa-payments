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
    <g id="LinkedIn">
      <path id="Path_9" data-name="Path 9" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_10"
        data-name="Path 10"
        d="M18.335,18.339H15.67V14.162c0-1-.02-2.278-1.39-2.278-1.389,0-1.6,1.084-1.6,2.2v4.25H10.013V9.75h2.56v1.17h.035a2.812,2.812,0,0,1,2.528-1.387c2.7,0,3.2,1.778,3.2,4.091v4.715ZM7,8.575A1.548,1.548,0,1,1,8.551,7.028,1.546,1.546,0,0,1,7,8.575Zm1.336,9.764H5.666V9.75H8.34v8.589ZM19.67,3H4.329A1.312,1.312,0,0,0,3,4.3V19.7A1.312,1.312,0,0,0,4.328,21H19.666A1.317,1.317,0,0,0,21,19.7V4.3A1.317,1.317,0,0,0,19.666,3h0Z"
        fill="currentColor"
      />
    </g>
  </svg>
</template>
