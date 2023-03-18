<template lang="pug">
div.menu-button(class="w-auto px-2   items-center flex justify-center   h-full  rounded-xl hover:cursor-pointer" :class="props.is_active? 'bg-gray-200': ''" @click="emit('setActive')" )
        p(:class="props.is_active? 'text-blue-700': ''") {{ props.text }}
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
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
