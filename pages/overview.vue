<script setup lang="ts">
import type { Tags } from "~/data/tags";
useHead({
  title: "Alle Wohnungen",
});
const { $client } = useNuxtApp();
const { urlStateWithArrayValues } = useUrlState<{
  tags: Tags;
  propertyManagements: string[];
  districts: string[];
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
  district: {
    title: "Bezirk",
    sortable: false,
  },
};
</script>
<template>
  <div>
    <table class="-mx-4 hidden w-full lg:table">
      <thead class="bg-background">
        <tr class="">
          <th class="-m-4 rounded-l-xl p-4 font-medium">Immobilie</th>
          <th
            v-for="[headerKey, header] in Object.entries(tableHeaders)"
            :key="headerKey"
            class="-m-4 p-4 font-medium last:rounded-r-xl"
          >
            <div
              v-if="header.sortable"
              class="flex gap-2"
            >
              {{ header.title }}
              <img src="/sort_direction.svg" />
            </div>
            <div v-else>
              {{ header.title }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <!-- this is necessary for spacing -->
        <tr aria-hidden="true">
          <td class="p-2"></td>
        </tr>
        <ApartmentDetails
          v-for="flat in flats"
          :id="flat.id"
          :key="flat.id"
          :room-count="flat.roomCount"
          as="row"
          :title="flat.title"
          :address="flat.address!"
          :cold-rent-price="flat.coldRentPrice"
          :warm-rent-price="flat.warmRentPrice"
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
        <ApartmentDetails
          v-for="flat in flats"
          :id="flat.id"
          :key="flat.id"
          :room-count="flat.roomCount"
          :title="flat.title"
          :address="flat.address!"
          :cold-rent-price="flat.coldRentPrice"
          :warm-rent-price="flat.warmRentPrice"
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
