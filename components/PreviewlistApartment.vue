<template>
  <div class="flex gap-2">
    <div class="aspect-square h-full">
      <img
        :src="imageSrc"
        alt="Property Image"
        class="h-full w-full rounded-lg"
      />
    </div>
    <div class="flex flex-col gap-1 overflow-hidden">
      <h3
        class="overflow-hidden text-ellipsis whitespace-nowrap text-l leading-5"
      >
        {{ aptName }}
      </h3>
      <h4 class="overflow-hidden text-ellipsis text-s font-light">
        {{ aptStreet }} - {{ aptDistrict }}
      </h4>
      <div class="tags-container flex flex-row gap-x-1">
        <span
          v-for="tag in tags as string[]"
          :key="tag"
          class="tag py-0.25 bg-white rounded-full px-2.5 text-xs text-accent"
          >{{ tag }}</span
        >
      </div>
    </div>
    <div class="flex shrink-0 flex-grow flex-col items-end gap-1">
      <span class="price block text-l font-light leading-5">{{ price }} €</span>
      <span class="square-footage block text-s font-light"
        >{{ squareFootage }} m²</span
      >
      <button
        class="favorites-button inline-block"
        title="Zu Favoriten hinzufügen"
        @click="toggleFavorite"
      >
        <img
          :src="favorite ? '/heart_filled.svg' : '/heart_outline.svg'"
          class="w-5"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PreviewlistApartment",
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    aptName: {
      type: String,
      required: true,
    },
    aptStreet: {
      type: String,
      required: true,
    },
    aptDistrict: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    squareFootage: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleFavorite() {
      this.$emit("toggle-favorite");
    },
  },
};
</script>
