<script setup lang="ts">
const router = useRouter();
const route = useRoute();

interface Prefs {
  [key: string]: number | null;
}

const modalPreferences: Prefs = reactive({
  priceMin: null,
  priceMax: null,
  roomsMin: null,
  roomsMax: null,
  areaMin: null,
  areaMax: null,
});

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

// Initialize state from URL
// hierdurch funktioniert die buildUrl() irgendwie nicht mehr...
for (const [key, value] of Object.entries(route.query)) {
  if (key in modalPreferences) modalPreferences[key] = Number(value);
}

const getFilterMetadata = (key: string) => {
  for (const [metaKey, meta] of Object.entries(filterMetadata)) {
    if (key.includes(metaKey)) {
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

const createFilter = (value: number, unit: string, lessOrMore: string) => {
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

  return filters;
});

const resetFilter = (filterId: string) => {
  modalPreferences[filterId as keyof typeof modalPreferences] = null;
  buildUrl();
};

const closeModal = () => {
  modalOpen.value = false;
  try {
    document.removeEventListener("click", handleClickOutside);
  } catch (error) {
    // do nothing. Event lister must have been removed already
  }
};

const applyFilters = () => {
  closeModal();

  for (const [key, value] of Object.entries(modalPreferences)) {
    const metadata = getFilterMetadata(key);
    if (value && metadata) {
      value > metadata.max &&
        (modalPreferences[key as keyof typeof modalPreferences] = metadata.max);
      value < metadata.min &&
        (modalPreferences[key as keyof typeof modalPreferences] = metadata.min);
    }
  }
  buildUrl();
};

// gibt es was besseres als einfache funktion die ich jedes mal selbst aufrufen muss wenn sich was ändert?
// watch macht gerade kein Sinn weil es dann vor "Anwenden" button filtert
const buildUrl = () => {
  const query: Record<string, string> = {};

  // Copy existing query parameters
  for (const [key, value] of Object.entries(router.currentRoute.value.query)) {
    query[key] = value as string;
  }

  for (const [key, value] of Object.entries(modalPreferences)) {
    if (value !== null) {
      query[key] = value.toString();
    }
  }

  router.replace({ query }); // unterschied zu push?
};

const modalOpen = ref(false);
const modalElement = ref<HTMLElement | null>(null);

// eslint-disable-next-line prefer-const
let handleClickOutside: (event: MouseEvent) => void; // needed to remove event listener
handleClickOutside = (event) => {
  if (modalElement.value && !modalElement.value.contains(event.target)) {
    closeModal();
  }
};

const handleModelStatus = () => {
  modalOpen.value = !modalOpen.value;
  if (modalOpen.value) {
    setTimeout(() => {
      // needed because was being triggered immediately after opening, so it would close immediately since clicking outside
      document.addEventListener("click", handleClickOutside);
    }, 1);
  } else {
    document.removeEventListener("click", handleClickOutside);
  }
};
</script>

<template>
  <div class="relative mb-4 flex gap-2">
    <button
      class="rounded-full border-2 border-accent px-4 py-2"
      @click="handleModelStatus"
    >
      Filter ▼
    </button>
    <div
      v-if="modalOpen"
      ref="modalElement"
      class="before:content-' ' absolute top-12 flex flex-col gap-4 rounded-md bg-white p-4 shadow-xl before:absolute before:left-6 before:top-[-4px] before:h-2 before:w-2 before:rotate-45 before:bg-white before:shadow-md"
    >
      <div>
        <strong>Preis (€)</strong>
        <div class="flex gap-2">
          <input
            v-model="modalPreferences.priceMin"
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Min"
            :min="filterMetadata.price.min"
            :max="filterMetadata.price.max"
          />
          <input
            v-model="modalPreferences.priceMax"
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Max"
            :min="filterMetadata.price.min"
            :max="filterMetadata.price.max"
          />
        </div>
      </div>
      <div>
        <strong>Zimmer</strong>
        <div class="flex gap-2">
          <input
            v-model="modalPreferences.roomsMin"
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Min"
            :min="filterMetadata.rooms.min"
            :max="filterMetadata.rooms.max"
          />
          <input
            v-model="modalPreferences.roomsMax"
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Max"
            :min="filterMetadata.rooms.min"
            :max="filterMetadata.rooms.max"
          />
        </div>
      </div>
      <div>
        <strong>Fläche (m²)</strong>
        <div class="flex gap-2">
          <input
            v-model="modalPreferences.areaMin"
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Min"
            :min="filterMetadata.area.min"
            :max="filterMetadata.area.max"
          />
          <input
            v-model="modalPreferences.areaMax"
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Max"
            :min="filterMetadata.area.min"
            :max="filterMetadata.area.max"
          />
        </div>
      </div>
      <button
        class="rounded-md bg-accent px-4 py-2 text-m text-white"
        @click="applyFilters"
      >
        Anwenden
      </button>
    </div>
    <div
      v-for="filterObj in uiFilters"
      :key="filterObj.filter"
      class="rounded-full border-accent bg-secondary px-4 py-2"
    >
      {{ filterObj.filter }}
      <span
        class="ml-2 cursor-pointer text-accent"
        @click="resetFilter(filterObj.id)"
        >x</span
      >
    </div>
  </div>
</template>
