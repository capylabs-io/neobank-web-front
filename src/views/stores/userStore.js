import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth } from "@/plugins/api.js";
import { snackBarController } from "@/components/snack-bar/snack-bar-controller.js";
import { loadingController } from "@/components/global-loading/global-loading-controller.js";

export const userStore = defineStore(
  "user",
  () => {
    const loading = loadingController(); //store
    const snackbar = snackBarController(); //store
    const drawer = ref(false);
    const drawerDetail = ref(false);
    const navChange = ref(false);
    const pageIndex = ref(1);
    const index = ref(1);
    const isSignin = ref(false);
    const jwt = ref("");
    const rememberMe = ref(false);
    const isShowPass = ref(false);
    const signInData = ref({
      identifier: "",
      password: "",
    });
    const cardData = ref({
      image: null,
      icon: null,
      price: "",
      title: "",
      status: "",
      detailheader: "",
      firstDetail: "",
      secondDetail: "",
    });
    const detailCard = ref({
      image: null,
      icon: null,
      price: "",
      title: "",
      status: "",
      detailheader: "",
      firstDetail: "",
      secondDetail: "",
    });
    const userData = ref({
      id: 1,
      username: "",
      email: "",
    });

    async function signIn() {
      try {
        loading.increaseRequest();
        const res = await Auth.signIn(this.signInData);
        if (!res) {
          snackbar.commonError(`Error occurred! Please try again later!`);
          return;
        }
        snackbar.success("Login successfully!");
        this.jwt = res.data.jwt;
        this.userData = res.data.user;
        if (this.rememberMe) {
          this.signInData = signInData;
        } else {
          this.signInData = null;
        }
        this.isSignin = true;
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
      this.isSignin = false;
      this.jwt = "";
      this.signInData = "";
      // sessionStorage.clear();
      // localStorage.clear();
    }
    const isConnected = computed(() => this.jwt);

    return {
      //
      isConnected,
      //states
      drawer,
      cardData,
      index,
      navChange,
      isSignin,
      drawerDetail,
      detailCard,
      signInData,
      jwt,
      pageIndex,
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
        paths: ["signInData", "rememberMe"],
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
