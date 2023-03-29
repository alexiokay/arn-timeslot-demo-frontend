<template lang="pug">
div(class=" w-full md:h-screen  flex flex-col lg:flex-row  ")
  div(class="lg:w-[50%] xl:w-[45%] w-full h-screen flex flex-col px-8 items-center ")
    div.login-header(class="w-full h-auto flex space-x-8")
      nuxt-img(src="images/arrow-logo.png" class=" object-cover" width="190" format="webp")
      div.login-header(class="w-auto h-auto flex flex-col  mt-6")
          h1(class="font-robotolight text-xl  md:text-2xl xl:text-3xl") Arrow's carrier page
          p(class="font-robotolight text-base") Login to your account
    div.account-type-select(class="w-full lg:w-5/6 xl:w-3/4 h-auto  md:px-8 mt-12")
   
        div(class="flex w-full h-[3.3rem] bg-white rounded-lg p-1  select-none")
          div(@click="isArrowEmployee = false" :class="!isArrowEmployee? 'bg-black text-white': 'hover:bg-white hover:cursor-pointer'" class="w-1/2 h-full  flex items-center justify-center rounded-lg  ")
            p(class="font-roboto") Carrier
          div(@click="isArrowEmployee = true" :class="isArrowEmployee? 'bg-black text-white': 'hover:bg-white hover:cursor-pointer'" class=" w-1/2 h-full border-r-gray-300 rounded-lg  flex items-center justify-center")
            p(class="font-roboto text-center") Arrow's Employee
          
    div(class="flex lg:w-5/6 xl:w-3/4 flex-col md:px-8 items-center space-y-6 w-full h-full justify-start mb-32 mt-4")
      div.carrier( v-if="!isArrowEmployee" class="w-full")
        p(class="font-roboto") Carrier
        select(v-model="carrier" class="w-full h-10 border-2 border-gray-300 rounded-lg px-2")
          option(v-for="carrier in carriers.carriers" :value="carrier.name" :class="carrier.is_activated? '': 'hidden'") {{carrier.name}}
      div.email(class=" w-full")
        p(class="font-roboto") Email
        input(@keydown.enter="login" type="text" v-model="email" class="w-full h-10 border-2 border-gray-300 rounded-lg px-2")
      div.password(class="w-full relative")
        p(class="font-roboto") Password
        input(@keydown.enter="login" type="password" v-model="password" class="w-full h-10 border-2 border-gray-300 rounded-lg px-2" id="password-input")
        button(type="button" class="absolute right-2 top-1/2  bg-white px-2 rounded-md ", id="password-toggle")
            HideIcon(v-if="!is_password_visible" class="w-6 h-6")
            ShowIcon(v-else class="w-6 h-6")
      div.login-options(class=" flex flex-row w-full justify-between items-center")
        div.remember-me(class="flex flex-row items-center space-x-2")
          input.remember-me(type="checkbox" class="w-4 h-4")
          p(class="font-roboto") Remember me
        p(class="font-roboto hover:cursor-pointer") Forgot password?
      button.login-button(@click="login" class="w-full h-10 bg-black text-white rounded-lg") Login
      p(class="absolute bottom-6 text-lg") Dont have an account? 
        span(@click="router.push(`/signup/${isArrowEmployee? 'arrow': 'carrier'}`)" class="font-semibold hover:cursor-pointer") Sign up as 
          span(class=" underline") {{ isArrowEmployee? "Arrow's Employee": "Carrier" }}
  nuxt-img(src="https://www.arrow.com/company/wp-content/uploads/2022/08/Venlo-5.png" class="xl:w-[55%] lg:w-[50%] w-full h-[100vh] object-cover" format="webp")
</template>

<script setup lang="ts">
// If you are using PurgeCSS, make sure to whitelistgi the carousel CSS classes

import { onMounted } from "vue";
import type { Ref } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useMainStore } from "@/stores/Main";
import { useSettingsStore } from "@/stores/Settings";
import { useUserStore } from "@/stores/User";

import HideIcon from "~icons/bxs/hide";
import ShowIcon from "~icons/bxs/show";

definePageMeta({
  middleware: ["redirect-if-logged"],
  // or middleware: 'auth'
});

const settingsStore = useSettingsStore();
const userStore = useUserStore();
const mainStore = useMainStore();

const { t } = useLang();
const router = useRouter();
const config = useRuntimeConfig();
const message = ref();
const { data: messageData } = await useFetch("api/test");
message.value = messageData.value;

const carriers = await getCarriers();
// ------------------ is's ------------------ //
const is_password_visible = ref(false);
const islocationModal = ref();
const isArrowEmployee = ref(
  userStore.default_login_mode === "carrier" ? false : true
);
const email = ref();
const password = ref();
const carrier = ref();
console.log(islocationModal.value);

const login = async () => {
  const body = isArrowEmployee.value
    ? {
        email: `${email.value}`,
        password: `${password.value}`,
      }
    : {
        email: `${email.value}`,
        password: `${password.value}`,
        carrier: `${carrier.value}`,
      };

  const url = isArrowEmployee.value
    ? `${config.API_URL}auth/login/arrow`
    : `${config.API_URL}auth/login/carrier`;
  await fetch(url, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      Host: `${config.FETCH_HOST}`,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.non_field_errors) {
        alert(data.non_field_errors[0]);
        return;
      }
      userStore.setUser(data);
      //console.log("saved: ", userStore.getUser);
      router.push("/dashboard");
    })
    .catch((err) => {
      console.log(err);
    });
};

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
