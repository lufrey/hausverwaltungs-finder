<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div>
    <h1 class="p-3 m-7">Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a
      href="https://nuxt.com/docs/getting-started/routing"
      target="_blank"
      >Learn more about Nuxt Routing</a
    >
    <p>
      <a href="/page2">Go to page 2</a>
    </p>
  </div>
</template>
