<template lang="pug">
div.settings(class="w-full h-full flex flex-col space-y-4")
    NuxtLink(to="/dashboard" class="text-blue-700 hover:underline flex font-semibold  items-center space-x-2") 
        ArrowIcon(class=" rotate-180")
        span Back to Dashboard
    h1(class="text-3xl text-black font-semibold") Settings
    div#settings-menu(class="max-w-min space-x-2 p-[3px] h-[3rem] border-2 rounded-xl border-gray-200 items-center flex justify-start ")
        ButtonMenu(v-for="item in menu" :text="item.text" :to="item.to" :is_active='item.is_active' @setActive="setActive(item)")
    SettingsPanel(v-if="menu[0].is_active" :title="menu[0].text")
</template>

<script setup lang="ts">
import ArrowIcon from "~icons/material-symbols/arrow-right-alt-rounded";
import { useUserStore } from "@/stores/User";
// definePageMeta({
//   middleware: ["auth-arrow-employee"],
//   // or middleware: 'auth'
// });

const userStore = useUserStore();

interface MenuItem {
  text: string;
  is_active: boolean;
}
const setActive = (item: MenuItem) => {
  menu.value.forEach((element) => {
    element.is_active = false;
  });
  item.is_active = true;
};
const menu: Ref<MenuItem[]> = ref([
  {
    text: "General",
    is_active: true,
  },
  {
    text: "Notifications",
    is_active: false,
  },
  {
    text: "Security",
    is_active: false,
  },
  {
    text: "Privacy",
    is_active: false,
  },
  {
    text: "Billing",
    is_active: false,
  },
  {
    text: "Account",
    is_active: false,
  },
]);

if (userStore.getAccountType === "arrow-employee") {
  menu.value.push({
    text: "Arrow",
    is_active: false,
  });
}
</script>

<style lang="sass"></style>
