import axios from "axios";
import router from "../../../router/index";
import store from "../../../store/index";

let isRefreshing = store.getters["isRemember"];

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const {
      config,
      response: { status, data },
    } = err;

    const originalRequest = config;
    if (data.message === "Missing token") {
      router.push({ name: "auth" });
      return Promise.reject(false);
    }
    if (originalRequest.url.includes("login_check")) {
      return Promise.reject(err);
    }
    if (status === 401 && data.message === "Expired token") {
      if (isRefreshing == true) {
        axios
          .post("https://admin.saudiblood.org/api/auth/refresh")
          .then((response) => {
            if (response === 200 || response == 204) {
              // isRefreshing = false;
              store.commit("setIsRemember", false);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$store.commit("setToken", null);
        this.$store.commit("setUser", null);
        router.push({ name: "auth" });
      }
    } else return Promise.reject(data);
  }
);
