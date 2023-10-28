<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="layout">
    <!-- <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a
      href="https://nuxt.com/docs/getting-started/routing"
      target="_blank"
      >Learn more about Nuxt Routing</a
    >
    <p>
      <a href="/page2">Go to page 2</a>
    </p> -->
    <div class="tile eyecatcher bg-main relative">
      <h1 class="eyecatcher__headline text-xxl break-words hyphens-auto">Berlins Wohnungsmarkt auf einen Blick</h1>
      <img src="../assets/questionmark.svg" alt="" class="eyecatcher__explanation absolute top-3 right-3">
    </div>
    <div class="tile apartmentlist bg-background">
      <PreviewlistApartment
        apt_name="Gemütliche Wohnung für Senioren"
        apt_street="Rigaerstraße 14"
        apt_district="Friedrichshain"
        v-bind:tags="['WBS', 'Altbau']"
        price="1198"
        squareFootage="84"
        v-bind:favorite=false
        imageSrc="/apartment_example_image.png"
      />
      <PreviewlistApartment
        apt_name="Wunderschöne 3 Zimmer Wohung in beliebter Lage"
        apt_street="Wilhelminenhofstraße 132"
        apt_district="Treptow"
        v-bind:tags="['Neueintrag']"
        price="640"
        squareFootage="122"
        v-bind:favorite=false
        imageSrc="/apartment_example_image.png"
      />
      <PreviewlistApartment
        apt_name="ERSTBEZUG: Luxuriös Wohnen im Herzen von Berlin Mitte"
        apt_street="Edisonstraße 32"
        apt_district="Marzahn"
        v-bind:tags="['Neubau', 'Zenral', 'WBS']"
        price="2661"
        squareFootage="13"
        v-bind:favorite=true
        imageSrc="/apartment_example_image.png"
      />
    </div>
    <div class="tile map_preview bg-[green]">map_preview</div>
    <div class="tile decoration bg-[#61edff]">decoration</div>
    <div class="tile mailing_list bg-secondary">mailing_list</div>
  </div>
</template>

<style scoped>
.tile {
  border-radius: 1.5rem;
  padding: 1.25rem;
}
.eyecatcher__headline {
  text-shadow: 6px 6px 0px #A555A2;
  -webkit-text-stroke: 1px #000;
  color: #fff;
  margin-left: -76px;
  margin-right: 60px;
}
.layout { 
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

.eyecatcher { grid-area: eyecatcher; }

.apartmentlist { grid-area: apartmentlist; }

.map_preview { grid-area: map_preview; }

.decoration { grid-area: decoration; }

.mailing_list { grid-area: mailing_list; }

</style>