import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/pages/Home.vue";
import i18n from "@/i18n";
Vue.use(VueRouter);
const routes = [
  {
    path: "",
    redirect: `/home`,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/redeem",
    name: "Redeem",
    component: () => import("../views/redeem/pages/Redeem.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/pages/Login.vue"),
  },
  // {
  //   path: "/:lang",
  //   component: {
  //     render(c) {
  //       return c("router-view");
  //     },
  //   },
  //   children: [

  //   ],
  // },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
// router.beforeEach((to, from, next) => {
//   // use the language from the routing param or default language
//   let language = to.params.lang;
//   if (!language) {
//     language = "en";
//   }
//   // set the current language for i18n.
//   i18n.locale = language;
//   next();
// });

export default router;
