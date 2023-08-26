<template lang="pug">
div(class="flex  p-2 px-4 items-center rounded-lg border-2 border-gray-300 bg-themeBackground2 focus:border-gray-500 ")
    SearchIcon(class="w-8 h-8 text-themeText")
    input.search(class="w-full h-full  bg-themeBackground2 text-lg focus:outline-none  pl-5" type="search" name="search" :placeholder="placeholder" @input="$emit('keypress', $event)")
    div(v-if="datepicker" class="ml-auto  px-2 flex items-center justify-center space-x-2 w-auto h-auto rounded-lg bg-themeBackground2 text-black")
        p(class="text-base min-w-max text-themeText") Arrival date:
        input(type="date" class='bg-themeBackground2 focus:outline-none w-[8rem] text-base text-themeText ' :style="{'color-scheme': dataTheme.split('-')[1] == 'dark'? 'dark': 'black'}")
</template>

<script setup lang="ts">
import SearchIcon from "~icons/ri/search-2-line";
import { useUserStore } from "@/stores/User";
const userStore = useUserStore();

const dataTheme = computed(() => userStore.theme);

defineProps({
  datepicker: {
    type: Boolean,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  "v-model": {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss"></style>
