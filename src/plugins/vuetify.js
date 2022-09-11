import "@mdi/font/css/materialdesignicons.css";

import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify, {
  iconfont: "mdi",

});
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#c93737',
        secondary: '#b0bec5',
        anchor: '#8c9eff',
      },
    },
  },
})
export default vuetify;

