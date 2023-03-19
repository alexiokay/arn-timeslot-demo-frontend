<template lang="pug">
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["redirect-if-not-logged"],
  // or middleware: 'auth'
});
</script>

<style lang="scss"></style>
