import tailwindcss from "@tailwindcss/vite";
import { execSync } from "node:child_process";

import { getEnv } from "./lib/env";

const _env = getEnv();
let gitVersion = "0.0";
try {
  gitVersion = execSync("git rev-parse --short HEAD").toString().trim();
}
catch (error) {
  console.warn("Could not retrieve Git version:", error);
}

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/leaflet",
  ],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  colorMode: {
    dataValue: "theme",
  },
  runtimeConfig: {
    public: {
      appVersion: gitVersion,
    },
  },
});
