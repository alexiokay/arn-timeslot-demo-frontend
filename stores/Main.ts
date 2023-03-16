import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { createPinia } from "pinia";
import uniqid from "uniqid";
import { useStorage } from "@vueuse/core";
import { Timeslot } from "@/types/timeslot";
const pinia = createPinia();

export const useMainStore = defineStore("mainStore", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      initialized: useStorage("initialized", false),
      isMobileNavbarOpen: useStorage("isMobileNavbarOpen", false),
      isLocaleSet: useStorage("isLocaleSet", false),
      isOverlaying: useStorage("isOverlaying", false),
      default_settings: useStorage("settings", {
        workable_times: "9-21",
        max_amount_of_trucks_per_hour: 4,
      }),
      dates: useStorage("dates", [
        {
          id: 24,
          date: "2023-03-15", //ISO 8601 format - YYYY-MM-DD
          timeslots: [
            {
              id: 52,
              start_time: "9:00",
              end_time: "10:00",
              amount_of_trucks: 0,
              is_open: true,
            } as Timeslot,
          ],
        },
      ]),
    };
  },
  getters: {
    getIsLocaleSet(state) {
      return state.isLocaleSet;
    },
    getIsMobileNavbarOpen(state) {
      return state.isMobileNavbarOpen;
    },

    isInitiated(state) {
      return state.initialized;
    },
    getDates(state) {
      return state.dates;
    },
    getDatesByDate: (state) => {
      return (date: string) => {
        return state.dates.find((_date) => _date.date === date);
      };
    },

    getDefaulSettings(state) {
      return state.default_settings;
    },
    getTimeslotsByDate: (state) => {
      return (date: string) => {
        return state.dates.find((_date) => _date.date === date)?.timeslots;
      };
    },
  },
  actions: {
    initialize() {
      // this is called when the store is initialized
      this.initialized = true;
    },
    hideMobileNavbar() {
      this.isMobileNavbarOpen = false;
    },
    showMobileNavbar() {
      this.isMobileNavbarOpen = true;
    },

    setLocaleSet(value: boolean = true) {
      this.isLocaleSet = value;
    },
    setOverlaying(bool: boolean) {
      this.isOverlaying = bool;
    },
    setTimeslot(dateId: number, timeslotId: number) {
      // find specified date and timeslot
      const dateIndex = this.dates.findIndex((date) => date.id === dateId);

      const timeslotIndex = this.dates[dateIndex].timeslots.findIndex(
        (timeslot) => timeslot.id === timeslotId
      );
      const timeslot = this.dates[dateIndex].timeslots[timeslotIndex];

      // search for timeslot in date and sets ...
      if (timeslot) {
        timeslot.amount_of_trucks = timeslot.amount_of_trucks + 1;
        console.log(timeslot.amount_of_trucks);
      }

      // TODO! call composable or function to save to database
    },
  },
  persist: true,
  // other options...
});

export default pinia;
