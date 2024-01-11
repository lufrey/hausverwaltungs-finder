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
  page: string;
  pageSize: string;
}>();

// @ts-ignore TODO: self healing url params with schema
const flatsQuery = await $client.flat.getAll.useQuery(urlStateWithArrayValues);

const flats = flatsQuery.data ?? [];

const tableHeaders = {
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

const countText = computed(() => {
  const total = flatsQuery.data?.value?.totalElementsCount ?? 0;
  const filtered = flatsQuery.data?.value?.filteredElementsCount ?? 0;
  if (filtered === 0) {
    return "Keine Wohnungen";
  }
  if (filtered === total) {
    return `Alle Wohnungen (${total})`;
  }
  return `Wohnungen (${filtered} von ${total})`;
});
</script>
<template>
  <div>
    <table class="hidden w-full lg:table">
      <thead class="bg-background">
        <tr class="">
          <th class="-m-4 rounded-l-xl p-4 font-medium">
            {{ countText }}
          </th>
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
          v-for="flat in flats?.data"
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

    <div
      colspan="100"
      class="w-full rounded-xl bg-background p-4"
    >
      <Pagination
        :total-elements-count="flats?.totalElementsCount ?? 0"
        :filtered-elements-count="flats?.filteredElementsCount ?? 0"
        :current-page="
          urlStateWithArrayValues.page
            ? Number(urlStateWithArrayValues.page)
            : 1
        "
        :page-size="
          urlStateWithArrayValues.pageSize
            ? Number(urlStateWithArrayValues.pageSize)
            : 25
        "
      />
    </div>

    <div class="lg:hidden">
      <h2 class="mb-4 text-xl">
        Alle Wohnungen ({{ flats?.data.length ?? 0 }})
      </h2>
      <main>
        <ApartmentDetails
          v-for="flat in flats?.data"
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
