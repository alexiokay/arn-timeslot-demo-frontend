<template lang="pug">
SettingsPanel(:title="props.title" @save="save()")
    template(v-slot:content)
        div(class="flex w-4/5 space-x-[4rem] items-center ")
            div(class="flex flex-col w-2/3")
                p(class="font-semibold text-gray-700") Workable times
           
                p(class="text-gray-600 text-sm") Here you can set your default workable times. These times will be used for all your future bookings.
            div(class="flex flex-col w-full  space-y-4  justify-center items-start ")
                div(class="flex  w-full items-center space-x-2")
                    label(data-te-select-label-ref class="w-[3rem]") from:
                    select(data-te-select-init class="h-[2rem]  w-[4rem]" v-model="workable_hours.from")
                        option(v-for="i in 24" :key="i") {{ i }}:00
                        
                div(class="flex  w-full items-center justify-start space-x-2")
                    label(data-te-select-label-ref class="w-[3rem]") to:
                    select(data-te-select-init class="h-[2rem]  w-[4rem]" v-model="workable_hours.to")
                        option(v-for="i in 24" :key="i") {{ i }}:00
        hr(class="w-full border-gray-200 border-[1px]")
        
        div(class="flex w-4/5 space-x-[4rem] items-center ")
            div(class="flex flex-col w-2/3")
                p(class="font-semibold text-gray-700") Max amount of trucks
           
                p(class="text-gray-600 text-sm") Here you can set your default max amount of trucks. This amount will be used for all your future bookings.
            div(class="flex flex-col w-full space-x-8 space-y-4 ")
                input(class="h-[2rem] w-[3.6rem]  pl-2" type="number"  v-model="max_trucks" min="1" max="10")
                    
        
            
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/User";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
const userStore = useUserStore();
const config = useRuntimeConfig();
const emit = defineEmits(["save"]);

type WorkableTimes = {
  from: string;
  to: string;
};

const workable_hours: Ref<WorkableTimes> = ref({
  from: "10:00",
  to: "12:00",
});
const max_trucks: Ref<number> = ref(1);

// saving into the database
const save = async () => {
  emit("save");

  await fetch(`${config.API_URL}api/v1/save_settings/arrow`, {
    method: "POST",
    headers: {
      Host: `${config.HOST}`,
      Authorization: `${userStore.token}`,
    },
    body: JSON.stringify({
      workable_hours: workable_hours.value,
      max_trucks: max_trucks.value,
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
