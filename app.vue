<script setup lang="ts">
const currentUrl = useRequestURL().origin;
useHead({
  title: "ApartiFind - Berlins Wohnungsmarkt auf einen Blick",
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        "ApartiFind - Berlins Wohnungsmarkt auf einen Blick. Finde die passende Hausverwaltung für deine Wohnung.",
    },
    {
      hid: "og:title",
      property: "og:title",
      content: "ApartiFind - Berlins Wohnungsmarkt auf einen Blick",
    },
    {
      hid: "og:description",
      property: "og:description",
      content:
        "ApartiFind - Berlins Wohnungsmarkt auf einen Blick. Finde die passende Hausverwaltung für deine Wohnung.",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: `${currentUrl}/og-image.png`,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: currentUrl,
    },
    {
      hid: "twitter:title",
      property: "twitter:title",
      content: "ApartiFind - Berlins Wohnungsmarkt auf einen Blick",
    },
    {
      hid: "twitter:description",
      property: "twitter:description",
      content:
        "ApartiFind - Berlins Wohnungsmarkt auf einen Blick. Finde die passende Hausverwaltung für deine Wohnung.",
    },
    {
      hid: "twitter:image",
      property: "twitter:image",
      content: `${currentUrl}/og-image.png`,
    },
    {
      hid: "twitter:card",
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "lang",
      property: "lang",
      content: "de",
    },
  ],
  bodyAttrs: {
    class: "antialiased min-h-dvh h-1",
  },
});

const loadingIndicator = useCustomLoadingIndicator();
const nuxtApp = useNuxtApp();
const _cleanup: Array<() => void> = [];
const pageLoading = ref(false);
onMounted(() => {
  _cleanup.push(
    nuxtApp.hook("page:loading:start", () => {
      pageLoading.value = true;
    }),
  );

  _cleanup.push(
    nuxtApp.hook("page:loading:end", () => {
      pageLoading.value = false;
    }),
  );

  _cleanup.push(
    nuxtApp.hook("page:finish", () => {
      pageLoading.value = false;
    }),
  );

  _cleanup.push(
    nuxtApp.hook("vue:error", () => {
      pageLoading.value = false;
    }),
  );

  _cleanup.push(
    loadingIndicator.registerLoadingRef(pageLoading, (l) => l.value),
  );
});
onUnmounted(() => _cleanup.forEach((hook) => hook()));
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
#__nuxt {
  height: 100%;
}
</style>
