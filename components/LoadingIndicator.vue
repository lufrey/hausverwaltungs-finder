<script setup lang="ts">
const { isLoading } = useLoadingIndicator();
</script>

<template>
  <div
    v-if="isLoading"
    class="fixed z-30 h-1 w-full bg-accent"
    :class="{ 'animate-pulse': isLoading, hidden: !isLoading }"
  ></div>
</template>
