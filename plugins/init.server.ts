import { useMainStore } from "@/stores/Main";

export default defineNuxtPlugin(async (nuxtApp) => {
  const main = useMainStore(nuxtApp.$pinia);

  await main.initialize();
});
