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

const tableHeaders = {
  // immobilie: "Immobilie",
  coldRentPrice: {
    title: "Preis",
    sortable: true,
  },
  roomCount: {
    title: "Zimmer",
    sortable: true,
  },
  usableArea: {
    title: "Fläche",
    sortable: true,
  },
  coldRentPricePerSquareMeter: {
    title: "Preis pro m²",
    sortable: true,
  },
  zipCode: {
    title: "PLZ",
    sortable: false,
  },
};
</script>
<template>
  <div>
    <table
      class="-mx-4 hidden w-full border-separate border-spacing-4 lg:table"
    >
      <thead
        class="border-collapse border-spacing-0 rounded-xl bg-background p-5"
      >
        <tr class="">
          <th class="-m-4 rounded-xl p-4 font-normal">Immobilie</th>
          <th
            v-for="[headerKey, header] in Object.entries(tableHeaders)"
            :key="headerKey"
            class="-m-4 rounded-xl p-4 font-normal"
          >
            <div class="flex gap-2">
              {{ header.title }}
              <img
                v-if="header.sortable"
                src="/sort_direction.svg"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <DetaillistApartment
          v-for="flat in flats"
          :key="flat.id"
          :room-count="flat.roomCount"
          as="row"
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
      </tbody>
    </table>

    <div class="lg:hidden">
      <h2 class="mb-4 text-xl">Alle Wohnungen</h2>
      <main>
        <DetaillistApartment
          v-for="flat in flats"
          :key="flat.id"
          :room-count="flat.roomCount"
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
  </div>
</template>
