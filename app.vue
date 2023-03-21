<template>
  <Html :lang="locale">
    <NuxtLayout name="default">
      <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
      <NuxtPage class="overflow-hidden" />
    </NuxtLayout>
  </Html>
</template>

<script lang="ts" setup>
import { AppSetup } from "./utils/app";
import { useMainStore } from "@/stores/Main";
import { useUserStore } from "@/stores/User";

const userStore = useUserStore();
const mainStore = useMainStore();
const route = useRoute();
if (userStore.getIsLogged && route.path !== "/") {
  const dates = await getDates();
  mainStore.setDates(dates);
  if (userStore.getAccountType === "arrow-employee") {
    const reservations = await getNewReservations();
    mainStore.setReservations(reservations);
  }
}

let chatSocket: any = null;

onMounted(() => {
  chatSocket = new WebSocket("ws://127.0.0.1:8001" + "/ws/" + "reservations");

  chatSocket.onmessage = function (e: any) {
    const data = JSON.parse(e.data);
    console.log(typeof data);

    let reservation = data.reservation
      ? JSON.parse(data.reservation)[0].fields
      : data.reservation_id;

    if (data.reservation_id) console.log(data.reservation_id);

    if (data.updated) mainStore.updateReservation(reservation);
    if (data.deleted) mainStore.removeReservation(reservation);
    if (data.added) mainStore.addReservation(reservation);
  };

  chatSocket.onclose = function (e: any) {
    console.error("Chat socket closed unexpectedly");
    // interval which try to connect again to the socket
  };
});
AppSetup();
const locale = useState<string>("locale.setting");
const app = useAppConfig();
</script>

<style lang="sass">
.page-enter-active,
.page-leave-active
  transition: all 0.4s

.page-enter-from,
.page-leave-to
  opacity: 0
  filter: blur(1rem)
</style>
