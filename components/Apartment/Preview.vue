<script lang="ts" setup>
import { type Tags } from "@/data/tags";
import { getFlatImageUrl } from "~/utils/flat";
import { formatPrice } from "~/utils/util";

const props = defineProps<{
  id: string;
  title: string;
  address: {
    street: string;
    postalCode: string;
    streetNumber: string;
  };
  coldRentPrice: number | null;
  warmRentPrice: number | null;
  imageSrc: string | null;
  tags: Tags;
  usableArea: number | null;
  url: string;
  firstSeen: Date;
}>();

const img = getFlatImageUrl({
  id: props.id,
  hasImage: Boolean(props.imageSrc),
});
</script>

<template>
  <div class="flex gap-3">
    <div class="h-full shrink-0">
      <NuxtLink
        :to="url"
        target="_blank"
      >
        <CustomImageLoader
          :src="img"
          :alt="`Vorschaubild ${title}`"
          class="h-16 w-16 rounded-lg"
          :width="64"
          :height="64"
        />
      </NuxtLink>
    </div>
    <div class="flex flex-col gap-1 overflow-hidden">
      <NuxtLink
        :to="url"
        target="_blank"
      >
        <h3
          class="overflow-hidden text-ellipsis whitespace-nowrap text-l leading-5"
        >
          {{ title }}
        </h3>
      </NuxtLink>
      <h4 class="overflow-hidden text-ellipsis text-s font-light">
        {{ address.street }} {{ address.streetNumber }} -
        <ApartmentDistrict
          class="hover:underline"
          :zip-code="address.postalCode"
        />
      </h4>
      <div class="tags-container flex flex-row gap-x-1">
        <ApartmentTag
          v-for="tag in tags"
          :key="tag"
          :tag="tag"
          class="tag py-0.25 rounded-full bg-white px-2.5 text-xs text-accent"
        >
        </ApartmentTag>
      </div>
    </div>
    <div class="flex shrink-0 flex-grow flex-col items-end gap-1">
      <span
        class="price block text-l font-light leading-5"
        v-html="formatPrice(warmRentPrice ?? coldRentPrice, true)"
      ></span>
      <span
        class="block text-s font-light"
        v-html="formatArea(usableArea)"
      ></span>
      <ApartmentFavoriteButton :id="id" />
    </div>
  </div>
</template>
