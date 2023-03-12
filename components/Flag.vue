<template>
  <div>
    <PolishFlag v-if="iso === 'pl'" class="w-1/3 h-3 md:h-16" />
    <EnglishFlag v-else-if="iso === 'en'" class="w-1/3 h-3 md:h-16" />
    <DeutschFlag v-else-if="iso === 'de'" class="w-1/3 h-3 md:h-16" />
    <ChinneseFlag v-else-if="iso === 'zh'" class="w-1/3 h-3 md:h-16" />
    <IndonesianFlag v-else-if="iso === 'id'" class="w-1/3 h-3 md:h-16" />
    <JapaneseFlag v-else-if="iso === 'ja'" class="w-1/3 h-3 md:h-16" />
    <SouthCoreanFlag v-else="iso === 'ko'" class="w-1/3 h-3 md:h-16" />
    <NetherlandsFlag v-else="iso === 'nl'" class="w-1/3 h-3 md:h-16" />
  </div>
</template>

<script setup lang="ts">
import PolishFlag from "~icons/circle-flags/pl";
import EnglishFlag from "~icons/circle-flags/en";
import DeutschFlag from "~icons/circle-flags/de";
import ChinneseFlag from "~icons/circle-flags/cn";
import SouthCoreanFlag from "~icons/circle-flags/ko";
import IndonesianFlag from "~icons/circle-flags/id";
import JapaneseFlag from "~icons/circle-flags/ja";
import NetherlandsFlag from "~icons/circle-flags/nl";
import { ref } from "vue";
const props = defineProps({
  iso: {
    type: String,
    required: false,
  },
});

const localeSetting = useState<string>("locale.setting");
localeSetting.value.toLowerCase();
const iso = ref(localeSetting.value.valueOf().toLowerCase());
if (props.iso) iso.value = props.iso;

console.log(iso.value);
</script>

<style lang="sass"></style>
