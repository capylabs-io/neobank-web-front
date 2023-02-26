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
    const cfDialog = ref(false);
    const scrollY = ref(1);
    const jwt = ref("");
    const rememberMe = ref(false);
    const isShowPass = ref(false);
    const username = ref("");
    const password = ref("");
    const voucherId = ref("");
    const bearerToken = ref(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc3MDUwOTA1LCJleHAiOjE2Nzk2NDI5MDV9.gCEGMkbCLUiaymG7PPoGsS5OstagMUR6GRFvmrP8VC8"
    );
    const pagination = ref({ page: 0, pageCount: 0, pageSize: 0, total: 0 });

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
    const voucherDataId = ref([]);
    const userVoucher = ref([]);
    const userVoucherId = ref([]);
    const voucherPurchased = ref([]);
    const detailCard = ref({
      price: "",
      imageUrl: "",
      iconUrl: "",
      title: "",
      status: "",
      shortDescription: "",
      fullDescription: "",
      quantity: "",
    });
    const userData = ref({
      id: 1,
      username: "",
      email: "",
    });

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

    async function fetchVoucher() {
      try {
        loading.increaseRequest();
        const res = await Voucher.fetchVouchers(this.bearerToken);
        if (!res) {
          snackbar.commonError(`Error occurred! Please try again later!`);
          return;
        }
        snackbar.success("Fetch successfully!");
        // this.voucherData = res.data.data.map((voucher) => voucher.attributes);
        this.voucherData = res.data.data;
        this.voucherDataList = this.voucherData.map((index) => index.id);
        // .sort((a, b) => b.id - a.id);
        // console.log("sort",voucherData);
        this.pagination = res.data.meta;
        console.log("pagination", pagination);
        console.log("storeVoucher", voucherData);
        console.log("storeVoucherid", voucherDataId);
        // this.router.push({
        //   params: "vn",
        //   name: "Redeem",
        // });
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }
    async function purchaseVoucher() {
      try {
        loading.increaseRequest();
        const res = await Voucher.purchaseVouchers(
          this.voucherId,
          this.bearerToken
        );
        if (!res) {
          snackbar.commonError(`Error occurred! Please try again later!`);
          return;
        }
        snackbar.success("Voucher Purchased successfully!");
        console.log("purchase", res.data);
        // this.router.push({
        //   params: "vn",
        //   name: "Redeem",
        // });
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }
    async function fetchUserVoucher() {
      try {
        loading.increaseRequest();
        const res = await Voucher.fetchUserVouchers(this.bearerToken);
        if (!res) {
          snackbar.commonError(`Error occurred! Please try again later!`);
          return;
        }
        snackbar.success("Voucher Purchased successfully!");
        this.userVoucher = res.data.map((index) => index.voucher);
        this.userVoucherList = res.data.map((index) => index.voucher.id);
        console.log("userVoucher", userVoucher);
        console.log("userVoucherId", userVoucherId);

        // this.router.push({
        //   params: "vn",
        //   name: "Redeem",
        // });
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }

    function checkIncludes() {
      this.voucherPurchased = this.voucherDataId.filter((data) => {
        return this.userVoucherId.includes(data);
      });
      // const checkInclude = this.voucherData.filter((data) => {
      //   return this.userVoucherList.includes(data);
      // });
      console.log("Purchased voucher", voucherPurchased);
    }
    function logout() {
      this.jwt = "";
      this.signInData = "";
      this.userData = null;
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
      drawerDetail,
      detailCard,
      signInData,
      username,
      password,
      jwt,
      pageIndex,
      isShowPass,
      userData,
      rememberMe,
      bearerToken,
      voucherData,
      pagination,
      cfDialog,
      voucherId,
      scrollY,
      userVoucher,
      userVoucherId,
      voucherDataId,
      voucherPurchased,
      //action
      signIn,
      logout,
      fetchVoucher,
      fetchUserVoucher,
      purchaseVoucher,
      checkIncludes,
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
