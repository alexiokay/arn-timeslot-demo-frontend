import { defineStore } from "pinia";
import { createPinia } from "pinia";

const pinia = createPinia();

// @ts-ignore: Unreachable code error
export const useUserStore = defineStore("User", {
  state: () => {
    return {
      default_login_mode: "carrier",
      username: "",
      email: "",
      token: "",
      isLogged: false,
      accountType: "arrow-employee", //arrow_employee, carrier
    };
  },
  getters: {
    getUser(state) {
      return {
        username: state.username,
        email: state.email,
        token: state.token,
        isLogged: state.isLogged,
        accountType: state.accountType,
      };
    },
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

    setUser(data: any) {
      const user = data.user;
      const account_type =
        user.is_ArrowEmployee === false && user.is_carrier === true
          ? "carrier"
          : "arrow-employee";
      this.accountType = account_type;
      this.username = user.username;
      this.email = user.email;
      this.token = data.token;
      this.isLogged = true;
    },
  },

  persist: {
    storage: persistedState.cookies,
  },
});

export default pinia;
