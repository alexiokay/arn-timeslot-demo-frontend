<template lang="pug">
div.request(class=" h-[15rem] bg-white rounded-lg  flex flex-col justify-start px-4 py-2 hover:cursor-pointer")
    div.request-header(class="w-full flex h-auto items-start justify-between")
        div.request-title(class="h-auto flex items-center space-x-3 ")
            p(class="text-xl font-bold ") {{ props.reservation.delivery_address }}
            p(class="text-base text-gray-500") {{ props.reservation.Timeslot }}
        p.request-truck-filled(class="text-2xl text-blue-600") {{ CalculateTruckFillingPercent(props.reservation) }}%
    div.request-body(class="w-full flex h-full items-center justify-between")
        div.request-body-left(class="w-1/4 flex flex-col h-full space-y-2 items-start justify-center")
        
            div.request-reservation-parameter(class="w-full  items-start justify-start flex flex-col")
                p(class="text-base  text-gray-800") Avalible, kg
                p(class="text-lg font-semibold") 20/200
            div.request-reservation-parameter(class="w-full  items-start justify-start flex flex-col")
                p(class="text-base  text-gray-800") boxes count
                p(class="text-lg font-semibold") {{ props.reservation.cartons_count }}
            div.request-reservation-parameter(class="w-full  items-start justify-start flex flex-col")
                p(class="text-base  text-gray-800") boxes count
                p(class="text-lg font-semibold") {{ props.reservation.cartons_count }}
</template>

<script setup lang="ts">
const props = defineProps({
  reservation: {
    type: Object,
    required: true,
  },
});

const CalculateTruckFillingPercent = (reservation: any) => {
  const pallets_count = reservation.pallets_count;
  const boxes_count = reservation.boxes_count;
  const pallets_per_truck = 26; // maximum amount of pallets on which boxes are stacked
  const boxes_per_pallet = 100; // maximum amount of boxes per pallet
  const boxes_per_truck = pallets_per_truck * boxes_per_pallet;

  // calculate the number of trucks needed
  const total_boxes = pallets_count * boxes_per_pallet + boxes_count;
  const total_trucks = Math.ceil(total_boxes / boxes_per_truck);

  // calculate the truck percentage
  const truck_percentage: number = Number((total_trucks / 100).toFixed(2));

  // check if the percentage is NaN
  if (isNaN(truck_percentage)) {
    return 0;
  } else {
    return truck_percentage;
  }
};
</script>

<style lang="scss"></style>
