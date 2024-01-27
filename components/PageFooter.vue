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
        title: "Übersicht",
        url: "/overview",
      },
      {
        title: "Karte",
        url: "/map",
      },
    ],
  },
  {
    title: "Über",
    links: [
      {
        title: "E-Mail",
        url: "mailto:",
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
        title: "Icons",
        url: "https://www.flaticon.com/free-icons/temperature",
      },
      {
        title: "Icons",
        url: "https://www.flaticon.com/free-icons/temperature",
      },
    ],
  },
];
</script>

<template>
  <footer
    class="mt-10 flex bg-gray-100 pb-10 text-center md:mt-20 md:text-right"
  >
    <div
      class="mx-auto w-full max-w-[1180px] px-4 pt-4 font-poppins md:px-14 xl:pt-8"
    >
      <div class="grid grid-cols-3 md:grid-cols-4">
        <div class="krasse_graphik hidden md:block"></div>
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
      <span class="my-4 block w-full bg-background pt-[1px]"></span>
      <div class="">{{ new Date().getFullYear() }} © ApartiFind</div>
    </div>
  </footer>
</template>
