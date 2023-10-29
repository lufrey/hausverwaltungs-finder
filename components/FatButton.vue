<template>
  <NuxtLink
    v-if="href"
    :to="href"
    class="hover:shadow-accentHover absolute -bottom-5 -right-10 rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary shadow-accent transition-shadow duration-200"
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
    class="hover:shadow-accentHover absolute -bottom-5 -right-10 rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary shadow-accent transition-shadow duration-200"
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
}>();
defineEmits(["submit"]);
</script>
