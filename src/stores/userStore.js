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
    const pageIndex = ref(1);
    const index = ref(1);
    const cfDialog = ref(false);
    const scrollY = ref(1);
    const jwt = ref("");
    const rememberMe = ref(false);
    const isShowPass = ref(false);
    const sortBy = ref("asc");
    const username = ref("");
    const password = ref("");
    const voucherId = ref("");
    const ivenVoucherQr = ref("");
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

    const ivenCardData = ref({
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
      image: null,
      icon: null,
      price: "",
      title: "",
      status: "",
      detailheader: "",
      firstDetail: "",
      secondDetail: "",
    });
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
        console.log("purchase", res.data);
        snackbar.success("Voucher Purchased successfully!");
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
        this.userVoucher = res.data.map((index) => index);
        this.userVoucherId = res.data.map((index) => index.voucher.id);
        console.log("userVoucher", userVoucher);
        console.log("userVoucherId", userVoucherId);
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }
    function setDetailStoreCard(cards) {
      this.detailCard = cards.attributes;
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

    const slicedVoucherStore = computed(() => {
      if (!filterVoucherStore.value) return [];
      return filterVoucherStore.value.slice(
        (voucherPage.value - 1) * vouchersPerPage.value,
        voucherPage.value * vouchersPerPage.value
      );
    });

    const totalVoucherPage = computed(() => {
      if (!filterVoucherStore.value || filterVoucherStore.value.length == 0)
        return 1;
      if (filterVoucherStore.value.length % vouchersPerPage.value == 0)
        return filterVoucherStore.value.length / vouchersPerPage.value;
      else
        return (
          Math.floor(filterVoucherStore.value.length / vouchersPerPage.value) +
          1
        );
    });
    const filterVoucherStore = computed(() => {
      let filterVoucherStore = [];
      if ((sortBy.value = "asc")) {
        filterVoucherStore = voucherData.value.sort(
          (a, b) => b.attributes.title - a.attributes.title
        );
      } else if ((sortBy.value = "desc")) {
        filterVoucherStore = voucherData.value.sort(
          (a, b) => a.attributes.title - b.attributes.title
        );
      } else if ((sortBy.value = "priceUp")) {
        filterVoucherStore = voucherData.value.sort(
          (a, b) => a.attributes.price - b.attributes.price
        );
      } else if ((sortBy.value = "priceDown")) {
        filterVoucherStore = voucherData.value.sort(
          (a, b) => b.attributes.price - a.attributes.price
        );
      } else {
        filterVoucherStore = voucherData.value.sort((a, b) => b.id - a.id);
      }
      return filterVoucherStore;
    });

    return {
      //computed
      isConnected,
      slicedVoucherStore,
      filterVoucherStore,
      totalVoucherPage,
      //states
      drawer,
      ivenCardData,
      index,
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
      sortBy,
      ivenVoucherQr,
      //action
      signIn,
      logout,
      fetchVoucher,
      fetchUserVoucher,
      purchaseVoucher,
      checkIncludes,
      setDetailStoreCard,
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
