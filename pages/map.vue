<script setup lang="ts">
import { GoogleMap, Marker } from "vue3-google-map";
const { $client } = useNuxtApp();

useHead({
  title: "Karte",
});
definePageMeta({
  pageTransition: {
    name: "rotate",
  },
});

const flatsQuery = await $client.flat.getAll.useQuery();

const flats = flatsQuery.data ?? [];

const center = {
  lat: 52.520008,
  lng: 13.404954,
};
</script>
<template>
  <div class="flex h-full flex-col">
    <GoogleMap
      class="w-full grow"
      :center="center"
      :zoom="11"
      :api-key="$config.public.googleMapsApiKey"
    >
      <ClientOnly>
        <Marker
          v-for="flat in flats?.data"
          :key="flat.id"
          :options="{
            position: {
              lat: flat.address.latitude,
              lng: flat.address.longitude,
            },
            title: flat.title,
          }"
          @click="
            () =>
              navigateTo(flat.url, {
                external: true,
                open: {
                  target: '_blank',
                },
              })
          "
        />
      </ClientOnly>
    </GoogleMap>
  </div>
</template>
