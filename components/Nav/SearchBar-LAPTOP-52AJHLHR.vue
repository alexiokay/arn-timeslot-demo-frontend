<template lang="pug">
div#searchbar(@click="focusNavbar"  class="flex items-center justify-start text-xl space-x-3 ")
    SearchIcon(class="w-8 h-8 text-black")
    input(type="text" class="w-full h-full pl-2 text-gray-500 focus:text-black focus:outline-none focus:ring-0 focus:border-0" placeholder="Search")
</template>

<script setup lang="ts">
import SearchIcon from "~icons/ri/search-line";
import { useMainStore } from "@/stores/Main";
const mainStore = useMainStore();

const focusNavbar = () => {
  const overlay = document.getElementById("overlay");
  const navbarNavigation = document.getElementById(
    "navbar-navigation"
  ) as HTMLElement;
  const navbarWrapper = document.getElementById(
    "navbar-wrapper"
  ) as HTMLElement;
  const navbarContent = document.getElementById(
    "navbar-content1"
  ) as HTMLElement;
  overlay?.classList.remove("hidden-overlay");
  overlay?.classList.add("visible-overlay");
  navbarWrapper.style.backgroundColor = "rgba(0, 0, 0, 0)";
  navbarContent.style.backgroundColor = "white";
  navbarNavigation.style.opacity = "1";

  console.log(overlay?.classList);
  // mainStore.setOverlaying(true);
};

onMounted(() => {
  const overlay = document.getElementById("overlay");
  const navbarNavigation = document.getElementById(
    "navbar-navigation"
  ) as HTMLElement;
  const navbarWrapper = document.getElementById(
    "navbar-wrapper"
  ) as HTMLElement;
  const navbarContent = document.getElementById(
    "navbar-content1"
  ) as HTMLElement;

  overlay?.addEventListener("click", () => {
    overlay?.classList.remove("visible-overlay");
    overlay?.classList.add("hidden-overlay");
    navbarWrapper.style.backgroundColor = "white";
    navbarContent.style.backgroundColor = "white";

    navbarNavigation.style.opacity = "1";
    console.log(overlay?.classList);
  });
});
</script>

<style lang="scss">
.overlaying {
  transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear;
}
</style>
