<template>
  <NuxtLink
    v-if="href"
    :to="disabled ? '' : href"
    class="rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary shadow-accent transition-shadow duration-200 hover:shadow-accentHover"
    :class="disabled ? 'cursor-not-allowed hover:shadow-accent' : ''"
  >
    <slot></slot>
  </NuxtLink>
  <button
    v-else
    class="rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary shadow-accent transition-shadow duration-200 hover:shadow-accentHover"
    :class="disabled ? 'cursor-not-allowed hover:shadow-accent' : ''"
    :disabled="disabled"
    @click="action"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  action?: () => void;
  href?: string;
  disabled?: boolean;
}>();
defineEmits(["submit"]);
</script>
