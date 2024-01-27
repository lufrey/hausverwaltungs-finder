<script setup lang="ts">
const { isLoading } = useCustomLoadingIndicator();
</script>

<template>
  <div
    class="fixed z-50 h-1 w-full opacity-0 transition-opacity duration-500"
    :class="{
      'opacity-100': isLoading,
    }"
  >
    <div class="h-full w-full animate-pulse bg-accent opacity-0"></div>
  </div>
</template>
