<script setup lang="ts">
const modalPreferences = reactive({
  priceMin: null,
  priceMax: null,
  roomsMin: null,
  roomsMax: null,
  areaMin: null,
  areaMax: null,
});

const filterRanges = {
  price: { min: 100, max: 10000 },
  rooms: { min: 1, max: 10 },
  area: { min: 1, max: 1000 },
};

const createFilter = (minValue: null, maxValue: null, label: string) => {
  if (minValue && maxValue) {
    return `${label}: ${minValue}-${maxValue}`;
  } else if (minValue) {
    return `${label}: ${minValue}+`;
  } else if (maxValue) {
    return `${label}: ${maxValue}-`;
  }
  return null;
};

const uiFilters = computed(() => {
  const filters: any[] = [];
  const filterLabels = ["Preis", "Zimmer", "Fläche"];
  const filterValues = [
    ["priceMin", "priceMax"],
    ["roomsMin", "roomsMax"],
    ["areaMin", "areaMax"],
  ];

  filterValues.forEach((values, index) => {
    const filter = createFilter(
      modalPreferences[values[0] as keyof typeof modalPreferences],
      modalPreferences[values[1] as keyof typeof modalPreferences],
      filterLabels[index],
    );
    if (filter) {
      filters.push({ id: values, filter });
    }
  });

  return filters;
});

const resetFilter = (filterId: (string | number)[]) => {
  modalPreferences[filterId[0] as keyof typeof modalPreferences] = null;
  modalPreferences[filterId[1] as keyof typeof modalPreferences] = null;
};

const applyFilters = () => {
  const filterValues = [
    ["priceMin", "priceMax"],
    ["roomsMin", "roomsMax"],
    ["areaMin", "areaMax"],
  ];

  filterValues.forEach((values, index) => {
    if (
      // dont apply if user didnt input anything
      modalPreferences[values[0]] !== null &&
      modalPreferences[values[1]] !== null
    ) {
      if (modalPreferences[values[0]] > modalPreferences[values[1]]) {
        [modalPreferences[values[0]], modalPreferences[values[1]]] = [
          modalPreferences[values[1]],
          modalPreferences[values[0]],
        ];
      }

      // Clamp the values to the min and max
      const range = filterRanges[values[0].slice(0, -3)]; // Get the range for this filter
      modalPreferences[values[0]] = Math.max(
        range.min,
        Math.min(range.max, modalPreferences[values[0]]),
      );
      modalPreferences[values[1]] = Math.max(
        range.min,
        Math.min(range.max, modalPreferences[values[1]]),
      );
    }
  });

  // Apply the filters
};

const modalOpen = ref(false);
const modalElement = ref<HTMLElement | null>(null);

let handleClickOutside: (event: MouseEvent) => void; // needed to remove event listener
// eslint-disable-next-line prefer-const
handleClickOutside = (event) => {
  if (modalElement.value && !modalElement.value.contains(event.target)) {
    modalOpen.value = false;
    document.removeEventListener("click", handleClickOutside);
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
            :min="filterRanges.price.min"
            :max="filterRanges.price.max"
          />
          <input
            v-model="modalPreferences.priceMax"
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Max"
            :min="filterRanges.price.min"
            :max="filterRanges.price.max"
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
            :min="filterRanges.rooms.min"
            :max="filterRanges.rooms.max"
          />
          <input
            v-model="modalPreferences.roomsMax"
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Max"
            :min="filterRanges.rooms.min"
            :max="filterRanges.rooms.max"
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
            :min="filterRanges.area.min"
            :max="filterRanges.area.max"
          />
          <input
            v-model="modalPreferences.areaMax"
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Max"
            :min="filterRanges.area.min"
            :max="filterRanges.area.max"
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
        class="ml-2 text-accent"
        @click="resetFilter(filterObj.id)"
        >x</span
      >
    </div>
  </div>
</template>
