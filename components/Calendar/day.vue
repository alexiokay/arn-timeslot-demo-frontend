<template lang="pug">
p(class="w-[3rem] h-[3rem]  text-lg text-center rounded-lg flex items-center justify-center") {{ props.day }}
</template>

<script setup lang="ts">
const props = defineProps({
  day: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss"></style>
