<script setup lang="ts">
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import { getFlatImageUrl } from "~/utils/flat";

const { $client } = useNuxtApp();

useHead({
  title: "Karte",
});
definePageMeta({
  pageTransition: {
    name: "rotate",
  },
});

const flatsQuery = await $client.flat.getAll.useQuery({
  pageSize: [1000],
  page: [1],
});

const flats = flatsQuery.data ?? {
  data: [],
};

const center = {
  lat: 52.520008,
  lng: 13.404954,
};

const infoWindowsOpen = ref<Record<string, boolean>>({});
</script>
<template>
  <div class="h-full overflow-hidden rounded-xl bg-background">
    <GoogleMap
      class="h-full w-full"
      :center="center"
      :zoom="11"
      :api-key="$config.public.googleMapsApiKey"
      :map-id="$config.public.googleMapsId"
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
            icon: {
              url: `${$config.public.deploymentUrl}/marker.svg?v=1.0`,
              scaledSize: {
                width: 32,
                height: 32,
              },
            },
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
          @mouseover="() => (infoWindowsOpen[flat.id] = true)"
          @mouseout="() => (infoWindowsOpen[flat.id] = false)"
        >
          <InfoWindow :model-value="infoWindowsOpen[flat.id]">
            <div class="flex w-40 flex-col gap-4 p-2">
              <NuxtImg
                :src="getFlatImageUrl(flat)"
                :alt="flat.title"
                class="aspect-square h-32 w-32 rounded-md"
              />
              <div class="break-words font-bold">
                {{ flat.title }}
              </div>
              <ul>
                <li>
                  {{ flat.address.street }} {{ flat.address.streetNumber }}
                </li>
                <li>
                  <ApartmentDistrict
                    class="underline hover:no-underline"
                    :zip-code="flat.address.postalCode"
                  />
                </li>
                <li>{{ flat.roomCount }} Zimmer</li>
                <li>{{ flat.usableArea }} m²</li>
                <li>{{ flat.warmRentPrice ?? flat.coldRentPrice }} €</li>
              </ul>
            </div>
          </InfoWindow>
        </Marker>
      </ClientOnly>
    </GoogleMap>
  </div>
</template>
