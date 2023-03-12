<template lang="pug">
div(class=" w-full md:h-screen  flex flex-col lg:flex-row -mt-20 ")
  div(class="lg:w-[45%] w-full h-screen flex flex-col px-8 items-center ")
    div.login-header(class="w-full h-auto")
      nuxt-img(src="images/arrow-logo.png" class=" object-cover" width="190" format="webp")
    div.login-header(class="w-full h-auto flex flex-col items-center mt-6 text-center")
        h1(class="font-robotolight text-2xl md:text-3xl") Welcome back on Arrow's carrier page
        p(class="font-robotolight text-base") Login to your account
    div(class="flex lg:w-5/6 xl:w-3/4 flex-col md:px-8 items-center space-y-6 w-full h-full justify-center mb-32")
      
      div.email(class=" w-full")
        p(class="font-roboto") Email
        input(type="text" class="w-full h-10 border-2 border-gray-300 rounded-lg px-2")
      div.password(class="w-full relative")
        p(class="font-roboto") Password
        input(type="password" class="w-full h-10 border-2 border-gray-300 rounded-lg px-2" id="password-input")
        button(type="button" class="absolute right-2 top-1/2  bg-white px-2 rounded-md ", id="password-toggle")
            HideIcon(v-if="!is_password_visible" class="w-6 h-6")
            ShowIcon(v-else class="w-6 h-6")
      div.login-options(class=" flex flex-row w-full justify-between items-center")
        div.remember-me(class="flex flex-row items-center space-x-2")
          input.remember-me(type="checkbox" class="w-4 h-4")
          p(class="font-roboto") Remember me
        p(class="font-roboto hover:cursor-pointer") Forgot password?
      button.login-button(class="w-full h-10 bg-black text-white rounded-lg") Login
      p(class="absolute bottom-6 text-lg") Dont have an account? 
        span(class="font-semibold hover:cursor-pointer") Sign up
  nuxt-img(src="https://www.arrow.com/company/wp-content/uploads/2022/08/Venlo-5.png" class="lg:w-[55%] w-full h-[100vh] object-cover" format="webp")
</template>

<script setup lang="ts">
// If you are using PurgeCSS, make sure to whitelistgi the carousel CSS classes

import { onMounted } from "vue";
import type { Ref } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useMainStore } from "@/stores/Main";

import HideIcon from "~icons/bxs/hide";
import ShowIcon from "~icons/bxs/show";
const { t } = useLang();
const route = useRoute();
const message = ref();
const { data: messageData } = await useFetch("api/test");
message.value = messageData.value;
const mainStore = useMainStore();

//x-nf-client-connection-ip
//
//const locationModal = resolveComponent("ModalLocation");
//mainStore.value = useMainStore();
//mainStore.value.initialize(); //

const islocationModal = ref();
// console.log(mainStore.value.getIsLocaleSet);

// if (mainStore.value.getIsLocaleSet === false) {
//   // opening location modal if user hasn't set locale yet
//   islocationModal.value = true;
// } else {
//   islocationModal.value = false;
// }
console.log(islocationModal.value);
const config = useRuntimeConfig();
//const localeSetting = useState<string>("locale.setting");

// ------------------ is's ------------------ //
const is_password_visible = ref(false);

onMounted(() => {
  const passwordInput = document.getElementById(
    "password-input"
  ) as HTMLInputElement;
  const passwordToggle = document.getElementById(
    "password-toggle"
  ) as HTMLButtonElement;
  passwordToggle.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      is_password_visible.value = true;
    } else {
      passwordInput.type = "password";
      is_password_visible.value = false;
    }
  });
});
</script>

<style lang="sass">







.full-width
  width: 100vw
  position: relative
  left: 50%
  right: 50%
  margin-left: -50vw
  margin-right: -50vw



.advantage
  opacity: 0

.advantage-visible
  opacity: 1

.product
  opacity: 0
</style>
