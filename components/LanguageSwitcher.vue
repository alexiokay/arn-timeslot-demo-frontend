<script lang="ts" setup>
import PolishFlag from "~icons/circle-flags/pl";
import EnglishFlag from "~icons/circle-flags/en";
import DeutschFlag from "~icons/circle-flags/de";
import ChinneseFlag from "~icons/circle-flags/cn";
import SouthCoreanFlag from "~icons/circle-flags/ko";
import IndonesianFlag from "~icons/circle-flags/id";
import JapaneseFlag from "~icons/circle-flags/ja";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { availableLocales } from "@/utils/lang";

import { useMainStore } from "@/stores/Main";
// micro compiler
const props = defineProps({
  type: {
    type: String,
    default: "dropdown-right-top",
  },
});

const mainStore = useMainStore();
const currentStyle = toRef(props, "type");
const localeSetting = useState<string>("locale.setting");
localeSetting.value.toLowerCase();
</script>

<template>
  <div class="flex items-center">
    <Listbox
      v-if="currentStyle === 'dropdown-right-top'"
      v-model="localeSetting"
      as="div"
      class="relative flex items-center"
    >
      <!-- ssr-only class was before -->
      <ListboxButton
        type="button"
        title="Change Language"
        class="transition-colors duration-300"
      >
        <span class="relative flex items-start justify-start">
          <PolishFlag v-if="localeSetting === 'pl'" class="w-4 h-3 md:h-4" />
          <EnglishFlag
            v-else-if="localeSetting === 'en'"
            class="w-4 h-3 md:h-4"
          />
          <DeutschFlag
            v-else-if="localeSetting === 'de'"
            class="w-4 h-3 md:h-4"
          />
          <ChinneseFlag
            v-else-if="localeSetting === 'zh'"
            class="w-4 h-3 md:h-4"
          />
          <IndonesianFlag
            v-else-if="localeSetting === 'id'"
            class="w-4 h-3 md:h-4"
          />
          <JapaneseFlag
            v-else-if="localeSetting === 'ja'"
            class="w-4 h-3 md:h-4"
          />
          <SouthCoreanFlag
            v-else="localeSetting === 'ko'"
            class="w-4 h-3 md:h-4"
          />
        </span>
      </ListboxButton>
      <ListboxOptions
        class="p-1 absolute z-50 top-full right-0 outline-none bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-gray-700 font-semibold dark:bg-gray-800 dark:ring-0 dark:highlight-white/5 dark:text-gray-300"
      >
        <ListboxOption
          @click="mainStore.setCurrency(lang.iso)"
          v-for="lang in availableLocales"
          :key="lang.iso"
          :value="lang.iso"
          :class="{
            'py-2 px-2 flex items-center cursor-pointer': true,
            'text-sky-500 bg-gray-100 dark:bg-gray-600/30':
              localeSetting === lang.iso,
            'hover:bg-gray-50 dark:hover:bg-gray-700/30':
              localeSetting !== lang.iso,
          }"
        >
          <span class="text-sm mr-2">
            {{ lang.flag }}
          </span>
          <span class="flex-1 truncate">
            {{ lang.name }}
            <span class="text-xs">({{ lang.iso }})</span>
          </span>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
    <select
      v-if="currentStyle === 'select-box'"
      v-model="localeSetting"
      class="w-full px-2 pr-3 py-1 outline-none rounded border bg-transparent text-gray-700 dark:text-gray-300 border-gray-900/10 dark:border-gray-50/[0.2]"
    >
      <option
        v-for="lang in availableLocales"
        :key="lang.iso"
        :value="lang.iso"
        class="flex items-center space-x-2"
      >
        {{ lang.flag }} {{ lang.name }} ({{ lang.iso }})
      </option>
    </select>
  </div>
</template>
