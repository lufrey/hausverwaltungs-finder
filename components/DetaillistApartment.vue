<script lang="ts" setup>
import { type Tags } from "@/data/tags";
import { countsAsNew } from "~/utils/util";
const props = defineProps<{
  title: string;
  address: {
    street: string;
    postalCode: string;
    streetNumber: string;
  };
  coldRentPrice: number;
  imageSrc: string | null;
  tags: Tags;
  usableArea: number | null;
  favorite: boolean;
  url: string;
  firstSeen: Date;
}>();

const isFavoriteShown = ref(props.favorite);
const toggleFavorite = () => {
  isFavoriteShown.value = !isFavoriteShown.value;
};
const origin = useRequestURL().origin;

const renderedTags = computed(() => {
  const tags = [...props.tags];
  if (countsAsNew(props.firstSeen)) {
    tags.push("new");
  }
  return tags;
});
</script>

<template>
  <div class="mb-4 flex items-center justify-between gap-x-11">
    <div class="flex grow-[2] items-center gap-x-2">
      <div class="aspect-square h-full shrink-0">
        <NuxtImg
          :src="imageSrc ? origin + imageSrc : '/apartment_example_image.png'"
          alt="Property Image"
          class="h-16 w-16 rounded-lg"
          format="webp"
        />
      </div>
      <div class="flex flex-col overflow-hidden">
        <NuxtLink
          :to="url"
          target="_blank"
        >
          <h3
            class="overflow-hidden text-ellipsis whitespace-nowrap text-m leading-5"
          >
            {{ title }}
          </h3>
        </NuxtLink>
        <div class="flex gap-x-3">
          <h4 class="overflow-hidden text-ellipsis text-s font-light">
            {{ address.street }} {{ address.streetNumber }}
          </h4>
          <div class="flex flex-row items-center gap-x-1">
            <Tag
              v-for="tag in renderedTags"
              :key="tag"
              :tag="tag"
              class="tag py-0.25 rounded-full bg-secondary px-2.5 text-xs text-accent"
            >
            </Tag>
          </div>
        </div>
      </div>
    </div>
    <span class="block grow-0 text-m font-light leading-5">
      {{ coldRentPrice }} €
    </span>
    <span class="block grow-0 text-m font-light leading-5">
      <!-- {{ tags.rooms }} -->
      4
    </span>
    <span class="block grow-0 text-m font-light leading-5">
      {{ usableArea }} m²
    </span>
    <span class="block grow-0 text-m font-light leading-5">
      {{
        usableArea
          ? (coldRentPrice / usableArea).toFixed(2).replace(".", ",") + " €"
          : "-"
      }}
    </span>
    <span class="block grow text-m font-light leading-5">
      {{ address.postalCode }}</span
    >
    <button
      class="inline-block"
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
  </div>
</template>
