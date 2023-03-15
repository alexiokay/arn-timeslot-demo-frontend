import { defineStore } from "pinia";
import { createPinia } from "pinia";
import { useStorage } from "@vueuse/core";

const pinia = createPinia();

// @ts-ignore: Unreachable code error
export const useUserStore = defineStore("User", {
  state: () => {
    return {
      username: useStorage("username", ""),
      email: useStorage("email", ""),
      token: useStorage("token", ""),
      isLogged: useStorage("isLogged", false),
      accountType: useStorage("accountType", "carrier"),
    };
  },
  getters: {
    getUsername(state) {
      return state.username;
    },
    getEmail(state) {
      return state.email;
    },
    getToken(state) {
      return state.token;
    },
    getIsLogged(state) {
      return state.isLogged;
    },
    getAccountType(state) {
      return state.accountType;
    },
  },
  actions: {
    setUsername(username: string) {
      this.username = username;
    },
    setEmail(email: string) {
      this.email = email;
    },
    setToken(token: string) {
      this.token = token;
    },
    setIsLogged(bool: boolean) {
      this.isLogged = bool;
    },
    logout() {
      this.username = "";
      this.email = "";
      this.token = "";
      this.isLogged = false;
      this.accountType = "";
    },
    setAccountType(accountType: string) {
      this.accountType = accountType;
    },
  },

  persist: true,
});

export default pinia;
