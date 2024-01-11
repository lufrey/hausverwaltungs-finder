<script setup lang="ts">
const props = defineProps<{
  totalElementsCount: number;
  filteredElementsCount: number;
  currentPage: number;
  pageSize: number;
}>();

const { updateQueryState } = useUrlState<{
  page: string;
  pageSize: string;
}>();

const maxPage = computed(() => {
  return Math.ceil(props.filteredElementsCount / props.pageSize);
});

const updatePage = (page: number) => {
  // automatically fix page, when it is out of bounds
  const pageToGoTo = Math.min(
    Math.max(1, page),
    Math.ceil(props.filteredElementsCount / props.pageSize),
  );
  updateQueryState({ page: String(pageToGoTo) });
};

if (props.currentPage > maxPage.value) {
  updatePage(maxPage.value);
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex gap-4">
      <label class="">Einträge pro Seite</label>
      <select
        class="rounded-md bg-white text-center shadow-inner [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        :value="props.pageSize"
        @change="
          ($event: Event) => {
            const target = $event.target as HTMLSelectElement;
            updateQueryState({ pageSize: target.value });
          }
        "
      >
        <option
          v-for="ps in [25, 50, 100]"
          :key="ps"
          :value="ps"
          :selected="ps === props.pageSize"
        >
          {{ ps }}
        </option>
      </select>
    </div>
    <div class="flex flex-grow justify-end">
      <div class="flex items-center gap-2">
        <button
          :disabled="currentPage === 1"
          class="rounded-full bg-background p-2 text-accent transition-colors duration-200 hover:bg-accent hover:text-white disabled:opacity-50"
          @click="updatePage(1)"
        >
          &lt;&lt;
        </button>
        <button
          :disabled="currentPage === 1"
          class="rounded-full bg-background p-2 text-accent transition-colors duration-200 hover:bg-accent hover:text-white disabled:opacity-50"
          @click="updatePage(currentPage - 1)"
        >
          &lt;
        </button>
        <span>
          Seite {{ currentPage }} von
          {{ maxPage }}
        </span>
        <button
          :disabled="currentPage === maxPage"
          class="rounded-full bg-background p-2 text-accent transition-colors duration-200 hover:bg-accent hover:text-white disabled:opacity-50"
          @click="updatePage(currentPage + 1)"
        >
          &gt;
        </button>
        <button
          :disabled="currentPage === maxPage"
          class="rounded-full bg-background p-2 text-accent transition-colors duration-200 hover:bg-accent hover:text-white disabled:opacity-50"
          @click="updatePage(maxPage)"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  </div>
</template>
