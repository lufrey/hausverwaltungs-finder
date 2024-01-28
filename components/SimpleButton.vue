<script setup lang="ts">
const props = defineProps<{
  color?: "default" | "accent";
}>();
let colorClasses = "border border-black hover:bg-black hover:text-white";
switch (props.color) {
  case "accent":
    colorClasses =
      "border border-accent hover:bg-accent hover:text-white text-primary";
    break;
}
</script>

<template>
  <button
    :class="
      'duration-250 rounded-md px-4 py-2 transition-colors ' + colorClasses
    "
  >
    <slot />
  </button>
</template>
