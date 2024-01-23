<script setup lang="ts">
defineProps<{
  onClick?: () => void;
}>();
</script>
<template>
  <div
    class="flex w-8 cursor-pointer flex-col gap-1.5 transition-all hover:gap-2 md:hidden"
    @click="onClick"
  >
    <span class="h-0.5 w-full rounded-full bg-accent"></span>
    <span class="h-0.5 w-full rounded-full bg-accent"></span>
    <span class="h-0.5 w-full rounded-full bg-accent"></span>
    <span class="h-0.5 w-full rounded-full bg-accent"></span>
  </div>
</template>
