<template lang="pug">
p(class='w-[3rem] h-[3rem] text-center  flex items-center justify-center') {{ props.title }}
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="sass"></style>
