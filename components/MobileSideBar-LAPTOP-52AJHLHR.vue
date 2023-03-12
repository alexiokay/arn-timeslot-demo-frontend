<template lang="pug">


div#sidebar-open( class='w-[calc(30vw+10em)] h-screen gap-y-2 px-4 flex flex-col bg-white drop-shadow-xl fixed z-40 top-0 left-0')
    
    div.w-full.h-auto.flex.justify-between.text-3xl
        p Menu
        CloseIcon(@click="closeMobileNavbar" class="hover:cursor-pointer")
    hr
    NuxtLink(@click="closeMobileNavbar" class="smooth-color   hover:text-gray-400  " to="/configurator") {{$t('pages.configurator.nav').toUpperCase()}}
    hr
    NuxtLink(@click="closeMobileNavbar" class="smooth-color    hover:text-gray-400  " to="/shop") {{$t('pages.shop.nav').toUpperCase()}}
    hr
    NuxtLink(@click="showServices" class="smooth-color   hover:text-gray-400  " to="/") SERVICES
    div#services-mobile-dropdown(class=" hidden flex-col space-y-2 ml-4")
        NuxtLink(@click="closeMobileNavbar" class="smooth-color   hover:text-gray-400  " to="/about") ToiToiServices
        NuxtLink(@click="closeMobileNavbar" class="smooth-color   hover:text-gray-400  " to="/about") Water Irrigation System
        NuxtLink(@click="closeMobileNavbar" class="smooth-color   hover:text-gray-400  " to="/about") Work Agency
   
    hr
    NuxtLink(@click="toContact" class="smooth-color   hover:text-gray-400  " to="/") CONTACT
    hr


</template>

<script setup lang="ts">
import { useMainStore } from "../stores/Main";
import CloseIcon from "~icons/ic/outline-close";
const { t } = useLang();
const route = useRoute();
const router = useRouter();

const showServices = () => {
  const services = document?.getElementById("services-mobile-dropdown");
  services?.classList.toggle("hidden");
  services?.classList.toggle("flex");
};

let store: any = ref(useMainStore());

store.value = useMainStore();

const closeMobileNavbar = () => {
  store.value.hideMobileNavbar();
};

const toContact = () => {
  router.push({ name: "index" });
  setTimeout(() => {
    scrollToContact();
    closeMobileNavbar();
  }, 100);
};

const scrollToContact = () => {
  const contact = document?.getElementById("contact");
  contact?.scrollIntoView({ behavior: "auto" });
  contact?.classList.add("shake");
};
</script>

<style lang="sass">
.hide-left
  animation: hide-left 0.5s ease-in-out forwards

@keyframes hide-left
    from
        transform: translateX(0rem)

    to
        transform: translateX(-100%)


.show-right
  animation: show-right 0.5s ease-in-out forwards

@keyframes show-right
    from
        transform: translateX(-25rem)

    to
        transform: translateX(0rem)
</style>
