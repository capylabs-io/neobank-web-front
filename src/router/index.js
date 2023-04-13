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
    meta: {
      isHome: true,
    },
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/UserLayout.vue"),
    meta: {
      requiresAuth: true,
      isUserPage: true,
    },
    children: [
      {
        path: "/inventory",
        name: "Inventory",
        component: () =>
          import("../views/inventory/pages/Redeem-inventory.vue"),
        meta: {
          requiresAuth: true,
          isUserPage: true,
        },
      },
      {
        path: "/account-setting",
        name: "Account Setting",
        component: () =>
          import("../views/account-setting/pages/account-setting.vue"),
        meta: {
          requiresAuth: true,
          isUserPage: true,
        },
      },
      {
        path: "/store",
        name: "Store",
        component: () => import("../views/campaign-store/pages/StorePage.vue"),
        meta: {
          isUserPage: true,
        },
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
    alert.error("You have to login before accessing this page!");
    next("/login");
  }
  next();
});

export default router;
