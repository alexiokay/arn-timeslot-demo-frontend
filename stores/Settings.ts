import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { createPinia } from "pinia";
import uniqid from "uniqid";
import { useStorage } from "@vueuse/core";
import { Timeslot } from "@/types/timeslot";
const pinia = createPinia();

type WorkableTimes = {
  from: string;
  to: string;
};

export const useSettingsStore = defineStore("settingsStore", {
  state: () => {
    return {
      workable_hours: useStorage("workable_hours", {
        from: "9:00",
        to: "17:00",
      } as WorkableTimes),
      saturday_workable_hours: useStorage("saturday_workable_hours", {
        from: "9:00",
        to: "13:00",
      } as WorkableTimes),
      sunday_workable_hours: useStorage("sunday_workable_hours", {
        from: "9:00",
        to: "13:00",
      } as WorkableTimes),
      is_open: useStorage("is_open", false),
      is_saturday_open: useStorage("is_saturday_open", false),
      is_sunday_open: useStorage("is_sunday_open", false),
      max_trucks_per_hour: useStorage("max_trucks_per_hour", 0),
    };
  },
  getters: {
    getWorkableHours(state) {
      return state.workable_hours;
    },
  },
  actions: {},
  persist: {
    storage: persistedState.cookies,
  },
  // other options...
});

export default pinia;
