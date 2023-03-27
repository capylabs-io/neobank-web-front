import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, Voucher } from "@/plugins/api.js";
import { snackBarController } from "@/components/snack-bar/snack-bar-controller.js";
import { loadingController } from "@/components/global-loading/global-loading-controller.js";
export const userStore = defineStore(
  "user",
  () => {
    const loading = loadingController(); //store
    const snackbar = snackBarController(); //store
    const jwt = ref("");
    const rememberMe = ref(false);
    const isShowPass = ref(false);
    const username = ref("");
    const password = ref("");

    const userData = ref({});

    async function signIn() {
      try {
        loading.increaseRequest();
        const res = await Auth.signIn({
          identifier: this.username,
          password: this.password,
        });
        if (!res) {
          snackbar.commonError(`Error occurred! Please try again later!`);
          return;
        }
        snackbar.success("Login successfully!");
        this.jwt = res.data.jwt;
        this.userData = res.data.user;
        if (!this.rememberMe) {
          this.password = "";
        }
        this.router.push({
          params: "vn",
          name: "home",
        });
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }

    function logout() {
      jwt.value = "";
      userData.value = "";
    }
    const isConnected = computed(() => jwt);

    return {
      //computed
      isConnected,
      //states
      username,
      password,
      jwt,
      isShowPass,
      userData,
      rememberMe,
      //action
      signIn,
      logout,
    };
  },
  {
    persist: [
      {
        paths: ["password", "rememberMe", "username"],
        storage: localStorage,
      },
      {
        paths: ["userData", "jwt"],
        storage: sessionStorage,
      },
    ],
  }
);
/* eslint-enable */
