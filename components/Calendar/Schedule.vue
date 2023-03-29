<template lang="pug">
div.schedule(class="flex flex-col w-full h-auto ")
  
    CalendarScheduleSidebar(:isOpen="isScheduleSidebarOpen" class="" :date="props.date" :timeslots="timeslots" :timeslot="selectedTimeslot")
    p.schedule-title(class="flex w-full h-[4rem] justify-between text-center items-start")
        span(class="text-lg text-center rounded-lg flex items-center justify-center") {{props.date}}
    hr(class="w-full h-[2.5px] bg-black")
    div(class="overflow-auto ")
        div(@click="selectedTimeslot=timeslot" class="flex  w-auto items-center py-5 " v-for="timeslot in timeslots")
            div(class="flex flex-col w-4/5" )
                p(class="text-3xl font-semibold") {{timeslot?.start_time}} - {{timeslot?.end_time}}
                p trucks left: {{ timeslot?.trucks_left }}
            button.book-button(@click="book(timeslot?.id)"  class="w-1/5 h-[3rem] bg-violet-600 text-white rounded-lg") Book

</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/Main";
import { useSettingsStore } from "@/stores/Settings";
// import { Timeslot } from "@/types/timeslot";
import uniqid from "uniqid";
const mainStore = useMainStore();
const settingsStore = useSettingsStore();
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});

// generating empty timeslots for the day in range of workable hours

// timeslots from database
// const timeslotsData = computed(() => mainStore.getTimeslotsByDate(props.date));

const timeslots = computed(() => mainStore.getTimeslotsByDate(props.date));
console.log(timeslots.value);
const selectedTimeslot = ref();
const isScheduleSidebarOpen = ref(false);

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
