<script setup lang="ts">
const { $client } = useNuxtApp();
const propertyManagementsWithFlats = await $client.flat.getFeatured.query({
  limit: 7,
});
const flats = propertyManagementsWithFlats;
const origin = useRequestURL().origin;
</script>

<template>
  <div class="layout flex flex-col gap-y-4">
    <div class="eyecatcher relative ml-[56px] rounded-3xl bg-main p-5 md:ml-0">
      <h1
        class="eyecatcher__headline ml-[-76px] mr-16 hyphens-manual text-xxl text-white"
      >
        Berlins Wohnungs&shy;markt auf einen&nbsp;Blick
      </h1>
      <img
        src="../assets/questionmark.svg"
        alt=""
        class="eyecatcher__explanation absolute right-3 top-3"
      />
    </div>
    <div
      class="apartmentlist relative mb-6 flex flex-col gap-4 rounded-3xl bg-background p-5 pb-16"
    >
      <ApartmentPreview
        v-for="flat in flats"
        :id="flat.id"
        :key="flat.id"
        :title="flat.title"
        :address="flat.address"
        :cold-rent-price="flat.coldRentPrice"
        :warm-rent-price="flat.warmRentPrice"
        :tags="flat.tags"
        :usable-area="flat.usableArea"
        :image-src="flat.hasImage ? `/api/image/${flat.id}` : null"
        :url="flat.url"
        :first-seen="new Date(flat.firstSeen)"
      />

      <FatButton
        class="absolute -bottom-5 -right-4 md:-right-10"
        href="/overview"
      >
        Alle Wohnungen ansehen
        <img
          src="/arrow_right.svg"
          alt=""
          class="ml-4 inline"
        />
      </FatButton>
    </div>
    <NuxtLink
      to="/map"
      class="map_preview relative overflow-hidden rounded-3xl border border-black bg-[green]"
      title="Zur Karte"
    >
      <NuxtImg
        :src="`${origin}/api/image/map-preview`"
        alt="Vorschau der Karte"
        class="h-full w-full object-cover"
        format="webp"
      />
      <IconZoomIn class="absolute bottom-0 right-0 mb-3 mr-3" />
    </NuxtLink>

    <div class="decoration relative overflow-hidden rounded-3xl">
      <ImageSlider
        :images="[
          'simone-hutsch-YsEOuVd7afg-unsplash.jpg',
          'wasimul-hossain-XoIXsOnTOM0-unsplash.jpg',
        ]"
      />
    </div>
    <MailinglistSignup />
  </div>
</template>
<style scoped>
.eyecatcher__headline {
  text-shadow: 6px 6px 0px #a555a2;
  -webkit-text-stroke: 1px #000;
}
@media screen and (min-width: 768px) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1.25rem;
    grid-auto-flow: row;
    grid-template-areas:
      "eyecatcher eyecatcher map_preview"
      "eyecatcher eyecatcher decoration"
      "apartmentlist apartmentlist apartmentlist"
      "mailing_list mailing_list mailing_list";
  }
}
@media screen and (min-width: 1024px) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1.25rem;
    grid-auto-flow: row;
    grid-template-areas:
      "eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist"
      "eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist"
      "eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist"
      "eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist"
      "eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist"
      "eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher eyecatcher apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist"
      "decoration decoration decoration decoration map_preview map_preview apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist"
      "decoration decoration decoration decoration map_preview map_preview apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist apartmentlist"
      "decoration decoration decoration decoration . . . . . . . ."
      "decoration decoration decoration decoration mailing_list mailing_list mailing_list mailing_list mailing_list mailing_list mailing_list mailing_list"
      "decoration decoration decoration decoration mailing_list mailing_list mailing_list mailing_list mailing_list mailing_list mailing_list mailing_list"
      "decoration decoration decoration decoration mailing_list mailing_list mailing_list mailing_list mailing_list mailing_list mailing_list mailing_list";
  }
}

.eyecatcher {
  grid-area: eyecatcher;
}

.apartmentlist {
  grid-area: apartmentlist;
}

.map_preview {
  grid-area: map_preview;
}

.decoration {
  grid-area: decoration;
}

.mailing_list {
  grid-area: mailing_list;
}
</style>
