<template lang="pug">
NuxtLink(class="relative flex w-full group justify-between rounded-md  hover:bg-slate-100 h-[2.7rem] px-4 py-2 items-center hover:cursor-pointer")
    div(class="flex space-x-2")
        slot(name="icon")
        p {{ props.text }}
    div(v-if="props.notifications_count" class="h-full w-[2rem] bg-slate-50 flex items-center justify-center rounded-md")
        p() {{props.notifications_count}}
    .active-pointer(v-if="isActive" class="absolute -left-6 w-[0.65rem] h-11 bg-violet-600 rounded-r-md")

</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },

  notifications_count: {
    type: Number,
    required: false,
  },
});

const route = useRoute();
const isActive = computed(() => {
  console.log("route");
  console.log(route.path);
  return route.path.split("/")[1] === props.text.toLowerCase() ? true : false;
});
</script>

<style lang="scss"></style>
