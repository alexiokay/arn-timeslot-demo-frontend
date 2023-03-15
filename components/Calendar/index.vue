<template lang="pug">
div.calendar(class="flex flex-col w-full h-auto")
    .calendar-days(class="flex w-full h-[4rem] justify-between text-center items-start")
        CalendarDayTitle(title="MON")
        CalendarDayTitle(title="TUE")
        CalendarDayTitle(title="WED")
        CalendarDayTitle(title="THU")
        CalendarDayTitle(title="FRI")
        CalendarDayTitle(title="SAT")
        CalendarDayTitle(title="SUN")
    hr(class="w-full h-[2px] bg-black")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day, day > 7?'prev': 'none')" v-for="day in firstWeek"  :day="day.toString()" :class="{'text-gray-400': day > 7, }" :is_selected="checkDate(day)")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day)" v-for="day in secondWeek" :day="day.toString()" :class="{  } " :is_selected="checkDate(day)" :is_avalible="true")
        
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day)" v-for="day in thirdWeek" :day="day.toString()" :class="{  } " :is_selected="checkDate(day)" :is_avalible="false")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day)" v-for="day in fourthWeek" :day="day.toString()" :class="{  } " :is_selected="checkDate(day)")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day, day < 20?'next': 'none')" v-for="day in fifthWeek" :day="day.toString()" :class="{ 'text-gray-400': day < 20,  } " :is_selected="checkDate(day)")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day, day < 30?'next': 'none')" v-for="day in sixthWeek" :day="day.toString()" :class="{ 'text-gray-400': day < 30,  } ")


</template>

<script setup lang="ts">
const date = new Date();
let selectedYear = date.getFullYear();
let selectedMonth = date.getMonth();

const firstDay = ref(new Date(selectedYear, selectedMonth).getDay());

const daysInMonth = (iMonth: any, iYear: any) => {
  return 32 - new Date(iYear, iMonth, 32).getDate();
};

console.log(firstDay.value);
console.log(daysInMonth(selectedMonth, selectedYear));

const populateCalendar = (currentDate: any) => {
  // Get the current year and month

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  console.log(year, month);

  // Get the number of days in the previous month
  const numDaysPrevMonth = new Date(year, month, 0).getDate();

  // Get the number of days in the current month
  const numDaysCurrMonth = new Date(year, month + 1, 0).getDate();

  // Get the day of the week for the first day of the current month
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Calculate the number of empty days needed to align with the correct day of the week
  const numEmptyDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Create an array of days for the current month
  const currMonthDays = Array.from(
    { length: numDaysCurrMonth },
    (_, i) => i + 1
  );

  // Create an array of days for the previous month
  const prevMonthDays = Array.from(
    { length: numEmptyDays },
    (_, i) => numDaysPrevMonth - numEmptyDays + i + 1
  );

  // Get the day of the week for the last day of the current month
  const lastDayOfMonth = new Date(year, month + 1, 0).getDay();

  // Calculate the number of empty days needed at the end of the current month
  const numEmptyDaysEnd = lastDayOfMonth === 0 ? 0 : 7 - lastDayOfMonth;

  // Create an array of days for the next month
  const nextMonthDays = Array.from(
    { length: numEmptyDaysEnd },
    (_, i) => i + 1
  );

  // Combine the arrays and return the result
  return [...prevMonthDays, ...currMonthDays, ...nextMonthDays];
};
const currentDate = new Date();
const days = ref(populateCalendar(currentDate));
const firstWeek = computed(() => days.value.slice(0, 7));
const secondWeek = computed(() => days.value.slice(7, 14));
const thirdWeek = computed(() => days.value.slice(14, 21));
const fourthWeek = computed(() => days.value.slice(21, 28));
const fifthWeek = computed(() => days.value.slice(28, 35));
const sixthWeek = computed(() => days.value.slice(35, 42));
const clickedDate: any = ref(null);
const nextMonth = () => {
  selectedMonth = selectedMonth + 1;
  days.value = populateCalendar(new Date(selectedYear, selectedMonth));
  console.log("next month");
  console.log(days.value);
};
const previousMonth = () => {
  selectedMonth = selectedMonth - 1;
  days.value = populateCalendar(new Date(selectedYear, selectedMonth));
  console.log("previous month");
  console.log(days.value);
};

const checkDate = (day: number) => {
  // set temporart _date to clickedDate if it is not null else set it to current date
  let _date: any = clickedDate.value === null ? date : clickedDate.value;
  console.log("date:" + _date);
  if (
    selectedMonth === _date.getMonth() &&
    selectedYear === _date.getFullYear() &&
    day === _date.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};
// parsing day to date format and emitting it to timeslots page to select schedule timeslots
const emit = defineEmits(["selectDate"]);
const selectDate = (day: number, mode: string = "none") => {
  if (mode === "prev") {
    clickedDate.value = new Date(selectedYear, selectedMonth - 1, Number(day));
  } else if (mode === "next") {
    clickedDate.value = new Date(selectedYear, selectedMonth + 1, Number(day));
  } else if (mode === "none") {
    clickedDate.value = new Date(selectedYear, selectedMonth, Number(day));
  }
  console.log(mode);
  emit("selectDate", clickedDate.value);
};

defineExpose({
  nextMonth,
  previousMonth,
  selectedYear,
  selectedMonth,
});
</script>

<style lang="scss"></style>
