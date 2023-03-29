<template lang="pug">
div
  Transition(name="fade")
    <div v-show="props.isOpen" @click="$emit('close')" tabindex="-1" class="backdrop-blur-[2.5px] fixed top-0 pointer-event-none flex items-center bg-[rgba(0,0,0,0.55)] justify-center left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen md:h-full"></div>

  Transition(name="slide")
      div#schedule-sidebar(v-show="props.isOpen" class="w-[35rem] z-50  h-full fixed top-0 right-0 bg-white rounded-l-xl px-4 py-4")
          div(class="flex w-full h-auto justify-between items-center")
            button.close-button(@click="$emit('close')" class="w-[2rem] h-[2rem] rounded-full bg-gray-100 flex items-center justify-center")
                CloseIcon(class="w-6 h-6 text-gray-600")
            p(class="text-2xl font-semibold w-full text-center") New Reservation
          div(class="flex w-full h-auto mt-2 items-center space-x-4 justify-center text-gray-800 text-lg " )
            div(class="flex items-center space-x-1")
              CalendarIcon(class="w-6 h-6 text-gray-600")
              p(class="underline") {{props.timeslot? props.timeslot.start_time + '-' + props.timeslot.end_time : ''}}
            p -
            div(class="flex items-center space-x-1")
              ClockIcon(class="w-6 h-6 text-gray-600")
              p(@click="mainStore.setTimeslot(24,52)" class="underline") {{$props.date}}
          hr(class="w-full h-0.4 bg-gray-200 mt-4")
          div(class="flex flex-col w-full h-auto space-y-2 mt-8 ")
              div(class="w-full flex gap-x-6")
                div(class="flex relative w-1/2 h-auto justify-between ")
                  div(class="absolute -top-3 left-2 bg-white px-1 h-[1.2rem]  text-black") Delivery Addr.
                  select(class="w-full border-2 h-[2.5rem] p-2 border-black")
                    option(value="1") MV
                    option(value="2") 2
                    option(value="3") 3
                    option(value="4") 4
                    option(value="5") 5
                div(class="flex relative w-1/2 h-auto justify-between ")
                  div(class="absolute -top-3 left-2 bg-white px-1 h-[1.2rem]  text-black") Supplier Classification
                  select(class="w-full border-2 h-[2.5rem] p-2 border-black")
                    option(value="1") EXPRESS
                    option(value="2") NORMAL

                h3 Suppliers:
                div(class="flex w-full h-auto justify-between ")
                  p Supplier
                  input(class="w-[10rem] border-2 border-black")
              
          
              
              div(class="flex w-full h-auto justify-between ")
                  p Sub contract 
                  input(class="w-[10rem] border-2 border-black")
       
              div(class="flex  flex-col w-full h-auto justify-start items-start ")
                  p comment
                  textarea(class="w-[10rem] border-2 border-black")
</template>

<script setup lang="ts">
import CloseIcon from "~icons/ri/close-line";
import ClockIcon from "~icons/material-symbols/nest-clock-farsight-analog-outline-rounded";
import CalendarIcon from "~icons/mdi/calendar-week";
import { useMainStore } from "@/stores/Main";

const mainStore = useMainStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  timeslots: {
    type: Array<any>,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timeslot: {
    // 11-12
    type: Object,
    required: false,
  },
});

const book = (timeslotId: number) => {
  mainStore.setTimeslot(timeslotId, 52);
  // TODO!: Fetch apito book timeslot and mar it as not_confirmed and sent notification to admin to confirm. When confirmed sent confirmation email to carrier
};
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation: slide-in 0.3s;
}

// .jump-leave {
// }

.slide-leave-active {
  animation: slide-out 0.3s;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}
@keyframes slide-out {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
  }
}
</style>
