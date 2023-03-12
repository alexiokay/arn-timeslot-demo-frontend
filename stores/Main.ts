import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import uniqid from "uniqid";
import { useStorage } from "@vueuse/core";

const pinia = createPinia();
pinia.use(piniaPersist);

export const useMainStore = defineStore("mainStore", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      initialized: useStorage("initialized", false),
      isMobileNavbarOpen: useStorage("isMobileNavbarOpen", false),
      isLocaleSet: useStorage("isLocaleSet", false),
      isOverlaying: useStorage("isOverlaying", false),
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
  },

  // other options...
});

export default pinia;
