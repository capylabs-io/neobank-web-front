import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/pages/Home.vue";

// import i18n from "@/i18n";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: `/home`,
  },
  // {
  //   path: "/home",
  //   name: "home",
  //   component: Home,
  // },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/pages/Landing-page.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/redeem/pages/UserLayout.vue"),
    children: [
      {
        path: "/inventory",
        name: "Inventory",
        component: () => import("../views/redeem/pages/Redeem-inventory.vue"),
      },
      {
        path: "/account-setting",
        name: "Account Setting",
        component: () => import("../views/redeem/pages/account-setting.vue"),
      },
      {
        path: "/store",
        name: "Store",
        component: () => import("../views/redeem/pages/StorePage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/pages/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/login/pages/Register.vue"),
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
