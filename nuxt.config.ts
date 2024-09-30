import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "domain stuff",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "a bunch of tools for domain names",
        },
      ],
      link: [
        { rel: "shortcut icon", type: "image/x-icon", href: "favicon.ico" },
      ],
    },
    baseURL: "/domain-stuff/",
    buildAssetsDir: "assets",
  },
  vite: {
    plugins: [nodePolyfills()],
  },
  modules: ["@nuxtjs/tailwindcss"], // "@nuxt/test-utils/module"
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
