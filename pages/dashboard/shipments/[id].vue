<template lang="pug">
div(class="w-full flex flex-col justify-start items-start")
    div#shipment-header(class="w-full flex flex-col")
        NuxtLink(to="/dashboard/shipments" class="text-gray-500")  Shipments / 
            span(class="text-violet-600") {{ shipment_id }}
        div(class="flex items-center space-x-3 h-auto mt-2")
            h1(class="text-xl  font-semibold") {{ shipment.delivery_address }}
            p(class="text-gray-500")  {{ shipment.Timeslot.date }}, {{ shipment.Timeslot.start_time }}
    div#shipment-body(class="w-full flex space-x-4 mt-4")
        div#shipment-body-left(class="flex flex-col w-1/2 h-auto bg-white rounded-lg space-y-4 p-4")
                p(class="text-xl font-semibold") Shipment Details

                div(class="flex flex-col justify-start items-start w-full h-auto space-y-2")
                    p(class="text-sm text-gray-500") Shipment ID
                    p(class="text-lg font-semibold") {{ shipment_id }}

                div(class="flex flex-col justify-start items-start w-full h-auto space-y-2")
                    p(class="text-sm text-gray-500") Shipment type
                    p(class="text-lg font-semibold") Air
                div(class="flex flex-col justify-start items-start w-full h-auto space-y-2")
                    p(class="text-sm text-gray-500") Shipment origin
                    p(class="text-lg font-semibold") {{ shipment_id }}
                div(class="flex flex-col justify-start items-start w-full h-auto space-y-2")
                    p(class="text-sm text-gray-500") Shipment destination
                    p(class="text-lg font-semibold") {{ shipment.delivery_address }}
                div(class="flex flex-col justify-start items-start w-full h-auto space-y-2")
                    p(class="text-sm text-gray-500") Shipment weight
                    p(class="text-lg font-semibold") {{ shipment.weight }}
                div(class="flex flex-col justify-start items-start w-full h-auto space-y-2")
                    p(class="text-sm text-gray-500") Pallets count
                    p(class="text-lg font-semibold") {{ shipment.pallets_count }}
                div(class="flex flex-col justify-start items-start w-full h-auto space-y-2")
                    p(class="text-sm text-gray-500") Cartoons count
                    p(class="text-lg font-semibold") {{ shipment.crtoons_count }}
        div#shipment-body-right(class="flex flex-col w-1/2 h-auto  rounded-lg space-y-4")
            div(class="flex flex-col justify-start items-start w-full h-auto space-y-2 p-4 bg-white rounded-lg")
                p(class="text-xl font-semibold") Status: 
                    span(class="text-violet-600") {{shipment.status}}
                div(class="flex justify-start w-full items-center h-auto space-x-4")
                    ButtonMenu2(text="Accept" active="true" class="p-5 text-xl")
                    ButtonMenu2(text="Change" active="true" class="p-5 text-xl bg-yellow-500")
             
            div(class="flex flex-col justify-start items-start w-full h-auto space-y-2 p-4 bg-white rounded-lg")
                p(class="text-xl font-semibold") Suppliers
                div(v-for="supplier in shipment.suppliers" :key="supplier" class="flex flex-col justify-start items-start w-full h-auto space-y-2")
                    p(class="text-lg font-semibold") {{ supplier.name }}

</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/Main";

const mainStore = useMainStore();
const router = useRouter();
const route = useRoute();

const shipment_id = ref(route.path.split("/")[3]);
console.log(shipment_id);

const shipment = mainStore.getReservation(Number(shipment_id.value));
</script>

<style lang="scss"></style>
