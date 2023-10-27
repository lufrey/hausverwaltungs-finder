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
    <div class="eyecatcher">eyecatcher</div>
    <div class="apartmentlist">apartmentlist</div>
    <div class="map_preview">map_preview</div>
    <div class="decoration">decoration</div>
    <div class="mailing_list">mailing_list</div>
  </div>
</template>

<style scoped>
.layout {  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
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