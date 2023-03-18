<template lang="pug">
div.settings-panel(class="w-full flex flex-col justify-start items-start")
    h2(class="text-xl font-semibold") {{ props.title }}
    p Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus auctor ligula, non pulvinar nisi vehicula non.
    p Suspendisse consectetur tincidunt est, id venenatis mi convallis sit amet

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
