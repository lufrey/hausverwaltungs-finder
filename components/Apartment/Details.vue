<script lang="ts" setup>
import { type Tags } from "@/data/tags";
import { getFlatImageUrl } from "~/utils/flat";
import { formatArea, formatPrice } from "~/utils/util";

const props = withDefaults(
  defineProps<{
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
    roomCount: number | null;
    as?: "row" | "card";
  }>(),
  {
    as: "card",
  },
);
const img = getFlatImageUrl({
  id: props.id,
  hasImage: Boolean(props.imageSrc),
});

const shownPrice = computed(() => props.warmRentPrice ?? props.coldRentPrice);
</script>

<template>
  <tr
    v-if="Boolean(as === 'row')"
    class="text-m font-light leading-5"
  >
    <td class="items-top flex gap-x-2">
      <div class="aspect-square h-full shrink-0">
        <NuxtLink
          :to="url"
          target="_blank"
        >
          <NuxtImg
            :src="img"
            :alt="`Vorschaubild ${title}`"
            class="h-16 w-16 rounded-lg"
            width="64"
            height="64"
            format="avif,webp"
          />
        </NuxtLink>
      </div>
      <div class="max-w-80 overflow-hidden align-top">
        <NuxtLink
          :to="url"
          target="_blank"
        >
          <h3
            class="overflow-hidden text-ellipsis whitespace-nowrap text-left font-normal"
          >
            {{ title }}
          </h3>
        </NuxtLink>
        <div class="flex flex-col gap-x-3 text-left">
          <h4 class="overflow-hidden text-ellipsis text-s font-light">
            {{ address.street }} {{ address.streetNumber }}
          </h4>
          <div class="flex flex-row items-center gap-x-1">
            <ApartmentTag
              v-for="tag in tags"
              :key="tag"
              :tag="tag"
              class="tag py-0.25 rounded-full bg-secondary px-2.5 text-xs text-accent"
            >
            </ApartmentTag>
          </div>
        </div>
      </div>
    </td>
    <td class="align-top">
      <span v-html="formatPrice(shownPrice)"></span>
      <span
        v-if="$props.warmRentPrice"
        class="block text-s opacity-80"
        >Warmmiete</span
      >
    </td>
    <td class="align-top">
      {{ roomCount ?? "-" }}
    </td>
    <td
      class="align-top"
      v-html="formatArea(usableArea)"
    ></td>
    <td
      v-if="shownPrice"
      class="align-top"
    >
      {{
        usableArea
          ? (shownPrice / usableArea).toFixed(2).replace(".", ",") + "&nbsp;€"
          : "-"
      }}
    </td>
    <td
      v-else
      class="align-top"
    >
      -
    </td>
    <td class="break-words align-top">
      <ApartmentDistrict
        class="underline hover:no-underline"
        :zip-code="address.postalCode"
      />
    </td>
    <td class="px-2 align-top">
      <ApartmentFavoriteButton :id="id" />
    </td>
  </tr>
  <!-- TODO: More info on mobile -->
  <div
    v-else
    class="items-top mb-4 flex items-center gap-x-4"
  >
    <div class="aspect-square h-full shrink-0">
      <NuxtLink
        :to="url"
        target="_blank"
      >
        <NuxtImg
          :src="img"
          :alt="`Vorschaubild ${title}`"
          class="h-16 w-16 rounded-lg"
          width="64"
          height="64"
          format="avif,webp"
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
      <h4 class="max-w-40 overflow-hidden text-ellipsis text-s font-light">
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
          class="tag py-0.25 rounded-full bg-secondary px-2.5 text-xs text-accent"
        >
        </ApartmentTag>
      </div>
    </div>
    <div class="flex shrink-0 flex-grow flex-col items-end gap-1">
      <span
        class="price block text-l font-light leading-5"
        v-html="formatPrice(shownPrice)"
      ></span>
      <span
        class="block text-s font-light"
        v-html="formatArea(usableArea)"
      ></span>
      <ApartmentFavoriteButton :id="id" />
    </div>
  </div>
</template>
