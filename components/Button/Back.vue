<template lang="pug">
button#back(@click="goBack" class=" mt-4 ml-4 text-black bg-gray-100 font-base  px-7 rounded-full focus:outline-none focus:shadow-outline")
    p &lt; Back 
</template>

<script setup lang="ts">
const router = useRouter();
const goBack = () => {
  try {
    router.back();
  } catch (error) {
    router.push("/");
  }
};
</script>

<style lang="sass"></style>
