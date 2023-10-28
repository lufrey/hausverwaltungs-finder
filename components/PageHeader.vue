<template>
  <nav class="flex items-center justify-between">
    <a
      href="/"
      class="logo text-xl font-medium tracking-tighter text-main"
      >ApartiFind</a
    >
    <span class="tagline hidden text-l font-light opacity-50 md:block"
      >What's a housing crisis?</span
    >
    <div class="nav_links flex items-center gap-8">
      <div class="favorites relative hidden md:inline-block">
        <img
          src="/heart_outline.svg"
          alt="Hier sind deine Favorites"
          class="favorites__image flex items-center justify-center"
        />
        <span
          class="top absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-s"
          >3</span
        >
      </div>
      <a
        href="https://github.com/lufrey/hausverwaltungs-finder"
        target="_blank"
        class="contribute rounded-full border-2 border-primary px-5 py-2"
      >
        <span>Mitwirken</span>
        <img
          src="/github-mark.svg"
          alt="Klicke um auf GitHub zu diesem Projekt beizutragen"
          class="github_logo ml-2 hidden w-6 sm:inline"
        />
      </a>
    </div>
  </nav>
</template>
