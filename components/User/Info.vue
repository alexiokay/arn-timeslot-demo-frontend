<template lang="pug">
div#user-info(class="w-full px-2 relative h-auto flex justify-between items-center ")
            nuxt-img(src="images/arrow-logo-2.png" width="150" height="30" format="webp" class="w-12 h-12 rounded-full")
            div(class="flex flex-col h-full justify-around")
                p(class="font-semibold") {{ userStore.firstName }}
                p(class="text-xs font-semibold text-gray-500") {{ userStore.getFamily }} - {{userStore.getRole}}
            div(class="p-[4px] rounded-full hover:bg-gray-100")
                LogoutIcon(@click="logout" class="w-6 h-6 hover:cursor-pointer ")
            
</template>

<script setup lang="ts">
import LogoutIcon from "~icons/ri/logout-box-r-line";
import { useUserStore } from "@/stores/User";
const userStore = useUserStore();
const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push("/");
};
</script>

<style lang="scss"></style>
