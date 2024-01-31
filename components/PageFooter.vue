<script setup lang="ts">
const sections = [
  {
    title: "Sitemap",
    links: [
      {
        title: "Startseite",
        url: "/",
      },
      {
        title: "Wohnungsübersicht",
        url: "/overview",
      },
      {
        title: "Karte",
        url: "/map",
      },
      {
        title: "Über dieses Projekt",
        url: "/about",
      },
      {
        title: "Datenschutz",
        url: "/privacy",
      },
    ],
  },
  {
    title: "Über",
    links: [
      {
        title: "E-Mail",
        url: "mailto:wohnungsmarkt@lukasfrey.com",
      },
      {
        title: "Mitmachen",
        url: "https://github.com/lufrey/hausverwaltungs-finder",
      },
    ],
  },
  {
    title: "Credits",
    links: [
      {
        title: "Apartment Graphic",
        url: "https://www.freepik.com/free-ai-image/3d-rendering-abstract-building_72611443.htm",
      },
      {
        title: "Photo by Simone Hutsch",
        url: "https://unsplash.com/photos/architectural-photography-of-gray-and-yellow-building-YsEOuVd7afg",
      },
      {
        title: "Photo by Wasimul Hossain",
        url: "https://unsplash.com/photos/a-building-with-a-clock-on-the-top-of-it-XoIXsOnTOM0",
      },
      {
        title: "Icons by Lordicon",
        url: "https://lordicon.com/",
      },
    ],
  },
];
</script>

<template>
  <footer
    class="mt-10 flex border-t border-black bg-gray-100 pb-10 md:mt-20 lg:text-right"
  >
    <div
      class="mx-auto w-full max-w-[1180px] px-4 pt-4 font-poppins md:px-14 xl:pt-8"
    >
      <div class="grid w-full gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div class="relative hidden lg:block">
          <NuxtImg
            src="/3d-rendering-abstract-building.png"
            alt="Krasse Graphik"
            class="md:absolute md:-bottom-[100px] lg:h-72"
            format="avif,webp"
          />
        </div>
        <div
          v-for="section in sections"
          :key="section.title"
        >
          <h3 class="font-bold">{{ section.title }}</h3>
          <ul>
            <li
              v-for="link in section.links"
              :key="link.title"
            >
              <NuxtLink
                :to="link.url"
                class="hover:underline"
              >
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <span
        class="my-4 ml-auto block w-full bg-background pt-[1px] lg:w-3/4"
      ></span>
      <div class="">{{ new Date().getFullYear() }} © WohnungsMarktBerlin</div>
    </div>
  </footer>
</template>
