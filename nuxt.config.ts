import { resolve } from "node:path";
import { defineNuxtConfig } from "nuxt/config";

import { env } from "./env";
export const deploymentUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://apartifind.lksfr.de";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      script: [
        {
          src: "/lordicon_lib.js",
        },
      ],
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
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["lord-icon"].includes(tag),
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie"),
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
        cloudflare: true,
        display: "swap",
      },
    ],
    "@nuxt/image",
    "@hebilicious/authjs-nuxt",
  ],
  authJs: {
    guestRedirectTo: "/api/auth/signin",
    authenticatedRedirectTo: "/admin/dashboard",
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
  experimental: {
    clientFallback: true,
  },
  runtimeConfig: {
    authJs: {
      secret: env.NUXT_NEXTAUTH_SECRET,
    },
    public: {
      authJs: {
        baseUrl: deploymentUrl,
      },
      deploymentUrl,
      googleMapsApiKey: env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      googleMapsId: env.NUXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
    },
  },
  image: {
    // this default is not really used, because it only works with NuxtPicture
    format: ["avif", "webp", "jpg"],
    domains: [
      "localhost:3000",
      "apartifind.lksfr.de",
      "wohnungsmarktberlin.de",
    ],
  },
  css: ["~/assets/global.css"],
});
