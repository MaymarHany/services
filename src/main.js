import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import "./assets/styles/main.scss";

import Vuelidate from "vuelidate";

// import the styles

Vue.use(Vuelidate);

Vue.config.productionTip = false;
Vue.filter("bytes", function (data, to) {
    const const_term = 1024;

    // Convert the values and concatenate
    // the appropriate unit
    if (to === "KB") {
      return (data / const_term).toFixed(3) + "KB";
    } else if (to === "MB") {
      return (data / const_term ** 2).toFixed(3) + "MB";
    } else if (to === "GB") {
      return (data / const_term ** 3).toFixed(3) + "GB";
    } else if (to === "TB") {
      return (data / const_term ** 4).toFixed(3) + "TB";
    } else {
      return "Please pass valid option";
    }
  }
)

new Vue({
  vuetify,
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");
