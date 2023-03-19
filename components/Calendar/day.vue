<template lang="pug">
div(@click="selectDate" :class="{'bg-gray-800 text-white': props.is_selected, 'group hover:cursor-pointer  hover:bg-gray-500 opacity-100': props.is_open, 'text-gray-400': props.is_actual_month, 'hover:bg-gray-800': props.is_selected}" class="rounded-full relative opacity-0 hover:text-white")
  p(class="w-[3rem] h-[3rem]  text-xl font-semibold text-center rounded-lg flex items-center justify-center") {{ props.day }}

  NotAvalibleIcon(v-if="!props.is_open" :class="props.is_selected? 'opacity-0 ': 'text-black'" class="absolute top-[0.4rem] right-[1.3rem]  z-50 font-semibold left-[0.1rem] flex items-center justify-start flex-wrap gap-x-1 w-[2.9rem] text-3xl text-center group-hover:opacity-0")

</template>

<script setup lang="ts">
import { def } from "@vue/shared";
import NotAvalibleIcon from "~icons/ph/x";
const props = defineProps({
  day: {
    type: String,
    required: false,
  },
  is_selected: {
    type: Boolean,
    required: false,
  },
  is_open: {
    type: Boolean,
    default: true,
    required: false,
  },
  is_actual_month: {
    type: Boolean,
    required: false,
  },
});

// pass day to Calendar component
const emit = defineEmits(["selectDate"]);
const selectDate = () => {
  if (props.is_open) {
    emit("selectDate", props.day);
  }
};
</script>

<style lang="scss"></style>
