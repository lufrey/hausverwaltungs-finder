<template>
  <NuxtLink
    v-if="href"
    :to="disabled ? '' : href"
    class="absolute -bottom-5 -right-10 rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary shadow-accent transition-shadow duration-200 hover:shadow-accentHover"
    :class="disabled ? 'cursor-not-allowed hover:shadow-accent' : ''"
  >
    {{ buttonText }}
    <img
      src="/arrow_right.svg"
      alt=""
      class="ml-4 inline"
    />
  </NuxtLink>
  <button
    v-else
    class="absolute -bottom-5 -right-10 rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary shadow-accent transition-shadow duration-200 hover:shadow-accentHover"
    :class="disabled ? 'cursor-not-allowed hover:shadow-accent' : ''"
    :disabled="disabled"
    @click="$emit('submit', action)"
  >
    {{ buttonText }}
    <img
      src="/arrow_right.svg"
      alt=""
      class="ml-4 inline"
    />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  buttonText: string;
  action?: () => void;
  href?: string;
  disabled?: boolean;
}>();
defineEmits(["submit"]);
</script>
