<template lang="pug">
div#sidebar(class="w-[20rem] h-screen bg-white px-2 py-4 rounded-r-lg text-black items-center flex flex-col")
    div#sidebar-header(class="relative w-full px-3 flex flex-col h-full justify-between items-start")
        nuxt-img(src="images/arrow-logo-2.png" width="150" height="30" format="webp" class="")
        h1(class="text-lg ") Carrier's  Workspace
        div#sidebar-toggle(class="absolute top-1 -right-7 p-2 w-11 h-11 rounded-full bg-[#FAF9FC] flex flex-row justify-center items-center")
            div(@click="is_sidebar_open = !is_sidebar_open" class=" hover:cursor-pointer w-full h-full bg-slate-200 rounded-full")
                ArrowIcon(:class="!is_sidebar_open? 'animate-spinOnceBack': 'animate-spinOnce '" class="w-full h-full  ")
        div#sidebar-content(class="relative w-full h-full flex flex-col justify-start items-start mt-4 gap-y-6 rounded-md ")
            
            div(class="w-full h-auto flex flex-col  items-start mt-4 space-y-3")
                ButtonSidebar(to="/dashboard/requests" text="Requests" :notifications_count="2" )
                    template(v-slot:icon)
                        InfoIcon(class="w-6 h-6")
                ButtonSidebar(to="/dashboard/notifications" text="Notifications" :notifications_count="1" :is_active="false")
                    template(v-slot:icon)
                        NotificationIcon(class="w-6 h-6")
            hr(class="w-[17rem] border-gray-300 -mx-5 " )
            div(class="w-full h-full flex flex-col  items-start mt-4 space-y-3")
                ButtonSidebar(text="Dashboard" to="/dashboard" :notifications_count="2" )
                    template(v-slot:icon)
                        DashboardIcon(class="w-6 h-6")
                ButtonSidebar(text="Timeslots" to="/dashboard/timeslots" )
                    template(v-slot:icon)
                        TimeslotsIcon(class="w-6 h-6")
                ButtonSidebar(text="Shipments" )
                    template(v-slot:icon)
                        ShippingIcon(class="w-6 h-6")
                ButtonSidebar(text="Accounts" to="/dashboard/accounts" )
                    template(v-slot:icon)
                        AccountsIcon(class="w-6 h-6")
            
            button(class="w-full h-[5rem] px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700")
                p + Reserve Timeslot
            hr(class="w-[17rem] border-gray-300 -mx-5 " )
            UserInfo
</template>

<script setup lang="ts">
import InfoIcon from "~icons/material-symbols/info-outline";
import ShippingIcon from "~icons/material-symbols/local-shipping-outline-rounded";
import TimeslotsIcon from "~icons/ic/round-access-time";
import AccountsIcon from "~icons/line-md/account";
import NotificationIcon from "~icons/basil/notification-outline";
import ArrowIcon from "~icons/material-symbols/chevron-left-rounded";
import DashboardIcon from "~icons/ant-design/home-outlined";

// ------ is's ------ //
const is_sidebar_open = ref(false);
</script>

<style lang="scss"></style>
