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

const pageSizeOptions = [25, 50, 100];

const updatePagination = (page: number, pageSize: number) => {
  const pageSizeToGoTo = pageSizeOptions.includes(pageSize)
    ? pageSize
    : pageSizeOptions[0];

  // automatically fix page, when it is out of bounds
  const pageToGoTo = Math.min(
    Math.max(1, page),
    Math.ceil(props.filteredElementsCount / pageSizeToGoTo),
  );

  updateQueryState({
    page: String(pageToGoTo),
    pageSize: String(pageSizeToGoTo),
  });
};

if (props.currentPage > maxPage.value) {
  updatePagination(maxPage.value, props.pageSize);
}

onMounted(() => {
  updatePagination(props.currentPage, props.pageSize);
});
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex gap-4">
      <label class="">Einträge pro Seite</label>
      <select
        class="rounded-md bg-white text-center shadow-inner [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        :value="pageSize"
        @change="
          ($event: Event) => {
            const target = $event.target as HTMLSelectElement;
            updatePagination(currentPage, Number(target.value));
          }
        "
      >
        <option
          v-for="ps in pageSizeOptions"
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
          @click="updatePagination(1, pageSize)"
        >
          &lt;&lt;
        </button>
        <button
          :disabled="currentPage === 1"
          class="rounded-full bg-background p-2 text-accent transition-colors duration-200 hover:bg-accent hover:text-white disabled:opacity-50"
          @click="updatePagination(currentPage - 1, pageSize)"
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
          @click="updatePagination(currentPage + 1, pageSize)"
        >
          &gt;
        </button>
        <button
          :disabled="currentPage === maxPage"
          class="rounded-full bg-background p-2 text-accent transition-colors duration-200 hover:bg-accent hover:text-white disabled:opacity-50"
          @click="updatePagination(maxPage, pageSize)"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  </div>
</template>