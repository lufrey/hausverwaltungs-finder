<template>
  <div class="layout">
    <div class="eyecatcher relative rounded-3xl bg-main p-5">
      <h1
        class="eyecatcher__headline text-white ml-[-76px] mr-16 hyphens-manual text-xxl"
      >
        Berlins Wohnungs&shy;markt auf einen Blick
      </h1>
      <img
        src="../assets/questionmark.svg"
        alt=""
        class="eyecatcher__explanation absolute right-3 top-3"
      />
    </div>
    <div class="apartmentlist rounded-3xl bg-background p-5">
      <PreviewlistApartment
        apt-name="Gemütliche Wohnung für Senioren"
        apt-street="Rigaerstraße 14"
        apt-district="Friedrichshain"
        :tags="['WBS', 'Altbau']"
        price="1198"
        square-footage="84"
        :favorite="false"
        image-src="/apartment_example_image.png"
      />
      <PreviewlistApartment
        apt-name="Wunderschöne 3 Zimmer Wohung in beliebter Lage"
        apt-street="Wilhelminenhofstraße 132"
        apt-district="Treptow"
        :tags="['Neueintrag']"
        price="640"
        square-footage="122"
        :favorite="false"
        image-src="/apartment_example_image.png"
      />
      <PreviewlistApartment
        apt-name="ERSTBEZUG: Luxuriös Wohnen im Herzen von Berlin Mitte"
        apt-street="Edisonstraße 32"
        apt-district="Marzahn"
        :tags="['Neubau', 'Zenral', 'WBS']"
        price="2661"
        square-footage="13"
        :favorite="true"
        image-src="/apartment_example_image.png"
      />
    </div>
    <div class="map_preview rounded-3xl bg-[green] p-5">map_preview</div>
    <div class="decoration rounded-3xl bg-[#61edff] p-5">decoration</div>
    <div class="mailing_list rounded-3xl bg-secondary p-5">mailing_list</div>
  </div>
</template>

<style scoped>
.eyecatcher__headline {
  text-shadow: 6px 6px 0px #a555a2;
  -webkit-text-stroke: 1px #000;
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
