<script setup lang="ts">
const filters = ["Preis: 500-730", "Zimmer: 3+", "Fläche: max. 60qm²"];
const modalOpen = ref(false);
</script>

<template>
  <div class="relative mb-4 flex gap-2">
    <button
      class="rounded-full border-2 border-accent px-4 py-2"
      @click="modalOpen = !modalOpen"
    >
      Filter ▼
    </button>
    <div
      v-if="modalOpen"
      class="before:content-' ' absolute top-12 flex flex-col gap-4 rounded-md bg-white p-4 shadow-xl before:absolute before:left-6 before:top-[-4px] before:h-2 before:w-2 before:rotate-45 before:bg-white before:shadow-md"
    >
      <div>
        <strong>Preis (€)</strong>
        <div class="flex gap-2">
          <input
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Min"
          />
          <input
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Max"
          />
        </div>
      </div>
      <div>
        <strong>Zimmer</strong>
        <div class="flex gap-2">
          <input
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Min"
          />
          <input
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Max"
          />
        </div>
      </div>
      <div>
        <strong>Fläche (m²)</strong>
        <div class="flex gap-2">
          <input
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Min"
          />
          <input
            type="number"
            class="w-32 rounded-md border-2 border-accent px-4 py-2"
            placeholder="Max"
          />
        </div>
      </div>
      <button class="rounded-md bg-accent px-4 py-2 text-m text-white">
        Anwenden
      </button>
    </div>
    <div
      v-for="filter in filters"
      :key="filter"
      class="rounded-full border-accent bg-secondary px-4 py-2"
    >
      {{ filter }} <span class="ml-2 text-accent">x</span>
    </div>
  </div>
</template>
