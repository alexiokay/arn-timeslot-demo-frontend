script
<template lang="pug">
div(id="default" style=""  :class="{ 'theme-arrow-light': dataTheme === 'arrow-light', 'theme-arrow-dark': dataTheme === 'arrow-dark', 'theme-carrier-light': dataTheme === 'carrier-light', 'theme-carrier-dark': dataTheme === 'carrier-dark'  }" class=" h-auto flex flex-row bg-themeBackground justify-center items-start w-full  "  )
    button(@click="userStore.setDark" class="bg-white w-10 h-10 rounded-full shadow-md absolute top-4 right-4 flex items-center justify-center z-50")

        MoonIcon(v-if="userStore.getTheme.split('-')[1] === 'dark'" class="w-6 h-6 text-gray-700")
        SunIcon(v-else class="w-6 h-6 text-gray-700")
    div#overlay(class="absolute overlaying top-0 left-0 w-full h-screen bg-black opacity-40 z-10 hidden-overlay")
    .navigation(v-if="userStore.isLogged")
      div(class="flex lg:hidden w-full h-[4rem] bg-white shadow-sm fixed top-0 z-10")
      Sidebar(class="z-50 ")
    
    div(class=" w-full  h-auto min-h-screen mt-[3rem] lg:mt-0 text-themeText" :class="route.path!=='/'  && route.path!=='/signup/carrier' && route.path!=='/signup/arrow' ? 'lg:px-8 py-7 lg:ml-[20rem]' : ''")
      <slot class="" />
    Footer(v-if="route.path!=='/' && route.path!=='/signup'" class="mt-12")
div(class="cursor cursor--small")

</template>

<script setup lang="ts">
import IconFb from "~icons/ic/baseline-facebook";
import IconPhone from "~icons/ic/baseline-phone";
import IconEmail from "~icons/material-symbols/alternate-email";
import MoonIcon from "~icons/ph/moon";
import SunIcon from "~icons/ph/sun";

import { onBeforeMount } from "vue";
import { useUserStore } from "@/stores/User";
import { useColorMode } from "@vueuse/core";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const dataTheme = computed(() => {
  return userStore.getTheme;
});

const mode = useColorMode();

const sendEmail = () => {
  document.location = "mailto:graphicdesigner@gmail.com";
};

onMounted(() => {});
</script>

<style lang="scss">
.theme-arrow-light {
  --background: #f9f9fb;
  --background2: #ffffff;
  --background3: #f1f4f5;
  --button: #8b5cf6;
  --secondary: #f8f8f8;
  --hint: #bfdbfe;
  --text: #313131;
  --text2: #bababa;
  --border: #eaeaea;
  --border2: #dedede;
}

.theme-arrow-dark {
  --background: rgb(21, 21, 21);
  --background2: #1d1d1d;
  --background3: #313131;
  --button: #8b5cf6;
  --buttonHover: #8b5cf6;
  --secondary: #f8f8f8;
  --hint: #313131;
  --text: #f8f8f8;
  --text2: #bababa;
  --border: #525252;
  --border2: #656565;
}

.theme-carrier-dark {
  --background: #f8f8f8;
  --background2: #f8f8f8;
  --background3: #ffffff;
  --button: #8b5cf6;
  --text: #313131;
}

.theme-carrier-light {
  --background: #f8f8f8;
  --background2: #f8f8f8;
  --background3: #ffffff;
  --button: #8b5cf6;
  --text: #313131;
}
</style>

<style lang="sass">


*
    scroll-snap-type: y mandatory

body
    overflow-x: hidden


.app-container

    z-index: 10
    display: flex
    flex-direction: column
    justify-content: center



.panel
    margin-top: 60px
    text-align: center
    margin: 0 auto
    scroll-snap-align: center

    width: 90%
    p.title

        font-style: normal
        font-size: 5vh
        line-height: 0%
        align-self: center
        letter-spacing: 0.18em





.cursor
  position: fixed
  left: 0
  top: 0
  pointer-events: none

.cursor--small
  width: 5px
  height: 5px
  left: -2.5px
  top: -2.5px
  border-radius: 50%
  z-index: 11000
  background: var(--color-text)

.cursor--canvas
  width: 100vw
  height: 100vh
  z-index: 12000

.hidden-overlay
  visibility: hidden
  opacity: 0

.visible-overlay
  visibility: visible
  opacity: 0.4
</style>
