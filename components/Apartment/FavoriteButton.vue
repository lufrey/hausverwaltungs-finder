<script setup lang="ts">
const props = defineProps<{
  id: string;
}>();

const { isFavorite, toggle } = useFavorite(props.id);
</script>

<template>
  <button
    class="favorites-button inline-block"
    :title="`${
      isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'
    }`"
    @click="() => toggle()"
  >
    <ClientOnly>
      <IconHeart
        :filled="isFavorite"
        class="w-5"
      />
      <template #fallback>
        <IconHeart
          :filled="false"
          class="w-5"
        />
      </template>
    </ClientOnly>
  </button>
</template>
