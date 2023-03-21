<template lang="pug">
button(class="w-auto h-[2.5rem] min-w-[4rem]  rounded-lg p-2  text-sm flex items-center justify-center" :class="active ? 'bg-violet-500 text-white' : 'bg-[#F0EEFB] text-black'")
    p {{ text }}
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  active: boolean;
}>();
</script>

<style lang="scss"></style>
