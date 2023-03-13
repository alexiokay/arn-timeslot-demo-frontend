<template lang="pug">
div#user-info(class="w-full h-auto flex justify-between items-center ")
            nuxt-img(src="images/arrow-logo-2.png" width="150" height="30" format="webp" class="w-12 h-12 rounded-full")
            div(class="flex flex-col h-full justify-around")
                p(class="font-semibold") Daniel Steward
                p(class="text-xs font-semibold text-gray-500") DHL - Manager
            div(class="p-[2px] rounded-full hover:bg-gray-100")
                UserOptionsIcon(class="w-6 h-6 hover:cursor-pointer")
</template>

<script setup lang="ts">
import UserOptionsIcon from "~icons/mi/options-horizontal";
</script>

<style lang="scss"></style>
