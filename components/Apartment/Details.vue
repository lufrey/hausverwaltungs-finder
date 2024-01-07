<script lang="ts" setup>
import { type Tags } from "@/data/tags";

const props = withDefaults(
  defineProps<{
    id: string;
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
    url: string;
    firstSeen: Date;
    roomCount: number | null;
    as?: "row" | "card";
  }>(),
  {
    as: "card",
  },
);

const { renderedTags, img } = useApartment(props);
</script>

<template>
  <tr
    v-if="Boolean(as === 'row')"
    class="text-m font-light leading-5"
  >
    <td>
      <div class="flex grow-[2] items-center gap-x-2">
        <div class="aspect-square h-full shrink-0">
          <NuxtImg
            :src="img"
            alt="Property Image"
            class="h-16 w-16 rounded-lg"
            format="webp"
          />
        </div>
        <div class="flex max-w-sm flex-col overflow-hidden">
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
          <div class="flex gap-x-3">
            <h4 class="overflow-hidden text-ellipsis text-s font-light">
              {{ address.street }} {{ address.streetNumber }}
            </h4>
            <div class="flex flex-row items-center gap-x-1">
              <ApartmentTag
                v-for="tag in renderedTags"
                :key="tag"
                :tag="tag"
                class="tag py-0.25 rounded-full bg-secondary px-2.5 text-xs text-accent"
              >
              </ApartmentTag>
            </div>
          </div>
        </div>
      </div>
    </td>
    <td>{{ coldRentPrice }} €</td>
    <td>
      {{ roomCount ?? "-" }}
    </td>
    <td>{{ usableArea === 0 ? "-" : usableArea + " m²" }}</td>
    <td>
      {{
        usableArea
          ? (coldRentPrice / usableArea).toFixed(2).replace(".", ",") + " €/m²"
          : "-"
      }}
    </td>
    <td>{{ address.postalCode }}</td>
    <td>
      <ApartmentFavoriteButton :id="id" />
    </td>
  </tr>
  <!-- TODO: More info on mobile -->
  <div
    v-else
    class="items-top mb-4 flex items-center gap-x-4"
  >
    <div class="aspect-square h-full shrink-0">
      <NuxtImg
        :src="img"
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
        <ApartmentTag
          v-for="tag in renderedTags"
          :key="tag"
          :tag="tag"
          class="tag py-0.25 rounded-full bg-secondary px-2.5 text-xs text-accent"
        >
        </ApartmentTag>
      </div>
    </div>
    <div class="flex shrink-0 flex-grow flex-col items-end gap-1">
      <span class="price block text-l font-light leading-5"
        >{{ coldRentPrice }} €</span
      >
      <span class="square-footage block text-s font-light"
        >{{ usableArea }} m²</span
      >
      <ApartmentFavoriteButton :id="id" />
    </div>
  </div>
</template>
