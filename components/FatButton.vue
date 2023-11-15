<template>
  <NuxtLink
    v-if="href"
    :to="href"
    class="rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary shadow-accent transition-shadow duration-200 hover:shadow-accentHover"
  >
    <slot></slot>
  </NuxtLink>
  <button
    v-else
    class="rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary shadow-accent transition-shadow duration-200 hover:shadow-accentHover"
    @click="action"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  action?: () => void;
  href?: string;
}>();
defineEmits(["submit"]);
</script>
