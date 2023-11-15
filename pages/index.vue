<script setup lang="ts">
const { $client } = useNuxtApp();
const propertyManagementsWithFlats = await $client.flat.getFeatured.query();
const flats = propertyManagementsWithFlats
  .map((propertyManagement) => propertyManagement.flats)
  .flat();
</script>

<template>
  <div class="layout flex flex-col gap-y-4">
    <div class="eyecatcher relative rounded-3xl bg-main p-5">
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
      class="apartmentlist relative mb-6 flex flex-col gap-4 rounded-3xl bg-background p-5"
    >
      <PreviewlistApartment
        v-for="flat in flats"
        :key="flat.id"
        :title="flat.title"
        :address="flat.address"
        :cold-rent-price="flat.coldRentPrice"
        :tags="flat.tags"
        :favorite="false"
        :usable-area="flat.usableArea"
        :image-src="flat.hasImage ? `/api/image/${flat.id}` : null"
        :url="flat.url"
        :first-seen="new Date(flat.firstSeen)"
      />

      <FatButton
        class="absolute -bottom-5 -right-10"
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
    <div class="map_preview relative rounded-3xl bg-[green] p-5">
      map_preview
    </div>
    <div class="decoration relative overflow-hidden rounded-3xl">
      <ImageSlider
        :images="[
          'simone-hutsch-YsEOuVd7afg-unsplash.jpg',
          'wasimul-hossain-XoIXsOnTOM0-unsplash.jpg',
        ]"
      />
    </div>
    <div
      class="mailing_list relative mb-6 mt-4 rounded-3xl border border-black bg-secondary p-5"
    >
      <span
        class="mail-tile-header absolute -top-8 left-[-1px] rounded-t-3xl border border-black bg-secondary px-5 pt-2 text-xl"
        >Nichts verpassen</span
      >
      <p class="mt-2 max-w-xl text-l font-light text-[grey]">
        Lass dich ganz einfach benachrichtigen sobald neue Wohnungen mit deinen
        Kriterien verfügbar sind.
      </p>
      <TextFieldWithRules />
      <TextFieldWithAutocomplete
        :suggestions="[
          'Friedrichshain',
          'Kreuzberg',
          'Neukölln',
          'Mitte',
          'Prenzlauer Berg',
          'Charlottenburg',
          'Schöneberg',
        ]"
        placeholder="Bezirk"
      />
      <!-- Bezirk -->
      <Slider
        title="Zimmer (minimum)"
        output-title="Anzahl"
        :min-value="0"
        :max-value="10"
      />
      <!-- Zimmer -->
      <Slider
        title="Monatsmiete (kalt, maximum)"
        output-title="Preis €"
        :min-value="100"
        :max-value="5000"
      />
      <!-- Monatsmiete -->
      <FatButton class="absolute -bottom-5 -right-10">
        Jetzt in den Verteiler
        <img
          src="/arrow_right.svg"
          alt=""
          class="ml-4 inline"
        />
      </FatButton>
    </div>
  </div>
</template>

<style scoped>
.mail-tile-header::before {
  height: 3px;
  width: 100%;
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  background-color: #ecdaeb;
}
.mail-tile-header::after {
  height: 50%;
  width: 3px;
  content: "";
  position: absolute;
  bottom: -3px;
  right: -2px;
  background-color: #ecdaeb;
}
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
