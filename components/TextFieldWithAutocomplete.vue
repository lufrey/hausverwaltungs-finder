<template>
  <label for="districts">Bezirke</label>
  <input-suggestions
    class="relative flex h-8 w-full flex-row place-content-end items-center rounded-md bg-white shadow-inner focus-within:border-b-2 focus-within:border-b-accent"
  >
    <input
      id="districts"
      v-model="inputValue"
      type="text"
      class="mt-0 h-full w-full min-w-max rounded-md px-1 outline-none"
      @input="handleInput"
      @keydown.down="highlightNext"
      @keydown.up="highlightPrev"
      @keydown.enter.prevent="selectHighlighted"
    />
    <div
      v-if="showSuggestions"
      class="absolute top-full mt-[2px] w-full rounded-b-md bg-white drop-shadow-md"
    >
      <div
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        :class="{ highlighted: index === highlightedIndex }"
        class="px-1 first:pt-1 last:pb-1 hover:bg-gray-300"
        @mousedown.prevent="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </div>
    </div>
  </input-suggestions>
  <div
    v-if="selectedItems.length"
    class="mt-2 flex flex-row flex-wrap gap-1 rounded-md bg-white p-1"
  >
    <div
      v-for="(item, index) in selectedItems"
      :key="index"
      class="flex h-5 w-max flex-row items-center justify-end rounded-sm bg-gray-300 px-2 py-3 text-s"
    >
      <span class="whitespace-nowrap">{{ item }}</span>
      <img
        src="/cancel_remove.svg"
        alt="entfernen"
        class="ml-1 w-4"
        @click="removeItem(index)"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "TextFieldWithAutocomplete",
  props: {
    suggestions: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const inputValue = ref("");
    const selectedItems = ref([]);
    const highlightedIndex = ref(-1);

    const handleInput = (event) => {
      inputValue.value = event.target.value;
      highlightedIndex.value = -1;
    };

    const filteredSuggestions = computed(() => {
      return props.suggestions
        .filter((suggestion) =>
          suggestion.toLowerCase().includes(inputValue.value.toLowerCase()),
        )
        .filter((suggestion) => !selectedItems.value.includes(suggestion));
    });

    const showSuggestions = computed(() => {
      return filteredSuggestions.value.length > 0 && inputValue.value !== "";
    });

    const highlightNext = () => {
      if (highlightedIndex.value === filteredSuggestions.value.length - 1) {
        highlightedIndex.value = -1;
      } else {
        highlightedIndex.value++;
      }
    };

    const highlightPrev = () => {
      if (highlightedIndex.value <= 0) {
        highlightedIndex.value = filteredSuggestions.value.length - 1;
      } else {
        highlightedIndex.value--;
      }
    };

    const selectHighlighted = () => {
      if (highlightedIndex.value !== -1) {
        selectSuggestion(filteredSuggestions.value[highlightedIndex.value]);
      }
    };

    const selectSuggestion = (suggestion) => {
      selectedItems.value.push(suggestion);
      inputValue.value = "";
      highlightedIndex.value = -1;
    };

    const removeItem = (index) => {
      selectedItems.value.splice(index, 1);
    };

    return {
      inputValue,
      selectedItems,
      highlightedIndex,
      handleInput,
      filteredSuggestions,
      showSuggestions,
      highlightNext,
      highlightPrev,
      selectHighlighted,
      selectSuggestion,
      removeItem,
    };
  },
};
</script>
