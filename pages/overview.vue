<script setup lang="ts">
import type { Tags } from "~/data/tags";
useHead({
  title: "Alle Wohnungen",
});
const { $client } = useNuxtApp();
const { urlStateWithArrayValues } = useUrlState<{
  tags: Tags;
  propertyManagements: string[];
}>();

const flatsQuery = await $client.flat.getAll.useQuery(urlStateWithArrayValues);
const flats = flatsQuery.data ?? [];
</script>
<template>
  <div
    class="apartmentlist relative mb-6 flex flex-col gap-4 rounded-3xl bg-background p-5"
  >
    <PreviewlistApartment
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
  </div>
</template>
