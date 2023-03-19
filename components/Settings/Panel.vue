<template lang="pug">
div.settings-panel(class="w-full flex flex-col justify-start items-start")
    h2(class="text-xl font-semibold") {{ props.title }}
    p Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus auctor ligula, non pulvinar nisi vehicula non.
    p Suspendisse consectetur tincidunt est, id venenatis mi convallis sit amet
    hr(class="w-full border-gray-200 border-[1px] my-6")
    div(class="w-full flex flex-col space-y-6")
      slot(name="content")
    button(class="bg-violet-600 text-white px-4 py-2 rounded-lg w-[12rem] mt-8 self-end" @click="$emit('save')") Save
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss"></style>
