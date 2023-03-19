<template lang="pug">
div#timeslot-top-panel(class="flex w-full h-auto")
    
div(class="flex gap-x-[5rem]")
    
    div#timeslot-left-panel(class="flex w-2/4 flex-col")

        div(class="flex flex-col space-y-4 sticky top-[2.5rem]")
          div(class="flex items-center relative ")
              h1(class="text-3xl font-bold mr-6 w-[10rem]") {{formatedCalendarDate}}
              div(class="p-[2px] rounded-full hover:bg-gray-100 hover:cursor-pointer")
        
                  ArrowIcon(@click="previousMonth()"  class="h-7 w-7 text-gray-600")
              p(class="absolute -top-[1.45rem] left-[13.2rem] w-[2px] h-[2px] text-5xl") .
              div(class="p-[2px] rounded-full hover:bg-gray-100 hover:cursor-pointer")
                  ArrowIcon(@click="nextMonth()" class="rotate-180 h-7 w-7 text-gray-600")
              div(class="absolute flex w-auto right-0 items-center justify-end ")
                CalendarIcon(class="hover:cursor-pointer")
                hr(class="absolute top-[1.7rem] right-0 w-[1.3rem] h-[0.5px] border-gray-300 border-[1px]")
                
          p(class="text-gray-500 w-full") Here all your planned timeslots. You will find information for each timeslot as well you can planned new one
          Calendar(ref="calendar" class="mt-8 " @selectDate="selectDate" :dates="date_objs")
    div#timeslot-right-panel(class="flex w-2/4 flex-col mt-[6rem]")
        CalendarScheduleSidebar(:class="isScheduleSidebarOpen? '': 'hidden'" class="mt-8")
        CalendarSchedule(:selectedTimeslot="formatedScheduleDate" class="mt-8" :date="formatUTCDate(selectedDate)")
</template>

<script setup lang="ts">
import ArrowIcon from "~icons/material-symbols/chevron-left-rounded";

import CalendarIcon from "~icons/mdi/calendar-week";
import { useMainStore } from "@/stores/Main";
const mainStore = useMainStore();

const selectedDate = ref(new Date()); // for calendar and schedule logic
const isScheduleSidebarOpen = ref(false);

const date_objs = computed(() => {
  return mainStore.getDates;
});

const calendar = ref();
const formatCalendarDate = (date: any) => {
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = `${month}' ${year}`;
  return formattedDate;
};

const formatUTCDate = (date: any) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // add leading zero if needed
  const day = date.getDate().toString().padStart(2, "0"); // add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
const formatScheduleDate = (date: Date) => {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dayOfMonth = date.getDate();
  let dayOfWeek = daysOfWeek[date.getDay()];
  let month = monthsOfYear[date.getMonth()];
  let year = date.getFullYear();
  let formattedDate = `${dayOfMonth}, ${month} ${dayOfWeek}`;

  return formattedDate;
};
const formatedScheduleDate = ref(formatScheduleDate(selectedDate.value));
const formatedCalendarDate = ref(formatCalendarDate(selectedDate.value));
const currentDate = ref(formatCalendarDate(new Date()));

const nextMonth = () => {
  calendar.value.nextMonth();

  formatedCalendarDate.value = formatCalendarDate(calendar.value.currentDate);
  currentDate.value = formatCalendarDate(currentDate);
};

const previousMonth = () => {
  calendar.value.previousMonth();
  selectedDate.value = new Date( // for calendar and schedule logic
    selectedDate.value.getFullYear(),
    selectedDate.value.getMonth() - 1,
    selectedDate.value.getDate()
  );

  formatedCalendarDate.value = formatCalendarDate(selectedDate.value);
  currentDate.value = formatCalendarDate(currentDate);
};

const selectDate = (date: any) => {
  console.log("selectDate:");
  console.log(date);
  selectedDate.value = date;
  formatedScheduleDate.value = formatScheduleDate(date);
  console.log(date);

  console.log(formatUTCDate(date));
};
</script>

<style lang="sass"></style>
