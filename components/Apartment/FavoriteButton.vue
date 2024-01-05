<script setup lang="ts">
const props = defineProps<{
  id: string;
}>();

const isFavoriteShown = ref(false);
const toggleFavorite = () => {
  isFavoriteShown.value = !isFavoriteShown.value;
  console.log(
    `${isFavoriteShown.value ? "Added" : "Removed"} ${props.id} from favorites`,
  );
};
</script>

<template>
  <button
    class="favorites-button inline-block"
    :title="`${
      isFavoriteShown ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'
    }`"
    @click="toggleFavorite"
  >
    <IconHeart
      :filled="isFavoriteShown"
      class="w-5"
    />
  </button>
</template>
