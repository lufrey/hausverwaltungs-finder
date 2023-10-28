<script lang="ts" setup>
defineProps({
  filled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "#A555A2",
  },
});
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.98 20.32"
  >
    <path
      class="d"
      :fill="filled ? color : 'none'"
      :stroke="filled ? color : 'black'"
      stroke-miterlimit="10"
      stroke-width="2"
      d="m10.99,18.99l-1.45-1.29C4.39,13.11.99,10.08.99,6.39.99,3.35,3.41.99,6.49.99c1.74,0,3.41.79,4.5,2.04,1.09-1.25,2.76-2.04,4.5-2.04,3.08,0,5.5,2.36,5.5,5.4,0,3.7-3.4,6.73-8.55,11.31l-1.45,1.29Z"
    />
    />
  </svg>
</template>
