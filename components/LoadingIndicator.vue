<script setup lang="ts">
const { isLoading } = useLoadingIndicator();
</script>

<template>
  <div
    class="fixed z-30 h-1 w-full opacity-0 transition-opacity duration-500"
    :class="{
      'opacity-100': isLoading,
    }"
  >
    <div class="h-full w-full animate-pulse bg-accent"></div>
  </div>
</template>
