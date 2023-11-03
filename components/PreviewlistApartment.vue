<script lang="ts" setup>
const props = defineProps<{
  title: string;
  address: {
    street: string;
    postalCode: string;
    streetNumber: string;
  };
  coldRentPrice: number;
  imageSrc: string | null;
  tags: string[];
  usableArea: number | null;
  favorite: boolean;
  url: string;
}>();

const isFavoriteShown = ref(props.favorite);
const toggleFavorite = () => {
  isFavoriteShown.value = !isFavoriteShown.value;
};
const origin = useRequestURL().origin;
</script>

<template>
  <div class="flex gap-2">
    <div class="aspect-square h-full shrink-0">
      <!-- TODO: Replace with nuxt/image -->
      <NuxtImg
        :src="imageSrc ? origin + imageSrc : '/apartment_example_image.png'"
        alt="Property Image"
        class="h-16 w-16 rounded-lg"
        format="webp"
      />
    </div>
    <div class="flex flex-col gap-1 overflow-hidden">
      <NuxtLink
        class="flex flex-col gap-1"
        :to="url"
        target="_blank"
      >
        <h3
          class="overflow-hidden text-ellipsis whitespace-nowrap text-l leading-5"
        >
          {{ title }}
        </h3>
        <h4 class="overflow-hidden text-ellipsis text-s font-light">
          {{ address.street }} {{ address.streetNumber }} -
          {{ address.postalCode }}
        </h4>
      </NuxtLink>
      <div class="tags-container flex flex-row gap-x-1">
        <span
          v-for="tag in tags as string[]"
          :key="tag"
          class="tag py-0.25 rounded-full bg-white px-2.5 text-xs text-accent"
          >{{ tag }}</span
        >
      </div>
    </div>
    <div class="flex shrink-0 flex-grow flex-col items-end gap-1">
      <span class="price block text-l font-light leading-5"
        >{{ coldRentPrice }} €</span
      >
      <span class="square-footage block text-s font-light"
        >{{ usableArea }} m²</span
      >
      <button
        class="favorites-button inline-block"
        :title="`${
          isFavoriteShown
            ? 'Aus Favoriten entfernen'
            : 'Zu Favoriten hinzufügen'
        }`"
        @click="toggleFavorite"
      >
        <IconHeart
          :filled="isFavoriteShown"
          class="w-5"
        />
      </button>
    </div>
  </div>
</template>
