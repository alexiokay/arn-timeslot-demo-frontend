<template lang="pug">
div.schedule(class="flex flex-col w-full h-auto ")
    CalendarScheduleSidebar(:class="isScheduleSidebarOpen? '': 'hidden'" class="" :date="props.date" :timeslots="timeslots")
    p.schedule-title(class="flex w-full h-[4rem] justify-between text-center items-start")
        span(class="text-lg text-center rounded-lg flex items-center justify-center") {{props.date}}
    hr(class="w-full h-[2.5px] bg-black")
    div(class="overflow-auto ")
        div(class="flex  w-auto items-center py-5 " v-for="timeslot in timeslots")
            div(class="flex flex-col w-4/5" )
                p(class="text-3xl font-semibold") {{timeslot?.start_time}} - {{timeslot?.end_time}}
                p trucks left: {{defaultSettings.max_amount_of_trucks_per_hour - timeslot?.amount_of_trucks}}
            button.book-button(v-if="timeslot?.is_open" @click="book(timeslot?.id)"  class="w-1/5 h-[3rem] bg-violet-600 text-white rounded-lg") Book
            button(v-else class="w-1/5 h-[3rem]  text-black rounded-lg") Reserved
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/Main";
// import { Timeslot } from "@/types/timeslot";
import uniqid from "uniqid";
const mainStore = useMainStore();
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});

// generating empty timeslots for the day in range of workable hours
const generateEmptyTimeslots = () => {
  const timeslots = [];
  const [startHour, endHour] = mainStore.default_settings.workable_times
    .split("-")
    .map((hour) => parseInt(hour));

  for (let hour: any = startHour; hour <= endHour; hour++) {
    timeslots.push({
      id: parseInt(uniqid(), 36),
      start_time: `${hour}:00`,
      end_time: `${hour + 1}:00`,
      amount_of_trucks: 0,
      is_open: true,
    });
  }
  return timeslots;
};
// timeslots from database
// const timeslotsData = computed(() => mainStore.getTimeslotsByDate(props.date));
const dates = mainStore.getDates;
const emptyTimeslots = generateEmptyTimeslots();

const mergeTimeslots = () => {
  const existingTimeslots: any = [];
  dates.forEach((date: any) => {
    if (date.date === props.date) {
      existingTimeslots.push(...date.timeslots);
    }
  });

  // Loop through each empty timeslot and check if it already exists in the existing timeslots array
  const newTimeslots = emptyTimeslots.filter((emptySlot) => {
    return !existingTimeslots.some((existingSlot: any) => {
      return (
        existingSlot.start_time === emptySlot.start_time &&
        existingSlot.end_time === emptySlot.end_time
      );
    });
  });

  // Merge the existing timeslots and new timeslots to create the updated timeslots array
  const updatedTimeslots = [...existingTimeslots, ...newTimeslots];

  // Return the updated date object with the updated timeslots array
  const mergedTimeslots = {
    ...dates,
    timeslots: updatedTimeslots,
  };
  return mergedTimeslots.timeslots;
};

const timeslots = computed(() => mergeTimeslots());

const isScheduleSidebarOpen = ref(false);
const defaultSettings = mainStore.getDefaulSettings;

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
