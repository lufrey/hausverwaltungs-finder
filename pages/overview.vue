<script setup lang="ts">
useHead({
  title: "Alle Wohnungen",
});
const { $client } = useNuxtApp();
const { urlState } = useFlatFilterUrlState();

const flatsQuery = await $client.flat.getAll.useQuery(urlState);
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
    <Filters />
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

    <div class="lg:hidden">
      <h2 class="mb-4 text-xl">
        {{ countText }}
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
    <div class="w-full rounded-xl bg-background p-4">
      <Pagination
        :total-elements-count="flats?.totalElementsCount ?? 0"
        :filtered-elements-count="flats?.filteredElementsCount ?? 0"
        :current-page="urlState.page ? urlState.page[0] : 1"
        :page-size="urlState.pageSize ? urlState.pageSize[0] : 25"
      />
    </div>
  </div>
</template>
