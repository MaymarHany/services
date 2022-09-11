import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: {
      render(c) {
        return c("router-view");
      },
    },
    children: [
      {
        path: "",
        component: () => import("../modules/home/index"),
        children: [
          {
            path: "/",
            name: "landingPage",
            component: () => import("../modules/home/components/landing-page"),
          },
        ],
      },



    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
