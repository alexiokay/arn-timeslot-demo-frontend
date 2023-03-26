<template lang="pug">
div.menu-button(class="w-auto px-2   items-center flex justify-center   h-full  rounded-t-md  hover:cursor-pointer" :class="props.is_active? 'bg-white border-t-2 border-x-2 border-t-gray-200 border-x-gray-200': ''" @click="emit('setActive')" )
        p(:class="props.is_active? 'text-blue-700 font-semibold': ''") {{ props.text }}
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  to: {
    type: String,
    required: false,
  },

  notifications_count: {
    type: Number,
    required: false,
  },
  is_active: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["setActive"]);
</script>

<style lang="sass"></style>
