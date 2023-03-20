<template lang="pug">


                    
div#content(class="text-black w-full h-full px-6 py-[0.4rem] flex flex-col justify-start items-start")
    Searchbar

</template>

<script setup lang="ts">
onMounted(() => {});

definePageMeta({
  middleware: ["redirect-if-not-logged"],
});
</script>

<style lang="scss"></style>
