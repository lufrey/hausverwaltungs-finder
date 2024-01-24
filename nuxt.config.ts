import { defineNuxtConfig } from "nuxt/config";
import { env } from "./env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  vite: {
    build: {
      target: "esnext",
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/google-fonts",
      {
        preconnect: true,
        prefetch: true,
        preload: true,
        families: {
          Poppins: [300, 400, 500, 600, 700],
        },
      },
    ],
    "@nuxt/image",
  ],
  build: {
    transpile: ["trpc-nuxt"],
  },
  experimental: {
    clientFallback: true,
  },
  runtimeConfig: {
    public: {
      deploymentUrl: "https://apartifind.lksfr.de",
      googleMapsApiKey: env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      googleMapsId: env.NUXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
    },
  },
});
