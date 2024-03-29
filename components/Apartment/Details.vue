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
          <CustomImageLoader
            :src="img"
            :alt="`Vorschaubild ${title}`"
            class="h-16 w-16 rounded-lg"
            :width="64"
            :height="64"
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

  <!---------- MOBILE ------------>
  <div
    v-else
    class="items-top flex min-w-80 flex-1 flex-col gap-y-4 rounded-md bg-slate-200 p-3"
  >
    <div class="flex gap-x-4">
      <NuxtLink
        :to="url"
        target="_blank"
        class="shrink-0"
      >
        <CustomImageLoader
          :src="img"
          :alt="`Vorschaubild ${title}`"
          class="h-16 w-16 rounded-lg"
          :width="64"
          :height="64"
          format="avif,webp"
        />
      </NuxtLink>
      <div class="flex flex-col justify-between">
        <NuxtLink
          :to="url"
          target="_blank"
        >
          <h3 class="line-clamp-2 text-ellipsis text-m leading-5">
            {{ title }}
          </h3>
        </NuxtLink>
        <h4 class="line-clamp-1 text-ellipsis text-s font-light">
          {{ address.street }} {{ address.streetNumber }} -
          <ApartmentDistrict
            class="hover:underline"
            :zip-code="address.postalCode"
          />
        </h4>
      </div>
    </div>
    <div
      class="flex justify-between border-y border-y-black border-opacity-30 py-4 text-m font-light"
    >
      <span v-html="formatPrice(shownPrice)"></span>
      <span class="opacity-40">|</span>
      <span v-if="roomCount && roomCount > 1">{{ roomCount }} Zimmer</span>
      <span
        v-if="roomCount && roomCount > 1"
        class="opacity-40"
        >|</span
      >
      <span v-html="formatArea(usableArea)"></span>
      <span class="opacity-40">|</span>
      <ApartmentFavoriteButton :id="id" />
    </div>
    <div class="flex justify-between overflow-hidden">
      <div class="tags-container flex flex-row gap-x-1">
        <ApartmentTag
          v-for="tag in tags"
          :key="tag"
          :tag="tag"
          class="tag py-0.25 rounded-full bg-secondary px-2.5 text-xs text-accent"
        >
        </ApartmentTag>
      </div>
      <StyledNuxtLink
        :to="url"
        class="text-s"
      >
        Zur Wohnung
      </StyledNuxtLink>
    </div>
  </div>
</template>
