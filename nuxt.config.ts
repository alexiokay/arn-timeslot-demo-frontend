import { defineNuxtConfig } from "nuxt/config";
import Icons from "unplugin-icons/vite";
import { IntlifyModuleOptions } from "@intlify/nuxt3";

declare module "@nuxt/schema" {
  interface NuxtConfig {
    intlify?: IntlifyModuleOptions;
  }
}
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate", "useStore"],
      },
    ],
    "@intlify/nuxt3",
    "@nuxt/image-edge",
  ],

  build: {
    transpile: ["swiper", "@googlemaps/js-api-loader", "@headlessui/vue"],
  },

  content: {
    // https://content.nuxtjs.org/api/configuration
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/sitemap.xml", "/portfolio"],
    },
  },

  routeRules: {
    // Static page generated on-demand, revalidates in background (ISG)

    "/**": { ssr: true },
    "/cart": { ssr: false },
    // Static page generated on-demand once (SSG - or at least mighty close) { static: true },

    // Render these routes on the client (SPA) { ssr: false },
  },
  intlify: {
    localeDir: "locales",
    vueI18n: {
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en", "id", "ja", "ko", "pl", "de", "zh"],
    },
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Arrow Logistics Management System | Streamline Your Supply Chain",
      meta: [
        // <meta name="description" content="My amazing site">
        {
          hid: `description`,
          name: "description",
          content:
            " Our logistics management system simplifies your supply chain, allowing you to track shipments, manage carrier accounts, and set up workable times. Arrow's innovative technology optimizes your logistics operations, delivering value and efficiency to your business.",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "images/arrow.ico" }],
    },
  },

  css: ["@/assets/css/styles.css"],

  vite: {
    plugins: [
      Icons({
        // the feature below is experimental ⬇️
        autoInstall: true,
      }),
    ],
  },

  runtimeConfig: {
    public: {
      stripePrices: {
        test: "1",
      },
      cwd: process.cwd(),
      BASE_URL: process.env.BASE_URL,
      API_TOKEN: process.env.API_TOKEN,
      API_URL: process.env.API_URL,
      HOST: process.env.HOST,
    },
  },
});
