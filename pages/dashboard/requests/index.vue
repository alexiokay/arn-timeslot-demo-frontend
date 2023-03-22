<template lang="pug">
div#requests(class="text-black w-full h-full px-6 py-[0.4rem] flex flex-row flex-wrap gap-y-[2rem] justify-between items-center")
    
    Searchbar
    div#requests-menu(class="w-full flex")
        div(class="flex space-x-2 items-center justify-start ")
            h1(class="text-xl w-auto font-semibold mr-[1.5rem]") Requests
            ButtonMenu2(text="Pending" :active="active_menu == 'pending'" @click="active_menu = 'pending'" )
            ButtonMenu2(text="Arrival" :active="active_menu == 'arrival'" @click="active_menu = 'arrival'")
            ButtonMenu2(text="Completed" :active="active_menu == 'completed'" @click="active_menu = 'completed'")
            ButtonMenu2(text="Cancelled" :active="active_menu == 'cancelled'" @click="active_menu = 'cancelled'")
       
        div#requests-menu-sorting(class="ml-auto   px-2 flex items-center justify-center space-x-2 w-auto h-[2.5rem] rounded-lg bg-white text-black")
            p(class="text-sm") Sort by:
            select#sorting(class="w-auto h-[2.5rem] focus:border-0 focus:outline-none text-black")
                option(value="newest") Newest
                option(value="oldest") Oldest
           
    Request(class="w-[calc(50%-1rem)]" v-for="reservation in reservations" :key="reservation.id" :reservation="reservation")

</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/User";
import { useMainStore } from "@/stores/Main";
const userStore = useUserStore();
const mainStore = useMainStore();

const active_menu = ref("pending");

const reservations = computed(() => {
  if (active_menu.value == "pending")
    return mainStore.getReservations.filter(
      (reservation) => reservation.status == "New"
    );
  else if (active_menu.value == "arrival")
    return mainStore.getReservations.filter(
      (reservation) =>
        reservation.status == "ARROW_APPROVED" ||
        reservation.status == "CARRIER_APPROVED"
    );
  else if (active_menu.value == "completed")
    return mainStore.getReservations.filter(
      (reservation) => reservation.status == "Completed"
    );
  else if (active_menu.value == "cancelled")
    return mainStore.getReservations.filter(
      (reservation) => reservation.status == "Cancelled"
    );
});

definePageMeta({
  middleware: ["redirect-if-not-logged"],
  // or middleware: 'auth'
});
</script>

<style lang="scss"></style>
