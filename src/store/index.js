import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiMessage: "",
    token: localStorage.getItem("access_token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isRemember: localStorage.getItem("isRemember") || false,
    dialog: false,
    footerExist: false
  },
  getters: {
    apiMessage(state) {
      return state.apiMessage;
    },
    dialog(state) {
      return state.dialog;
    },
    token(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    },
    isRemember(state) {
      return state.isRemember;
    },
    footerExist(state) {
      return state.footerExist;
    }
  },
  mutations: {
    setApiMessage(state, message) {
      state.apiMessage = message;
    },
    UPDATE_DIALOG(state, value) {
      state.dialog = value;
    },
    setToken(state, value) {
      if (!value) localStorage.removeItem("access_token");
      else localStorage.setItem("access_token", value);
      state.token = value;
    },
    setFooterExist(state, value) {
      state.footerExist = value;
    },
    setUser(state, value) {
      if (!value) localStorage.removeItem("user");
      else localStorage.setItem("user", JSON.stringify(value));
      state.user = value;
    },
    setIsRemember(state, value) {
      localStorage.setItem("isRemember", value);
      state.isRemember = value;
    },
  },
  actions: {},
  modules: {},
});
