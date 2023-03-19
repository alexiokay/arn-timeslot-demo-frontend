<template lang="pug">
div(class="w-[10rem] h-auto bg-white border-[1px] border-slate-100 rounded-lg p-2 flex flex-col justify-between")
    
    button#logout(class="bg-red-600 text-white px-4 py-2 rounded-lg w-full " @click="userStore.logout") Logout
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/User";
const userStore = useUserStore();
</script>

<style lang="sass"></style>
