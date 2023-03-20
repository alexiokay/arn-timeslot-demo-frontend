<template lang="pug">
div#requests(class="text-black w-full h-full px-6 py-[0.4rem] flex flex-col justify-start items-start")
    Searchbar

button(class="bg-blue-500 text-white px-4 py-2 rounded-lg w-full " @click="testNotification") Test notification
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/User";

definePageMeta({
  middleware: ["redirect-if-not-logged"],
  // or middleware: 'auth'
});

let chatSocket: any = null;
onMounted(() => {
  chatSocket = new WebSocket(
    "ws://127.0.0.1:8001" + "/ws/" + "notifications" + "/11"
  );

  chatSocket.onmessage = function (e: any) {
    const data = JSON.parse(e.data);
    console.log(data.message);
  };

  chatSocket.onclose = function (e: any) {
    console.error("Chat socket closed unexpectedly");
  };
});

const testNotification = () => {
  chatSocket.send(
    JSON.stringify({
      message: "Test Notification",
    })
  );
};
</script>

<style lang="scss"></style>
