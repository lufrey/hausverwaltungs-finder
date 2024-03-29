<script setup lang="ts">
useHead({
  title: "Alle Wohnungen",
});
const { $client } = useNuxtApp();
const { urlState, updateQueryState } = useFlatFilterUrlState();
const { registerLoadingRef, unregisterLoadingRef } =
  useCustomLoadingIndicator();

const flatsQuery = await $client.flat.getAll.useQuery(urlState);
const flats = flatsQuery.data ?? [];
onMounted(() => {
  registerLoadingRef(flatsQuery.status, (status) => status.value === "pending");
});

watch(flats, () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

onUnmounted(() => unregisterLoadingRef(flatsQuery.status));

const sortOptions = flatFilterUrlSchema.shape.orderBy.unwrap().unwrap()
  .element.options;

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

const tableHeaders = computed(
  () =>
    ({
      main: {
        title: countText.value,
        class: "w-[30%] rounded-l-xl px-4 text-left",
      },
      price: {
        title: "Preis (kalt)",
      },
      roomCount: {
        title: "Zimmer",
        class: "w-[10%]",
      },
      usableArea: {
        title: "Fläche",
      },
      rentPricePerSquareMeter: {
        title: "€/m²",
      },
      district: {
        title: "Bezirk",
        class: "w-[20%]",
      },
      favorite: {
        title: "",
        class: "w-[5%]",
      },
    }) as Record<string, { title: string; class?: string }>,
);

const sortOrders = computed(() => {
  return Object.entries(tableHeaders.value).reduce(
    (acc, [key]) => {
      if (!urlState.value.orderBy?.[0] && key === "main") {
        return {
          ...acc,
          [key]: urlState.value.order?.[0] ?? "desc",
        };
      }

      return {
        ...acc,
        [key]:
          urlState.value.orderBy?.[0] === key
            ? urlState.value.order?.[0]
            : undefined,
      };
    },
    {} as Record<string, "asc" | "desc" | undefined>,
  );
});
</script>
<template>
  <div>
    <Filters />
    <div v-if="!flats?.data?.length">
      <h2 class="mt-4 text-xl">
        Es wurden keine Wohnungen gefunden
        <span class="whitespace-nowrap">:(</span>
      </h2>
      <p class="mt-4 text-l text-accent">
        Versuche es mit anderen Filtern oder schau später nochmal vorbei!
      </p>
    </div>
    <div v-else>
      <table
        class="hidden w-full table-fixed border-separate border-spacing-y-4 text-center lg:table"
      >
        <thead class="bg-background">
          <tr>
            <th
              v-for="[headerKey, header] in Object.entries(tableHeaders)"
              :key="headerKey"
              class="text-nowrap px-2 py-4 font-medium first:rounded-l-xl last:rounded-r-xl"
              :class="header.class"
            >
              <button
                v-if="sortOptions.includes(headerKey) || headerKey === 'main'"
                class="group m-auto flex items-center gap-1"
                @click="
                  () => {
                    updateQueryState({
                      orderBy: [headerKey as (typeof sortOptions)[number]],
                      order: [sortOrders[headerKey] === 'asc' ? 'desc' : 'asc'],
                    });
                  }
                "
                @mouseenter="
                  (e) => {
                    // @ts-ignore
                    const icon = e.target?.querySelector('lord-icon');
                    if (icon.playerInstance) {
                      !icon.playerInstance.isPlaying &&
                        icon.playerInstance.playFromBeginning();
                    }
                  }
                "
              >
                {{ header.title }}
                <lord-icon
                  src="/icons/arrow.json"
                  state="hover-ternd-flat-3"
                  class="-mr-[20px] -rotate-90 transition-all duration-500"
                  :class="{
                    'opacity-0': sortOrders[headerKey] === undefined,
                    'group-hover:opacity-50':
                      sortOrders[headerKey] === undefined,
                    '-scale-x-100': sortOrders[headerKey] === 'desc',
                  }"
                  style="width: 20px; height: 20px"
                />
              </button>
              <div v-else>
                {{ header.title }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
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
        <div class="flex flex-wrap gap-4">
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
        </div>
      </div>
      <div class="mt-8 w-full rounded-xl bg-background p-4">
        <Pagination
          :total-elements-count="flats?.totalElementsCount ?? 0"
          :filtered-elements-count="flats?.filteredElementsCount ?? 0"
          :current-page="urlState.page ? urlState.page[0] : 1"
          :page-size="urlState.pageSize ? urlState.pageSize[0] : 25"
        />
      </div>
    </div>
  </div>
</template>
