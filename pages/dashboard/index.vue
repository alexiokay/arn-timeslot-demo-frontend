<template lang="pug">


                    
div#content(class="text-black w-full h-full px-6 py-[0.4rem] flex flex-col justify-start items-start")
    Searchbar(:datepicker="true" placeholder="Search by tracking number" class="w-full")

</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/User";
import { useMainStore } from "@/stores/Main";
const mainStore = useMainStore();
const userStore = useUserStore();
const route = useRoute();
definePageMeta({
  middleware: ["redirect-if-not-logged"],
});

const config = useRuntimeConfig();
</script>

<style lang="scss"></style>
