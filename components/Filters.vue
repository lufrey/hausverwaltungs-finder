<script setup lang="ts">
import { tags } from "~/data/tags";
import { berlinDistricts } from "~/data/districts";
const { updateQueryState, urlState } = useFlatFilterUrlState();
const modalOpen = ref(false);

const modalPreferences = reactive({
  priceMin: null,
  priceMax: null,
  roomsMin: null,
  roomsMax: null,
  areaMin: null,
  areaMax: null,
} as Record<
  "priceMin" | "priceMax" | "roomsMin" | "roomsMax" | "areaMin" | "areaMax",
  number | null
>);

const activeTags = reactive({} as Record<keyof typeof tags, string | null>);
const activeDistricts = reactive(
  {} as Record<keyof typeof berlinDistricts, string | null>,
);

interface Metadata {
  [key: string]: {
    min: number;
    max: number;
    unit: string;
  };
}

const filterMetadata: Metadata = {
  price: { min: 100, max: 10000, unit: "€" },
  rooms: { min: 1, max: 10, unit: "Zimmer" },
  area: { min: 1, max: 1000, unit: "m²" },
};

watch(urlState, () => {
  syncStateWithUrl();
});

const syncStateWithUrl = () => {
  for (const key of typedObjectKeys(modalPreferences)) {
    modalPreferences[key] = urlState.value[key]?.[0] ?? null;
  }
  for (const key of typedObjectKeys(tags)) {
    activeTags[key] = urlState.value.tags?.includes(key) ? tags[key] : null;
  }
  for (const key of typedObjectKeys(berlinDistricts)) {
    activeDistricts[key] = urlState.value.districts?.includes(key)
      ? berlinDistricts[key].name
      : null;
  }
};

syncStateWithUrl();

const getFilterMetadata = (key: string) => {
  for (const [metaKey, meta] of Object.entries(filterMetadata)) {
    if (key.startsWith(metaKey)) {
      return meta;
    }
  }
  return null;
};

const getLimitByKeyName = (keyName: string) => {
  if (keyName.toLowerCase().includes("min")) {
    return "≥";
  } else if (keyName.toLowerCase().includes("max")) {
    return "≤";
  } else {
    return "";
  }
};

const createFilter = (
  value: number | string,
  unit: string,
  lessOrMore: string,
) => {
  if (value) {
    return `${lessOrMore} ${value} ${unit}`;
  }
  return null;
};

const uiFilters = computed(() => {
  const filters: any[] = [];

  for (const [key, value] of Object.entries(modalPreferences)) {
    if (value) {
      const filter = createFilter(
        value,
        getFilterMetadata(key)?.unit ?? "",
        getLimitByKeyName(key),
      );
      filters.push({ filter, id: key });
    }
  }

  for (const [key, value] of Object.entries(activeTags)) {
    if (value) {
      filters.push({ filter: value, id: key });
    }
  }

  for (const [key, value] of Object.entries(activeDistricts)) {
    if (value) {
      filters.push({ filter: value, id: key });
    }
  }

  return filters;
});

const applyFilters = () => {
  modalOpen.value = false;

  const query: Record<string, number | number[] | string[] | null | string> =
    {};

  for (const [key, value] of Object.entries(modalPreferences)) {
    if (typeof value === "number" && filterMetadata[key]) {
      query[key] = Math.min(
        Math.max(value, filterMetadata[key].min),
        filterMetadata[key].max,
      );
    }
    query[key] = value ? [value] : null;
  }

  for (const [key, value] of Object.entries(activeTags)) {
    query[key] = value ? [value] : null;
  }

  for (const [key, value] of Object.entries(activeDistricts)) {
    query[key] = value ? [value] : null;
  }

  updateQueryState(query);
};

const tagsSuggestions = Object.entries(tags).map(([id, title]) => ({
  id,
  title,
}));
const districtSuggestions = Object.entries(berlinDistricts).map(
  ([id, { name }]) => ({
    id,
    title: name,
  }),
);
</script>

<template>
  <div class="relative mb-4 flex gap-2 overflow-x-visible">
    <button
      class="text-nowrap rounded-xl border-2 border-accent px-4 py-2"
      @click="modalOpen = !modalOpen"
    >
      Filter ▼
    </button>
    <Modal
      :open="modalOpen"
      :on-close="() => (modalOpen = false)"
      class="absolute top-12 z-20 flex w-96 flex-col gap-4 rounded-xl border border-black bg-white p-4 shadow-xl"
    >
      <div>
        <strong>Preis (€)</strong>
        <div class="flex items-center justify-between gap-2">
          <input
            v-model="modalPreferences.priceMin"
            type="number"
            class="w-36 rounded-md border-2 border-accent px-4 py-2"
            :placeholder="'min. ' + filterMetadata.price.min.toLocaleString()"
            :min="filterMetadata.price.min"
            :max="filterMetadata.price.max"
          />
          <span>-</span>
          <input
            v-model="modalPreferences.priceMax"
            type="number"
            class="w-36 rounded-md border-2 border-accent px-4 py-2"
            :placeholder="'max. ' + filterMetadata.price.max.toLocaleString()"
            :min="filterMetadata.price.min"
            :max="filterMetadata.price.max"
          />
        </div>
      </div>
      <div>
        <strong>Zimmer</strong>
        <div class="flex items-center justify-between gap-2">
          <input
            v-model="modalPreferences.roomsMin"
            type="number"
            class="w-36 rounded-md border-2 border-accent px-4 py-2"
            :placeholder="'min. ' + filterMetadata.rooms.min.toLocaleString()"
            :min="filterMetadata.rooms.min"
            :max="filterMetadata.rooms.max"
          />
          <span>-</span>
          <input
            v-model="modalPreferences.roomsMax"
            type="number"
            class="w-36 rounded-md border-2 border-accent px-4 py-2"
            :placeholder="'max. ' + filterMetadata.rooms.max.toLocaleString()"
            :min="filterMetadata.rooms.min"
            :max="filterMetadata.rooms.max"
          />
        </div>
      </div>
      <div>
        <strong>Fläche (m²)</strong>
        <div class="flex items-center justify-between gap-2">
          <input
            v-model="modalPreferences.areaMin"
            type="number"
            class="w-36 rounded-md border-2 border-accent px-4 py-2"
            :placeholder="'min. ' + filterMetadata.area.min.toLocaleString()"
            :min="filterMetadata.area.min"
            :max="filterMetadata.area.max"
          />
          <span>-</span>
          <input
            v-model="modalPreferences.areaMax"
            type="number"
            class="w-36 rounded-md border-2 border-accent px-4 py-2"
            :placeholder="'max. ' + filterMetadata.area.max.toLocaleString()"
            :min="filterMetadata.area.min"
            :max="filterMetadata.area.max"
          />
        </div>
      </div>
      <div>
        <strong>Bezirk</strong>
        <div class="flex items-center gap-2">
          <TextFieldWithAutocomplete
            v-model="activeDistricts"
            :suggestions="districtSuggestions"
          />
        </div>
      </div>
      <div>
        <strong>Tags</strong>
        <div class="flex items-center gap-2">
          <TextFieldWithAutocomplete
            v-model="activeTags"
            :suggestions="tagsSuggestions"
          />
        </div>
      </div>
      <button
        class="rounded-md bg-accent px-4 py-2 text-m text-white"
        @click="applyFilters"
      >
        Anwenden
      </button>
    </Modal>
    <div class="scrollbar-hide flex gap-2 overflow-y-scroll whitespace-nowrap">
      <div
        v-for="filterObj in uiFilters"
        :key="filterObj.filter"
        class="text-nowrap rounded-full border-accent bg-secondary px-4 py-2"
      >
        {{ filterObj.filter }}
        <span
          class="ml-2 cursor-pointer text-accent"
          @click="updateQueryState({ [filterObj.id]: undefined })"
          >x</span
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
