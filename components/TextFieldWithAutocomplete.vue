<template>
  <div>
    <label for="districts">Bezirke</label>
    <div
      v-if="modelValue.length"
      class="mb-2 flex flex-row flex-wrap gap-1 rounded-md bg-white p-1"
    >
      <div
        v-for="(itemId, index) in modelValue"
        :key="index"
        class="flex h-5 w-max cursor-pointer flex-row items-center justify-end rounded-sm bg-gray-300 px-2 py-3 text-s"
        @click="removeItem(index)"
      >
        <span class="whitespace-nowrap">{{
          suggestions.find((item) => item.id == itemId)!.title
        }}</span>
        <img
          src="/cancel_remove.svg"
          alt="entfernen"
          class="ml-1 w-4"
        />
      </div>
    </div>
    <div
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
        @focus="handleFocus"
        @blur="handleBlur"
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
          @mousedown.prevent="selectSuggestion(suggestion.id)"
        >
          {{ suggestion.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Suggestion = { id: string; title: string };

const props = defineProps<{
  suggestions: Suggestion[];
  modelValue: string[];
}>();

const $emit = defineEmits(["update:modelValue"]);

const inputValue = ref("");
const highlightedIndex = ref(-1);
const showSuggestions = ref(false);

const handleInput = (event: Event) => {
  inputValue.value = (event.target as HTMLInputElement).value;
  highlightedIndex.value = -1;
};

const handleFocus = () => {
  showSuggestions.value = true;
  highlightedIndex.value = -1;
};

const handleBlur = () => {
  showSuggestions.value = false;
};

const filteredSuggestions = computed(() => {
  return props.suggestions.filter(
    (suggestion: Suggestion) =>
      suggestion.title.toLowerCase().includes(inputValue.value.toLowerCase()) &&
      !props.modelValue.includes(suggestion.id),
  );
});

const highlightNext = (event: { preventDefault: () => void }) => {
  event.preventDefault();
  if (highlightedIndex.value === filteredSuggestions.value.length - 1) {
    highlightedIndex.value = -1;
  } else {
    highlightedIndex.value++;
  }
};

const highlightPrev = (event: { preventDefault: () => void }) => {
  event.preventDefault();
  if (highlightedIndex.value <= 0) {
    highlightedIndex.value = filteredSuggestions.value.length - 1;
  } else {
    highlightedIndex.value--;
  }
};

const selectHighlighted = () => {
  if (highlightedIndex.value !== -1) {
    selectSuggestion(filteredSuggestions.value[highlightedIndex.value].id);
  }
};

const selectSuggestion = (id: Suggestion["id"]) => {
  $emit("update:modelValue", [...props.modelValue, id]);
  inputValue.value = "";
  highlightedIndex.value = -1;
};

const removeItem = (index: any) => {
  $emit("update:modelValue", props.modelValue.toSpliced(index, 1));
};
</script>
