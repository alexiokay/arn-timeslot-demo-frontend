<template lang="pug">


                    
div#content(class="text-black w-full h-full px-6 py-[0.4rem] flex flex-col justify-start items-start space-y-6")
    Searchbar(:datepicker="true" placeholder="Search by tracking number" class="w-full h-[5rem]")
    div(class='w-full h-auto')
      p(class="text-2xl font-semibold") Overview
    
      div(class="h-[7rem] w-full flex mt-2 justify-between")
        DashboardQuickMenuItem(text="New Packages" value="0")
          template(v-slot:icon)
            PackageIcon(class="w-12 h-12  text-violet-500 ")
        DashboardQuickMenuItem(text="Ready for Shippping" value="0")
        DashboardQuickMenuItem(text="In transit" value="0")
        DashboardQuickMenuItem(text="Delivered" value="0")
    div(class="flex w-full justify-between h-[20rem]")
      DashboardDelayedDelivery(class="")
      DashboardDailyPlan(class="")
      
        
</template>

<script setup lang="ts">
import PackageIcon from "~icons/ph/package-duotone";
import { useUserStore } from "@/stores/User";
import { useMainStore } from "@/stores/Main";
const mainStore = useMainStore();
const userStore = useUserStore();
const route = useRoute();
definePageMeta({
  middleware: ["redirect-if-not-logged"],
});

const config = useRuntimeConfig();
</script>

<style lang="scss"></style>
