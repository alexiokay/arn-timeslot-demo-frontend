<template lang="pug">
div.schedule(class="flex flex-col w-full h-auto ")
    CalendarScheduleSidebar(:class="isScheduleSidebarOpen? '': 'hidden'" class="" :date="props.date" :timeslots="timeslots")
    p.schedule-title(class="flex w-full h-[4rem] justify-between text-center items-start")
        span(class="text-lg text-center rounded-lg flex items-center justify-center") {{props.date}}
    hr(class="w-full h-[2px] bg-black")
    div(class="overflow-auto max-h-[calc(100vh-19rem)]")
        div(class="flex  w-auto items-center py-5 " v-for="timeslot in timeslots")
            div(class="flex flex-col w-4/5" )
                p(class="text-3xl font-semibold") {{timeslot?.start}} - {{timeslot?.end}}
                p trucks left: {{defaultSettings.max_amount_of_trucks_per_hour - timeslot?.amount_of_trucks}}
            button.book-button(v-if="timeslot?.is_avalible" @click="book(timeslot?.id)"  class="w-1/5 h-[3rem] bg-violet-600 text-white rounded-lg") Book
            button(v-else class="w-1/5 h-[3rem]  text-black rounded-lg") Reserved
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/Main";
const mainStore = useMainStore();
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});

console.log(props.date);
const isScheduleSidebarOpen = ref(false);
const defaultSettings = mainStore.getDefaulSettings;
const timeslots = computed(() => mainStore.getTimeslotsByDate(props.date));
console.log(timeslots);

//TODO! Fetch timeslots for selected date (close? litimed hours?) from arrow's settings

const book = (timeslotId: number) => {
  isScheduleSidebarOpen.value = !isScheduleSidebarOpen.value;
};
onMounted(() => {
  document.addEventListener("mousedown", (e: any) => {
    if (
      e.target !== document.querySelector(".book-button") &&
      !e.target.closest("#schedule-sidebar")
    ) {
      isScheduleSidebarOpen.value = false;
    }
  });
});
</script>

<style lang="scss"></style>
