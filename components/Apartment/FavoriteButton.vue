<script setup lang="ts">
const props = defineProps<{
  id: string;
}>();

const { isFavorite, toggle } = useFavorite(props.id);
const icon = ref<null | Element>(null);

watch(isFavorite, (newValue) => {
  const playerInstance = (icon.value as any)?.playerInstance;
  if (!playerInstance) return;
  playerInstance.direction = newValue ? 1 : -1;
  playerInstance.play();
});

onMounted(async () => {
  await nextTick();
  if (icon.value instanceof Element)
    icon.value.addEventListener("ready", () => {
      const playerInstance = (icon.value as any)?.playerInstance;
      if (playerInstance) playerInstance.goToLastFrame();
    });
});
</script>

<template>
  <ClientOnly>
    <button
      class="inline-block"
      :title="`${
        isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'
      }`"
      @click="() => toggle()"
    >
      <span
        class="flex transition-colors delay-200 duration-300"
        :class="{
          'text-accent': isFavorite,
          'text-black': !isFavorite,
        }"
      >
        <lord-icon
          ref="icon"
          src="https://cdn.lordicon.com/xyboiuok.json"
          state="morph-heart"
          class="current-color -m-1"
          style="width: 28px; height: 28px"
      /></span>
    </button>
    <template #fallback>
      <span class="current-color -m-1">
        <svg
          width="28"
          height="28"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5399 12.5799L12.4999 19.7499L5.42993 12.5499C3.83993 10.9399 3.84993 8.06994 5.44993 6.46994C7.04993 4.86994 9.65993 4.85994 11.2699 6.44994L11.3099 6.48994C11.7299 6.90994 12.0399 7.40994 12.2299 7.93994C12.4199 8.39994 12.4999 8.54994 12.4999 8.54994C12.4999 8.54994 12.5799 8.40994 12.7599 7.93994C12.9699 7.39994 13.2799 6.89994 13.7099 6.45994C15.3199 4.84994 17.9399 4.84994 19.5499 6.45994C21.1599 8.06994 21.1599 10.9499 19.5499 12.5599L19.5399 12.5799Z"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </template>
  </ClientOnly>
</template>
