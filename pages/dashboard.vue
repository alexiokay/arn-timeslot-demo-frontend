<template lang="pug">

div#sidebar(class="w-[20rem] h-screen bg-white px-2 py-4  text-black items-center flex flex-col")
    div#sidebar-header(class="relative w-full px-3 flex flex-col h-full justify-between items-start")
        nuxt-img(src="images/arrow-logo-2.png" width="150" height="30" format="webp" class="")
        h1(class="text-lg ") Carrier's  Workspace
        div#sidebar-toggle(class="absolute top-1 -right-7 p-2 w-11 h-11 rounded-full bg-[#FAF9FC] flex flex-row justify-center items-center")
            div(@click="is_sidebar_open = ! is_sidebar_open" class="w-full h-full bg-slate-200 rounded-full")
                ArrowIcon(:class="is_sidebar_open? 'rotate-180': 'translate-y-0'" class="w-full h-full animate-spinOnce")
        div#sidebar-content(class="relative w-full h-full flex flex-col justify-start items-start mt-4 gap-y-6 rounded-md ")
            
            div(class="w-full h-auto flex flex-col  items-start mt-4 space-y-3")
                ButtonSidebar(text="Requests" :notifications_count="2" )
                    template(v-slot:icon)
                        InfoIcon(class="w-6 h-6")
                ButtonSidebar(text="Notifications" :notifications_count="1" :is_active="false")
                    template(v-slot:icon)
                        NotificationIcon(class="w-6 h-6")
            hr(class="w-[17rem] border-gray-300 -mx-5 " )
            div(class="w-full h-full flex flex-col  items-start mt-4 space-y-3")
                ButtonSidebar(text="Dashboard" :notifications_count="2" )
                    template(v-slot:icon)
                        DashboardIcon(class="w-6 h-6")
                ButtonSidebar(text="Shipments" )
                    template(v-slot:icon)
                        ShippingIcon(class="w-6 h-6")
                ButtonSidebar(text="Accounts"  )
                    template(v-slot:icon)
                        AccountsIcon(class="w-6 h-6")
          
            button(class="w-full h-[5rem] px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700")
                p + Create Shipments
            hr(class="w-[17rem] border-gray-300 -mx-5 " )
            div#user-info(class="w-full h-auto flex justify-between items-center ")
                nuxt-img(src="images/arrow-logo-2.png" width="150" height="30" format="webp" class="w-12 h-12 rounded-full")
                div(class="flex flex-col h-full justify-around")
                    p(class="font-semibold") Daniel Steward
                    p(class="text-xs font-semibold text-gray-500") DHL - Manager
                UserOptionsIcon(class="w-6 h-6")
                    
div#content(class="text-black w-full")
    h2 Welcome to the Dashboard!
    p Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus auctor ligula, non pulvinar nisi vehicula non.
    p Suspendisse consectetur tincidunt est, id venenatis mi convallis sit amet
</template>

<script setup lang="ts">
import InfoIcon from "~icons/material-symbols/info-outline";
import ShippingIcon from "~icons/material-symbols/local-shipping-outline-rounded";
import AccountsIcon from "~icons/line-md/account";
import NotificationIcon from "~icons/basil/notification-outline";
import ArrowIcon from "~icons/material-symbols/chevron-left-rounded";
import DashboardIcon from "~icons/ant-design/home-outlined";
import UserOptionsIcon from "~icons/mi/options-horizontal";

// ------ is's ------ //
const is_sidebar_open = ref(false);
onMounted(() => {});
</script>

<style lang="scss"></style>
