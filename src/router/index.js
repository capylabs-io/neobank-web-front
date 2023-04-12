import Vue from "vue";
import VueRouter from "vue-router";
import { userStore } from "@/stores/userStore";
import alert from "@/plugins/alert";

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
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/inventory",
        name: "Inventory",
        component: () =>
          import("../views/redeem/pages/inventory/Redeem-inventory.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/account-setting",
        name: "Account Setting",
        component: () =>
          import("../views/redeem/pages/accountSetting/account-setting.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/store",
        name: "Store",
        component: () => import("../views/redeem/pages/campaign/StorePage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/account-unAuth",
    name: "Account Unauthor",
    component: () => import("../views/redeem/pages/UserLayoutUnAuth.vue"),
    children: [
      {
        path: "/store-unAuth",
        name: "Store Unauthor",
        component: () =>
          import("../views/redeem/pages/campaign/StorePageUnAuth.vue"),
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
router.beforeEach((to, from, next) => {
  const user = userStore();
  if (to.meta && to.meta.requiresAuth && !user.isConnected) {
    alert.error("You have to login to accessing The Stores!");
    next("/store-unAuth");
  }
  next();
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
