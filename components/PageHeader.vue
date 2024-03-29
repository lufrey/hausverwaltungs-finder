<script setup lang="ts">
const siteMenuVisibility = ref({
  visible: false,
  closing: true,
});

const iconsContainer = ref<HTMLElement | null>(null);

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
        Array.from(
          iconsContainer.value?.querySelectorAll("lord-icon") ?? [],
        ).forEach((icon) => {
          const playerInstance = (icon as any)?.playerInstance;
          if (!playerInstance) return;
          playerInstance.loop = false;
        });
      }),
    );
  });
});

onUnmounted(() => _cleanup.forEach((hook) => hook()));

// start animation on linkclick
const handleLinkClick = (e: PointerEvent) => {
  if (!(e.target instanceof HTMLElement)) return;
  const tagName = e.target.tagName.toLowerCase();
  const icon =
    tagName === "lord-icon" ? e.target : e.target.querySelector("lord-icon");
  const playerInstance = (icon as any)?.playerInstance;
  if (!playerInstance) return;
  playerInstance.loop = true;
  playerInstance.play();
};
</script>

<template>
  <nav class="flex min-h-12 items-center gap-4 md:justify-between">
    <NuxtLink
      to="/"
      title="Startseite"
      class="logo text-[24px] font-medium text-main md:flex-1"
    >
      <span
        class="-mb-6 inline-flex max-w-40 flex-wrap leading-none tracking-tighter xs:flex-nowrap md:flex-col lg:flex-row"
      >
        <span class="text-accent">Wohnungs</span>
        <span class="text-primary">Markt</span>
        <span class="">Berlin</span>
      </span>
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
      <FavoritesList />
    </div>
    <HamburgerMenu @click="() => showSiteMenu(true)" />
    <div
      class="fixed left-0 top-0 z-40 flex h-screen w-full flex-col items-center bg-background px-4 pb-16 pt-4 transition-opacity duration-300"
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
      <div
        ref="iconsContainer"
        class="my-auto flex flex-col gap-4 text-right"
      >
        <NuxtLink
          v-for="link in [
            {
              name: 'Home',
              path: '/',
              iconSrc: '/icons/home.json',
            },
            {
              name: 'Alle Wohnungen',
              path: '/overview',
              iconSrc: '/icons/overview.json',
            },
            {
              name: 'Karte',
              path: '/map',
              iconSrc: '/icons/map.json',
            },
          ]"
          :key="link.path"
          :to="link.path"
          class="flex items-center justify-end gap-4 text-xl font-medium"
          :class="{
            'text-accent': route.path === link.path,
            'text-main': route.path !== link.path,
          }"
          @click="handleLinkClick"
        >
          {{ link.name }}
          <lord-icon
            :src="link.iconSrc"
            style="width: 42px; height: 42px"
            stroke="bold"
            class="current-color"
          />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
