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

const route = useRoute();
const config = useRuntimeConfig();
const userStore = useUserStore();
const mainStore = useMainStore();

// if user is logged in and route is not login
// TODO: if dates alraedy exists in mainStore, dont fetch them again (data must be se)

let chatSocket: any = null;

let websocketLink: string = config.API_URL.split("//")[1];
onMounted(() => {
  chatSocket = new WebSocket("ws://" + websocketLink + "ws/" + "reservations");

  chatSocket.onmessage = function (e: any) {
    const data = JSON.parse(e.data);
    console.log(typeof data.reservation);

    // if reservation doenst have reservation then it should has reservation_id
    let reservation = data["reservation"]
      ? data["reservation"]
      : data["reservation_id"];

    // just a test
    // if (data.reservation_id) console.log(data.reservation_id);

    // check signal type  and chosee proper action
    if (data.updated) mainStore.updateReservation(reservation);
    if (data.deleted) mainStore.removeReservation(reservation);
    if (data.added) mainStore.addReservation(reservation);
  };

  chatSocket.onclose = function (e: any) {
    console.error("Chat socket closed unexpectedly");
    // interval which try to connect again to the socket
    let interval: any = null;
    interval = setInterval(async () => {
      console.log("Trying to reconnect...");
      chatSocket = new WebSocket(
        "ws://127.0.0.1:8001" + "/ws/" + "reservations"
      );
      if (chatSocket.readyState === WebSocket.OPEN) {
        clearInterval(interval);
      }
    }, 5000);
  };
});

AppSetup();
const locale = useState<string>("locale.setting");
const app = useAppConfig();

const getSimpleDates = async () => {
  const options = {
    method: "GET",
    headers: {
      Host: `${config.FETCH_HOST}`,
      Authorization: `Token ${userStore.getToken}`,
    },
  } as any;

  return await fetch(`${config.API_URL}api/v1/simple_dates/`, options)
    .then((res) => res.json())
    .then((data) => {
      const mappedData = data.map((obj: any) => ({
        id: obj.id,
        date: new Date(obj.date),
        is_open: obj.is_open,
        workable_times: obj.workable_times,
        timeslots: obj.timeslots,
      }));
      return mappedData;
    });
};

if (userStore.getIsLogged && route.path !== "/" && route.path !== "/register") {
  const dates = await getSimpleDates();

  mainStore.setDates(dates);

  const reservations = await getNewReservations();
  mainStore.setReservations(reservations);
}

watch(
  () => userStore.getIsLogged,
  async (val) => {
    if (val === true) {
      const dates = await getSimpleDates();

      mainStore.setDates(dates);

      const reservations = await getNewReservations();
      mainStore.setReservations(reservations);

      console.log("test");
    }
  }
);
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
