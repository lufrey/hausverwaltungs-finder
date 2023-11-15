<template>
  <nav class="flex items-center justify-between">
    <NuxtLink
      to="/"
      class="logo text-xl font-medium tracking-tighter text-main"
    >
      ApartiFind
    </NuxtLink>
    <span class="tagline hidden text-l font-light opacity-50 md:block"
      >What's a housing crisis?</span
    >
    <div class="nav_links flex items-center gap-8">
      <div class="favorites relative hidden md:inline-block">
        <IconHeart
          :filled="false"
          class="h-8 w-8"
        />
        <span
          class="top absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-s"
          >4</span
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
              class="github_logo ml-2 hidden w-6 sm:inline"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
