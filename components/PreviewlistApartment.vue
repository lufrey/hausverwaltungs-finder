<template>
  <div class="apartment mt-4 flex flex-row">
    <div class="image-container shrink-0 flex-grow">
      <img
        :src="imageSrc"
        alt="Property Image"
        class="rounded-lg"
      />
    </div>
    <div class="apartment__info shrink grow-[4]">
      <h3 class="text-ellipsis whitespace-nowrap text-l leading-5">
        {{ aptName }}
      </h3>
      <h4 class="flex-nowrap text-ellipsis text-s font-light">
        {{ aptStreet }} - {{ aptDistrict }}
      </h4>
      <div class="tags-container flex flex-row gap-x-1">
        <span
          v-for="tag in tags"
          :key="tag"
          class="tag py-0.25 rounded-full bg-[#fff] px-2.5 text-xs text-accent"
          >{{ tag }}</span
        >
      </div>
    </div>
    <div class="apartment__details shrink-0 flex-grow text-right">
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
