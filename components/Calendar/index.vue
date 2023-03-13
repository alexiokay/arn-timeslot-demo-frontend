<template lang="pug">
div.calendar(class="flex flex-col w-full h-auto")
    .calendar-days(class="flex w-full h-[4rem] justify-between text-center")
        CalendarDayTitle(title="MON")
        CalendarDayTitle(title="TUE")
        CalendarDayTitle(title="WED")
        CalendarDayTitle(title="THU")
        CalendarDayTitle(title="FRI")
        CalendarDayTitle(title="SAT")
        CalendarDayTitle(title="SUN")
    hr(class="w-full h-[2px] bg-black")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
        CalendarDay(day="1")
        CalendarDay(day="2")
        CalendarDay(day="3")
        CalendarDay(day="4")
        CalendarDay(day="5")
        CalendarDay(day="6")
        CalendarDay(day="7")
       
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
        CalendarDay(day="8")
        CalendarDay(day="9")
        CalendarDay(day="10")
        CalendarDay(day="11")
        CalendarDay(day="12")
        CalendarDay(day="13")
        CalendarDay(day="14")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
        CalendarDay(day="15")
        CalendarDay(day="16")
        CalendarDay(day="17")
        CalendarDay(day="18")
        CalendarDay(day="19")
        CalendarDay(day="20")
        CalendarDay(day="21")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
        CalendarDay(day="22")
        CalendarDay(day="23")
        CalendarDay(day="24")
        CalendarDay(day="25")
        CalendarDay(day="26")
        CalendarDay(day="27")
        CalendarDay(day="28")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
        CalendarDay(day="29")
        CalendarDay(day="30")
        CalendarDay(day="31")
        CalendarDay(day="32")
        CalendarDay(day="33")
        CalendarDay(day="34")
        CalendarDay(day="35")


</template>

<script setup lang="ts">
const date = new Date();
const selectedYear = date.getFullYear();
const selectedMonth = date.getMonth();

const firstDay = ref(new Date(selectedYear, selectedMonth).getDay());

const daysInMonth = (iMonth: any, iYear: any) => {
  return 32 - new Date(iYear, iMonth, 32).getDate();
};

console.log(firstDay.value);
console.log(daysInMonth(selectedMonth, selectedYear));

const populateCalendar = () => {
  const days: Array<string> = [];
  for (let i = 0; i < firstDay.value; i++) {
    days.push("");
  }
  for (let i = 1; i <= daysInMonth(selectedMonth, selectedYear); i++) {
    days.push(i.toString());
  }
  return days;
};
const days = ref(populateCalendar());
</script>

<style lang="scss"></style>
