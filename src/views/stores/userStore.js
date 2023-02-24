import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, Voucher } from "@/plugins/api.js";
import { snackBarController } from "@/components/snack-bar/snack-bar-controller.js";
import { loadingController } from "@/components/global-loading/global-loading-controller.js";
// import { voucherInfo } from "@/views/stores/interface/voucherInfo";
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
    const bearerToken = ref(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc3MDUwOTA1LCJleHAiOjE2Nzk2NDI5MDV9.gCEGMkbCLUiaymG7PPoGsS5OstagMUR6GRFvmrP8VC8"
    );
    const pagination = ref({ page: 1, pageCount: 1, pageSize: 5, total: 5 });

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
    const voucherData = ref([]);
    // const voucherData = ref([
    //   {
    //     name: "",
    //     price: "",
    //     title: "",
    //     quantity: 1,
    //     iconUrl: "",
    //     expiredTime: "",
    //     shortDescription: "",
    //     fullDescription: "",
    //     isActive: false,
    //     imageUrl: "",
    //     createdAt: "",
    //     updatedAt: "",
    //     publishedAt: "",
    //   },
    // ]);
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
          this.signInData = "";
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

    async function fetchVoucher() {
      try {
        loading.increaseRequest();
        const res = await Voucher.fetchVouchers(this.bearerToken);
        if (!res) {
          snackbar.commonError(`Error occurred! Please try again later!`);
          return;
        }
        snackbar.success("Fetch successfully!");
        this.voucherData = res.data.data.map((voucher) => voucher.attributes);
        this.pagination = res.data.meta;
        // this.router.push({
        //   params: "vn",
        //   name: "Redeem",
        // });
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }

    function logout() {
      this.isSignin = false;
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
      bearerToken,
      voucherData,
      pagination,
      //action
      signIn,
      logout,
      fetchVoucher,
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
