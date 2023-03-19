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
      CalendarDay(@selectDate="selectDate(day.date)" v-for="day in firstWeek"  :day="day.day.toString()"  :is_selected="checkDate(day.date)" :is_open="day.is_open" :is_actual_month='day.day > 10? true: false')
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day.date)" v-for="day in secondWeek" :day="day.day.toString()" :is_selected="checkDate(day.date)" :is_open="day.is_open")
        
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day.date)" v-for="day in thirdWeek" :day="day.day.toString()" :is_selected="checkDate(day.date)" :is_open="day.is_open")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day.date)" v-for="day in fourthWeek" :day="day.day.toString()"  :is_selected="checkDate(day.date)" :is_open="day.is_open")
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day.date)" v-for="day in fifthWeek" :day="day.day.toString()"  :is_selected="checkDate(day.date)"  :is_open="day.is_open"  :is_actual_month='day.day < 22? true: false')
    .calendar-days(class="flex w-full h-[4rem] justify-between items-center text-center")
      CalendarDay(@selectDate="selectDate(day.date)" v-for="day in sixthWeek" :day="day.day.toString()"  :is_selected="checkDate(day.date)" :is_open="day.is_open"  :is_actual_month='day.day < 22? true: false')


</template>

<script setup lang="ts">
const date = new Date();
let selectedYear = date.getFullYear();
let selectedMonth = date.getMonth();

const props = defineProps({
  dates: {
    type: Array<any>,
    required: true,
  },
});

console.log("dates: ");
console.log(props.dates);
const firstDay = ref(new Date(selectedYear, selectedMonth).getDay());

const daysInMonth = (iMonth: any, iYear: any) => {
  return 32 - new Date(iYear, iMonth, 32).getDate();
};

console.log(firstDay.value);
console.log(daysInMonth(selectedMonth, selectedYear));

interface DateObject {
  day: number;
  id: number;
  date: Date;
  is_open: boolean;
  workable_times: Array<string>;
}

const populateCalendar = (
  dates: Array<DateObject>,
  currentDate: Date
): Array<DateObject> => {
  // Create a new Date object for the first day of the current month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Get the day of the week for the first day of the current month
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Create a new Date object for the last day of the current month
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Get the day of the week for the last day of the current month
  const lastDayOfWeek = lastDayOfMonth.getDay();

  // Create an array to hold the days in the calendar
  const allDays: Array<DateObject> = [];

  // Calculate the date of the first day in the calendar
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1 - firstDayOfWeek
  );

  // Calculate the date of the last day in the calendar
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    lastDayOfMonth.getDate() + (6 - lastDayOfWeek)
  );

  // Loop through each day in the calendar and add it to the allDays array
  let dateIterator = new Date(startOfMonth);
  while (dateIterator <= endOfMonth) {
    const day: DateObject = {
      day: dateIterator.getDate(),
      date: new Date(dateIterator),
      id: 0,
      is_open: false,
      workable_times: [],
    };
    dates.forEach((date) => {
      if (date.date.toDateString() === dateIterator.toDateString()) {
        day.id = date.id;
        day.is_open = date.is_open;
        day.workable_times = date.workable_times;
      }
    });
    allDays.push(day);
    dateIterator.setDate(dateIterator.getDate() + 1);
  }

  return allDays;
};
const currentDate = new Date();
const days = ref(populateCalendar(props.dates, currentDate));
const firstWeek = computed(() => {
  return days.value.slice(0, 7);
});
const secondWeek = computed(() => {
  return days.value.slice(7, 14);
});
const thirdWeek = computed(() => {
  return days.value.slice(14, 21);
});
const fourthWeek = computed(() => {
  return days.value.slice(21, 28);
});
const fifthWeek = computed(() => {
  return days.value.slice(28, 35);
});
const sixthWeek = computed(() => {
  return days.value.slice(35, 42);
});

const clickedDate: any = ref(null);

const nextMonth = () => {
  selectedMonth = selectedMonth + 1;
  days.value = populateCalendar(
    props.dates,
    new Date(selectedYear, selectedMonth)
  );
  console.log("next month");
  console.log(days.value);
};
const previousMonth = () => {
  selectedMonth = selectedMonth - 1;
  days.value = populateCalendar(
    props.dates,
    new Date(selectedYear, selectedMonth)
  );
  console.log("previous month");
  console.log(days.value);
};

const checkDate = (day: Date) => {
  if (
    clickedDate.value &&
    clickedDate.value.toDateString() === day.toDateString()
  ) {
    return true;
  } else if (
    !clickedDate.value &&
    day.toDateString() === new Date().toDateString()
  ) {
    return true;
  }
  return false;
};
// parsing day to date format and emitting it to timeslots page to select schedule timeslots
const emit = defineEmits(["selectDate"]);
const selectDate = (day: Date) => {
  clickedDate.value = day;
  //console.log("clicked date: " + clickedDate.value);
  emit("selectDate", clickedDate.value);
};

defineExpose({
  clickedDate,
  nextMonth,
  previousMonth,
  selectedYear,
  selectedMonth,
});
</script>

<style lang="scss"></style>
