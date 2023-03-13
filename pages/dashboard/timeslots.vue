<template lang="pug">
div#timeslot-top-panel(class="flex w-full h-auto")
    div(class="flex flex-col space-y-4")
        div(class="flex items-center ")
            h1(class="text-3xl font-bold mr-8 w-[10rem]") {{formatedCalendarDate}}
            div(class="p-[2px] rounded-full hover:bg-gray-100 hover:cursor-pointer")
      
                ArrowIcon(@click="previousMonth()"  class="h-7 w-7") &lt
            div(class="p-[2px] rounded-full hover:bg-gray-100 hover:cursor-pointer")
                ArrowIcon(@click="nextMonth()" class="rotate-180 h-7 w-7") >
        p(class="text-gray-500 w-2/4") Here all your planned timeslots. You will find information for each timeslot as well you can planned new one
div(class="flex gap-x-[5rem]")
    
    div#timeslot-left-panel(class="flex w-2/4 flex-col")

        
        Calendar(ref="calendar" class="mt-8" @selectDate="selectDate")
    div#timeslot-right-panel(class="flex w-2/4 flex-col")
        
        CalendarSchedule(:selectedTimeslot="formatedScheduleDate" class="mt-8")
</template>

<script setup lang="ts">
import ArrowIcon from "~icons/material-symbols/chevron-left-rounded";

const selectedDate = ref(new Date()); // for calendar and schedule logic

const calendar = ref();
const formatCalendarDate = (date: any) => {
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = `${month}' ${year}`;
  return formattedDate;
};

const formatScheduleDate = (date: any) => {
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
  selectedDate.value.setMonth(selectedDate.value.getMonth() + 1);
  formatedCalendarDate.value = formatCalendarDate(selectedDate.value);
  currentDate.value = formatCalendarDate(currentDate);
};

const previousMonth = () => {
  calendar.value.previousMonth();
  selectedDate.value.setMonth(selectedDate.value.getMonth() - 1);
  formatedCalendarDate.value = formatCalendarDate(selectedDate.value);
  currentDate.value = formatCalendarDate(currentDate);
};

const selectDate = (date: any) => {
  formatedScheduleDate.value = formatScheduleDate(date);
  console.log(date);
};
</script>

<style lang="sass"></style>
