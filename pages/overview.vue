<script setup lang="ts">
import type { Tags } from "~/data/tags";
useHead({
  title: "Alle Wohnungen",
});
const { $client } = useNuxtApp();
const { urlStateWithArrayValues, updateQueryState } = useUrlState<{
  tags: Tags;
  propertyManagements: string[];
}>();

const flatsQuery = await $client.flat.getAll.useQuery(urlStateWithArrayValues);
const flats = flatsQuery.data ?? [];
</script>
<template>
  <div class="">
    <nav class="mb-6 rounded-xl bg-background p-5">
      <ul class="flex justify-between gap-x-11">
        <li class="grow-[2]">Immobilie</li>
        <li class="flex grow-0 gap-x-2">
          <span>Preis</span><img src="/sort_direction.svg" />
        </li>
        <li class="flex grow-0 gap-x-2">
          <span>Zimmer</span><img src="/sort_direction.svg" />
        </li>
        <li class="flex grow-0 gap-x-2">
          <span>Fläche</span><img src="/sort_direction.svg" />
        </li>
        <li class="flex grow-0 gap-x-2">
          <span>Preis/m²</span><img src="/sort_direction.svg" />
        </li>
        <li class="flex grow gap-x-2">
          <span>Bezirk</span><img src="/sort_direction.svg" />
        </li>
      </ul>
    </nav>
    <main>
      <DetaillistApartment
        v-for="flat in flats"
        :key="flat.id"
        :title="flat.title"
        :address="flat.address!"
        :cold-rent-price="flat.coldRentPrice"
        :tags="flat.tags"
        :favorite="false"
        :usable-area="flat.usableArea"
        :image-src="flat.hasImage ? `/api/image/${flat.id}` : null"
        :url="flat.url"
        :first-seen="new Date(flat.firstSeen)"
      />
    </main>
  </div>
</template>
