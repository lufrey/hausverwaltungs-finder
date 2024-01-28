<script setup lang="ts">
const { favorites } = useFavorite("");

const siteMenuVisibility = ref({
  visible: false,
  closing: true,
});

function showSiteMenu(state: boolean) {
  siteMenuVisibility.value.closing = !state;
  if (state) {
    siteMenuVisibility.value.visible = true;
  } else {
    setTimeout(() => {
      siteMenuVisibility.value.visible = false;
    }, 300);
  }
}

const route = useRoute();

const nuxtApp = useNuxtApp();
const _cleanup: Array<() => void> = [];

onMounted(() => {
  (["vue:error", "page:loading:end"] as const).forEach((hook) => {
    _cleanup.push(
      nuxtApp.hook(hook, () => {
        showSiteMenu(false);
      }),
    );
  });
});

onUnmounted(() => _cleanup.forEach((hook) => hook()));
</script>

<template>
  <nav class="flex h-12 items-center gap-4 md:justify-between">
    <NuxtLink
      to="/"
      class="logo text-xl font-medium tracking-tighter text-main md:flex-1"
    >
      ApartiFind
    </NuxtLink>
    <h2
      class="tagline hidden whitespace-nowrap text-center text-l font-light opacity-50 md:block md:flex-1"
    >
      What's a housing crisis?
    </h2>
    <div
      class="nav_links ml-auto items-baseline gap-4 text-right md:ml-0 md:flex md:flex-1 md:justify-end"
    >
      <NuxtLink
        to="/"
        title="Startseite"
        class="hidden md:block"
      >
        <lord-icon
          src="/icons/home.json"
          trigger="hover"
          style="width: 32px; height: 32px"
        />
      </NuxtLink>
      <NuxtLink
        to="/overview"
        title="Listenansicht"
        class="hidden md:block"
      >
        <lord-icon
          src="/icons/overview.json"
          trigger="hover"
          style="width: 32px; height: 32px"
        />
      </NuxtLink>
      <NuxtLink
        to="/map"
        title="Kartenansicht"
        class="hidden md:block"
      >
        <lord-icon
          src="/icons/map.json"
          trigger="hover"
          style="width: 32px; height: 32px"
        />
      </NuxtLink>
      <div class="favorites relative cursor-pointer">
        <lord-icon
          src="/icons/heart.json"
          trigger="morph"
          state="morph-heart"
          style="width: 32px; height: 32px"
        />
        <ClientOnly>
          <span
            class="top absolute right-0 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[0.5rem] font-bold leading-none text-white"
            ><ClientOnly fallback="0">{{ favorites.length }}</ClientOnly></span
          >
        </ClientOnly>
      </div>
    </div>
    <HamburgerMenu @click="() => showSiteMenu(true)" />
    <div
      class="fixed left-0 top-0 z-40 flex h-screen w-[calc(100vw-1rem)] flex-col items-center bg-background px-4 pb-16 pt-4 transition-opacity duration-300"
      :class="{
        'opacity-0': siteMenuVisibility.closing,
        'opacity-100':
          siteMenuVisibility.visible && !siteMenuVisibility.closing,
        invisible: !siteMenuVisibility.visible,
      }"
    >
      <div class="ml-auto flex items-center">
        <div
          class="relative h-12 w-8 cursor-pointer"
          @click="() => showSiteMenu(false)"
        >
          <span
            class="absolute top-0 h-0.5 w-8 translate-y-6 rotate-45 rounded-full bg-accent"
          ></span>
          <span
            class="absolute top-0 h-0.5 w-8 translate-y-6 -rotate-45 rounded-full bg-accent"
          ></span>
        </div>
      </div>
      <div class="my-auto flex flex-col gap-4 text-right">
        <NuxtLink
          v-for="link in [
            {
              name: 'Home',
              path: '/',
            },
            {
              name: 'Alle Wohnungen',
              path: '/overview',
            },
            {
              name: 'Karte',
              path: '/map',
            },
          ]"
          :key="link.path"
          :to="link.path"
          class="text-xl font-medium"
          :class="{
            'text-accent': route.path === link.path,
            'text-main': route.path !== link.path,
          }"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
