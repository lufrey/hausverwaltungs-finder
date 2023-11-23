<script setup lang="ts">
useHead({
  title: "Karte",
});
definePageMeta({
  pageTransition: {
    name: "rotate",
  },
});
</script>
<template>
  <div>
    <div>Main Map view</div>
    <NuxtLink to="/">Go back</NuxtLink>
  </div>
</template>
