<template lang="pug">
div(class="w-full flex h-[4rem] p-2 px-4 items-center rounded-lg border-2 border-gray-300 bg-white focus:border-gray-500")
    SearchIcon(class="w-6 h-6 text-gray-600")
    input.search(class="w-full h-full  text-sm focus:outline-none  pl-5" type="search" name="search" placeholder="Search by tracking number")
    select(class="w-[4rem] bg-slate-100  rounded-lg h-full text-sm focus:outline-none  pl-10" type="search" name="search" )
        option(value="1") 1
        option(value="2") 2
        option(value="3") 3
</template>

<script setup lang="ts">
import SearchIcon from "~icons/ri/search-2-line";
</script>

<style lang="scss"></style>
