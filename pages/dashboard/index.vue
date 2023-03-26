<template lang="pug">


                    
div#content(class="text-black w-full h-full px-6 py-[0.4rem] flex flex-col justify-start items-start")
    Searchbar(:datepicker="true" placeholder="Search by tracking number" class="w-full")

</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["redirect-if-not-logged"],
});
</script>

<style lang="scss"></style>
