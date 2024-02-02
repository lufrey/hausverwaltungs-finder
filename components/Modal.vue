<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  onClose: () => void;
}>();
const modalElement = ref<HTMLElement | null>(null);
const handleClickOutside = (event: MouseEvent) => {
  if (
    modalElement.value &&
    event.target instanceof Element &&
    !modalElement?.value.contains(event.target) &&
    !event.target.closest(".bubble")
  ) {
    props.onClose();
  }
};
watchEffect(() => {
  if (props.open) {
    setTimeout(() => {
      document?.addEventListener("click", handleClickOutside);
    }, 1);
  } else {
    document?.removeEventListener("click", handleClickOutside);
  }
});
onUnmounted(() => {
  document?.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <div
    v-if="open"
    ref="modalElement"
  >
    <slot />
  </div>
</template>
