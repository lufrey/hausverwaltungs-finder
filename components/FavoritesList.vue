<script setup lang="ts">
const modalOpen = ref(false);
const icon = ref<HTMLElement | null>(null);
const { favorites } = useFavorites();

watch(modalOpen, (newValue) => {
  const playerInstance = (icon.value as any)?.playerInstance;
  if (!playerInstance) return;
  playerInstance.direction = newValue ? 1 : -1;
  playerInstance.play();
});
</script>
<template>
  <div class="favorites relative cursor-pointer">
    <lord-icon
      ref="icon"
      src="/icons/heart.json"
      state="morph-heart"
      class="hover:animate-zoombounce"
      style="width: 32px; height: 32px"
      @click="() => (modalOpen = true)"
    />
    <ClientOnly>
      <span
        class="top absolute right-0 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[0.5rem] font-bold leading-none text-white"
        ><ClientOnly fallback="0">{{ favorites?.length }}</ClientOnly></span
      >
      <Modal
        :open="modalOpen"
        :on-close="() => (modalOpen = false)"
        class="absolute right-0 top-12 z-20 flex min-w-96 flex-col gap-4 rounded-xl border border-black bg-white p-4 text-primary shadow-xl"
      >
        <div
          v-for="favorite in favorites ?? []"
          :key="favorite.id"
        >
          {{ favorite.title }}
        </div>
      </Modal>
    </ClientOnly>
  </div>
</template>
