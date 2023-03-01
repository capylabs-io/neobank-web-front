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
    const pagination = ref({ page: 1, pageCount: 1, pageSize: 1, total: 1 });
    const vouchersPerPage = ref(10);
    const voucherPage = ref(1);
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
    const detailCard = ref({});
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

    async function fetchVoucher() {
      try {
        loading.increaseRequest();
        const res = await Voucher.fetchVouchers(this.bearerToken);
        if (!res) {
          snackbar.commonError(`Error occurred! Please try again later!`);
          return;
        }
        snackbar.success("Fetch successfully!");
        this.voucherData = res.data.data;
        this.pagination = res.data.meta.pagination;
        this.voucherDataId = this.voucherData.map((index) => index.id);
        // .sort((a, b) => b.id - a.id);
        // console.log("sort",voucherData);
        console.log("pagination", pagination);
        console.log("storeVoucher", voucherData);
        console.log("storeVoucherid", voucherDataId);
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
        this.$router.push({
          params: "vn",
          name: "Redeem",
        });
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
        this.userVoucherId = res.data.map((index) => index.voucher.id);
        console.log("userVoucher", userVoucher);
        console.log("userVoucherId", userVoucherId);
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }

    function checkIncludes() {
      if (this.voucherDataId && this.userVoucherId) {
        this.voucherPurchased = this.voucherDataId.filter((data) =>
          this.userVoucherId.includes(data)
        );
      }
      console.log("Purchased voucher", voucherPurchased);
    }
    function logout() {
      jwt.value = "";
      userData.value = "";
    }
    const isConnected = computed(() => jwt);
    // const slicedVoucherStore = computed(() => {
    //   if (!this.voucherData) return [];
    //   return this.voucherData.slice(
    //     (this.voucherPage - 1) * this.vouchersPerPage,
    //     this.voucherPage * this.vouchersPerPage
    //   );
    // });

    // const totalVoucherPage = computed(() => {
    //   if (!this.voucherData || this.voucherData.length == 0) return 1;
    //   if (this.voucherData.length % this.vouchersPerPage == 0)
    //     return this.voucherData.length / this.vouchersPerPage;
    //   else
    //     return Math.floor(this.voucherData.length / this.vouchersPerPage) + 1;
    // });

    // const filterVoucherStore = computed(() =>
    //   this.voucherData.filter((a, b) => b.status - a.status)
    // );

    return {
      //computed
      isConnected,
      // slicedVoucherStore,
      // filterVoucherStore,
      // totalVoucherPage,
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
      voucherPage,
      vouchersPerPage,
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
