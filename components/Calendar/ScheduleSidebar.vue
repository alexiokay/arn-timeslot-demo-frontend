<template lang="pug">
Transition(name="slide")
    div#schedule-sidebar(v-show="props.isOpen" class="w-[30rem] border-2 border-black h-full fixed top-0 right-0 bg-white rounded-l-xl px-4 py-4")
        button.close-button(class="w-[2rem] h-[2rem] rounded-full bg-gray-100 flex items-center justify-center")
            CloseIcon(class="w-6 h-6 text-gray-600")
        p(@click="mainStore.setTimeslot(24,52)") {{$props.date}}
        div(class="flex flex-col w-full h-auto space-y-2 mt-8 ")
            div(class="flex w-full h-auto justify-between ")
                p Timeslot
        
            div(class="flex w-full h-auto justify-between ")
                p Delivery Addr.
                input(class="w-[10rem] border-2 border-black")
            div(class="flex w-full h-auto justify-between ")
                p Supplier classification
                input(class="w-[10rem] border-2 border-black")
            div(class="flex w-full h-auto justify-between ")
                p Sub contract
                input(class="w-[10rem] border-2 border-black")
        div(class="flex flex-col w-full h-auto space-y-2 mt-8 ")
            p ARN supplier
            div(class="flex w-full h-auto justify-between ")
                p Palets Count
                input(class="w-[10rem] border-2 border-black")
            div(class="flex w-full h-auto justify-between ")
                p Cartoons count
                input(class="w-[10rem] border-2 border-black")
        div(class="flex flex-col w-full h-auto space-y-2 mt-6 ")
            p suppliers:
            div(class="flex w-full h-auto justify-between ")
                p Suppiler 1
                input(class="w-[10rem] border-2 border-black")
            div(class="flex  flex-col w-full h-auto justify-start items-start ")
                p comment
                textarea(class="w-[10rem] border-2 border-black")
</template>

<script setup lang="ts">
import CloseIcon from "~icons/ri/close-line";
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
