<template lang="pug">
SettingsPanel(:title="props.title" @save="save()")
    template(v-slot:content)
        div(class="flex w-4/5 space-x-[2rem] items-start ")
            div(class="flex flex-col w-1/3")
                p(class="font-semibold text-gray-700") Workable times
           
                p(class="text-gray-600 text-sm") Here you can set your default workable times. These times will be used for all your future bookings.
            div(class="flex flex-col w-auto  space-y-4  justify-center items-start ")
                div(class="flex flex-col w-auto  justify-center items-start ")
                    p Weekdays
                    hr(class="w-full border-gray-200 border-[1px]")
                div(class="flex w-auto space-x-2")
                    label(class="flex items-center space-x-2")  open:
                    input(type="checkbox" v-model="settingsStore.workable_hours.is_open" class="")
                div(class="flex  w-full items-center space-x-2")
                    label(data-te-select-label-ref class="w-[3rem]") from:
                    select(data-te-select-init class="h-[2rem]  w-[4.5rem,] bg-gray-100 p-1" v-model="settingsStore.workable_hours.from")
                        option(v-for="i in 24" :key="i") {{ i }}:00
                        
                div(class="flex  w-full items-center justify-start space-x-2")
                    label(data-te-select-label-ref class="w-[3rem]") to:
                    select(data-te-select-init class="h-[2rem]  w-[4.5rem,] bg-gray-100 p-1" v-model="settingsStore.workable_hours.to")
                        option(v-for="i in 24" :key="i") {{ i }}:00
            div(class="flex flex-col w-auto  space-y-4  justify-center items-start ")
                div(class="flex flex-col w-auto  justify-center items-start ")
                    p Saturdays
                    hr(class="w-full border-gray-200 border-[1px]")
                div(class="flex w-auto space-x-2")
                    label(class="flex items-center space-x-2") open:
                    input(type="checkbox" v-model="settingsStore.workable_hours.is_saturday_open" class="")
                div(class="flex  w-full items-center space-x-2")
                    label(data-te-select-label-ref class="w-[3rem]") from:
                    select(data-te-select-init class="h-[2rem]  w-[4.5rem,] bg-gray-100 p-1" v-model="settingsStore.workable_hours.from")
                        option(v-for="i in 24" :key="i") {{ i }}:00
                        
                div(class="flex  w-full items-center justify-start space-x-2")
                    label(data-te-select-label-ref class="w-[3rem]") to:
                    select(data-te-select-init class="h-[2rem]  w-[4.5rem,] bg-gray-100 p-1" v-model="settingsStore.workable_hours.to")
                        option(v-for="i in 24" :key="i") {{ i }}:00
            div(class="flex flex-col w-auto  space-y-4  justify-center items-start ")
                div(class="flex flex-col w-auto  justify-center items-start ")
                    p Sundays
                    hr(class="w-full border-gray-200 border-[1px]")
                div(class="flex w-auto space-x-2")
                    label(class="flex items-center space-x-2") open:
                    input(type="checkbox" v-model="settingsStore.workable_hours.is_sunday_open" class="")
                div(class="flex  w-full items-center space-x-2")
                    label(data-te-select-label-ref class="w-[3rem]") from:
                    select(data-te-select-init class="h-[2rem]  w-[4.5rem,] bg-gray-100 p-1" v-model="settingsStore.workable_hours.from")
                        option(v-for="i in 24" :key="i") {{ i }}:00
                        
                div(class="flex  w-full items-center justify-start space-x-2")
                    label(data-te-select-label-ref class="w-[3rem]") to:
                    select(data-te-select-init class="h-[2rem]  w-[4.5rem] bg-gray-100 p-1" v-model="settingsStore.workable_hours.to")
                        option(v-for="i in 24" :key="i") {{ i }}:00
        hr(class="w-full border-gray-200 border-[1px]")
        
        div(class="flex w-4/5 space-x-[4rem] items-center ")
            div(class="flex flex-col w-1/3")
                p(class="font-semibold text-gray-700") Max amount of trucks
           
                p(class="text-gray-600 text-sm") Here you can set your default max amount of trucks. This amount will be used for all your future bookings.
            div(class="flex flex-col w-auto space-x-8 space-y-4 ")
                input(class="h-[2rem] w-[3.6rem]  pl-2" type="number"  v-model="settingsStore.max_trucks_per_hour" min="1" max="10")
                    
        
            
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/User";
import { useSettingsStore } from "@/stores/Settings";
const settingsStore = useSettingsStore();
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
const userStore = useUserStore();
const config = useRuntimeConfig();
const emit = defineEmits(["save"]);

// saving into the database
const save = async () => {
  emit("save");

  await fetch(`${config.API_URL}api/v1/arrows_settings/`, {
    method: "POST",
    headers: {
      Host: `${config.HOST}`,
      Authorization: `${userStore.token}`,
    },
    body: JSON.stringify({
      workable_open_time: settingsStore.workable_hours.from,
      workable_close_time: settingsStore.workable_hours.to,

      is_saturday_open: settingsStore.is_saturday_open,
      saturday_open_time: settingsStore.saturday_workable_hours.from,
      saturday_close_time: settingsStore.saturday_workable_hours.to,

      is_sunday_open: settingsStore.is_sunday_open,
      sunday_open_time: settingsStore.sunday_workable_hours.from,
      sunday_close_time: settingsStore.sunday_workable_hours.to,

      is_open: settingsStore.is_open,
      max_trucks_per_slot: settingsStore.max_trucks_per_hour,
    }),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      console.log(res.json());
    }
  });
};
</script>

<style lang="scss"></style>
