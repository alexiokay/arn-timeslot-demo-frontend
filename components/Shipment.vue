<template lang="pug">
div.request(class=" h-auto bg-white rounded-lg  flex flex-col justify-start px-4 py-2 hover:cursor-pointer")
    div.request-header(class="w-full flex h-auto items-start justify-between")
        div.request-title(class="h-auto flex items-center space-x-3 ")
            p(class="text-xl font-bold ") {{ props.reservation.carrier.name}}
            p(class="text-base text-gray-500") {{ props.reservation.Timeslot.date}}, {{ props.reservation.Timeslot.start_time }}
        p.request-truck-filled(class="text-2xl text-blue-600") {{ CalculateTruckFillingPercent(props.reservation) }}%
    div.request-body(class="w-full flex h-full items-center justify-between ")
        div.request-body-left(class="w-1/4 flex flex-col h-full space-y-2 items-start justify-center")
        
            div.request-reservation-parameter(class="w-full  items-start justify-start flex flex-col")
                p(class="text-base  text-gray-800") Avalible, kg
                p(class="text-lg font-semibold") 20/200
            div.request-reservation-parameter(class="w-full  items-start justify-start flex flex-col")
                p(class="text-base  text-gray-800") boxes count
                p(class="text-lg font-semibold") {{ props.reservation.cartons_count }}
            div.request-reservation-parameter(class="w-full  items-start justify-start flex flex-col")
                p(class="text-base  text-gray-800") pallets count
                p(class="text-lg font-semibold") {{ props.reservation.pallets_count }}
        div(class="relative flex w-[70%] h-[60%] xl:w-[60%] xl:h-[80%] select-none")
            nuxt-img(src="/images/truck3.png" format="webp"  class="w-full pointer-events-none ")
            div.truck-loading(:style="'width:'+CalculateTruckFillingPercent(props.reservation)*0.6+'%'" :class="{ 'bg-[#45C070]': isLowCap(), 'bg-[#F7B500]': isMediumCap() , 'bg-[#D84E5F]':isHighCap()}" class=" absolute  z-20 top-[4.8%] left-[37.3%]  h-[61.5%] overflow-hidden")
                
            div(class="absolute top-[4.8%] left-[37.3%] w-[60%] h-[61.5%] overflow-hidden bg-white")
                nuxt-img(src="/images/truck-lines.png" class="absolute invert z-20 opacity-20 -top-[45%] -left-[1.5%] w-[100%] h-[200%] rotate-[28deg] pointer-events-none")
</template>

<script setup lang="ts">
import { is } from "@babel/types";

const props = defineProps({
  reservation: {
    type: Object,
    required: true,
  },
});

const isHighCap = () => {
  if (CalculateTruckFillingPercent(props.reservation) >= 66) {
    return true;
  } else {
    return false;
  }
};

const isMediumCap = () => {
  if (
    CalculateTruckFillingPercent(props.reservation) >= 34 &&
    CalculateTruckFillingPercent(props.reservation) <= 65
  ) {
    return true;
  } else {
    return false;
  }
};

const isLowCap = () => {
  if (CalculateTruckFillingPercent(props.reservation) <= 33) {
    return true;
  } else {
    return false;
  }
};

const CalculateTruckFillingPercent = (reservation: any) => {
  const pallets_count = reservation.pallets_count;
  const cartons_count = reservation.cartons_count;
  const pallets_per_truck = 26; // maximum amount of pallets on which boxes are stacked
  const boxes_per_pallet = 100; // maximum amount of boxes per pallet
  const boxes_per_truck = 2000;

  // calculate the number of trucks needed
  const total_boxes = cartons_count;

  // calculate the truck percentage
  const truck_percentage: number = Number(
    (total_boxes / boxes_per_truck).toFixed(2)
  );

  // check if the percentage is NaN
  if (isNaN(truck_percentage)) {
    return 100;
  } else {
    return truck_percentage * 100 > 100 ? 100 : truck_percentage * 100;
  }
};
</script>

<style lang="scss"></style>
