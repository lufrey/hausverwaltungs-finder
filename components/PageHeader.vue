<script setup lang="ts">
const { favorites } = useFavorite("");
const showSiteMenu = ref(false);
</script>

<template>
  <nav class="flex h-12 items-center justify-between">
    <NuxtLink
      to="/"
      class="logo text-xl font-medium tracking-tighter text-main"
    >
      ApartiFind
    </NuxtLink>
    <span class="tagline hidden text-l font-light opacity-50 md:block"
      >What's a housing crisis?</span
    >
    <div class="nav_links hidden items-center gap-8 md:flex">
      <div class="favorites relative">
        <IconHeart
          :filled="false"
          class="h-8 w-8"
        />
        <span
          class="top absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-s"
          ><ClientOnly fallback="0">{{ favorites.length }}</ClientOnly></span
        >
      </div>
      <div class="mx-auto flex items-center justify-center">
        <div
          class="bg-gradient rota flex w-full rounded-full bg-gradient-to-b from-primary to-accent p-[3px] hover:from-accent hover:to-accent"
        >
          <NuxtLink
            to="https://github.com/lufrey/hausverwaltungs-finder"
            target="_blank"
            class="contribute rounded-full bg-white px-5 py-2"
          >
            <span>Mitwirken</span>
            <img
              src="/github-mark.svg"
              alt="Klicke um auf GitHub zu diesem Projekt beizutragen"
              class="github_logo ml-2 inline w-6"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
    <HamburgerMenu @click="() => (showSiteMenu = true)" />
    <div
      v-if="showSiteMenu"
      class="fixed left-0 top-0 z-40 flex h-screen w-screen flex-col items-center bg-slate-400 px-4 pt-4"
    >
      <div class="ml-auto flex items-center">
        <div
          class="relative h-12 w-8 cursor-pointer"
          @click="() => (showSiteMenu = false)"
        >
          <span
            class="absolute top-0 h-0.5 w-8 translate-y-6 rotate-45 rounded-full bg-accent"
          ></span>
          <span
            class="absolute top-0 h-0.5 w-8 translate-y-6 -rotate-45 rounded-full bg-accent"
          ></span>
        </div>
      </div>
    </div>
  </nav>
</template>
