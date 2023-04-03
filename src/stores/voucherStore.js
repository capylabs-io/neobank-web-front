import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, Voucher } from "@/plugins/api.js";
import { userStore } from "./userStore";
import { snackBarController } from "@/components/snack-bar/snack-bar-controller.js";
import { loadingController } from "@/components/global-loading/global-loading-controller.js";
export const voucherStore = defineStore("voucher", () => {
  const user = userStore();
  const loading = loadingController(); //store
  const snackbar = snackBarController(); //store
  const drawer = ref(false);
  const drawerDetail = ref(false);
  const cfDialog = ref(false);
  const profileEdit = ref(false);
  const changePassword = ref(false);

  const pageIndex = ref(1);
  const index = ref(1);
  const voucherPage = ref(1);
  const vouchersPerPage = ref(10);

  const sortBy = ref("");
  const voucherId = ref("");
  const ivenVoucherQr = ref("");

  const bearerToken = ref({});
  const ivenCardData = ref({});
  const accountEditData = ref({});
  const voucherData = ref([]);
  const detailCard = ref({});

  const voucherDataId = ref([]);
  const userVoucher = ref([]);
  const userVoucherId = ref([]);
  const voucherPurchased = ref([]);

  async function fetchVoucher() {
    try {
      loading.increaseRequest();
      const res = await Voucher.fetchVouchers(this.bearerToken.jwt);
      if (!res) {
        snackbar.error(`Error occurred! Please try again later!`);
        return;
      }
      this.voucherData = res.data;
      this.voucherDataId = this.voucherData.map((index) => index.id);
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
        this.bearerToken.jwt
      );
      if (!res) {
        snackbar.error(`Error occurred! Please try again later!`);
        return;
      }
      console.log("purchase", res.data);
      snackbar.success("Voucher Purchased successfully!");
    } catch (error) {
      console.error(`Error: ${error}`);
      snackbar.commonError(error);
    }
  }
  async function fetchUserVoucher() {
    try {
      loading.increaseRequest();
      const res = await Voucher.fetchUserVouchers(
        user.userData.id,
        this.bearerToken.jwt
      );
      if (!res) {
        snackbar.error(`Error occurred! Please try again later!`);
        return;
      }
      this.userVoucher = res.data.data.map((index) => index.attributes);
      this.userVoucherId = res.data.data.map(
        (index) => index.attributes.campaign.data.id
      );
      console.log("userVoucher", userVoucher);
      console.log("userVoucherId", userVoucherId);
    } catch (error) {
      console.error(`Error: ${error}`);
      snackbar.commonError(error);
    }
  }
  function changeVoucherFilter(sortBy) {
    this.sortBy = sortBy;
    console.log("sortBy", this.sortBy);
    console.log("sortedCampaign", this.sortedCampaign);
  }
  function setDetailStoreCard(cards) {
    this.detailCard = cards;
  }

  function checkIncludes() {
    if (this.voucherDataId && this.userVoucherId) {
      this.voucherPurchased = this.voucherDataId.filter((data) =>
        this.userVoucherId.includes(data)
      );
    }
    console.log("Purchased voucher", voucherPurchased);
  }

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
        Math.floor(filterVoucherStore.value.length / vouchersPerPage.value) + 1
      );
  });
  function sortedCampaign() {
    const filterVoucherStore = voucherData.value;
    if ((sortBy.value = "asc")) {
      return filterVoucherStore.sort((a, b) => a.title - b.title);
    } else if ((sortBy.value = "desc")) {
      return filterVoucherStore.sort((a, b) => b.title.localeCompare(a.title));
    } else if ((sortBy.value = "priceUp")) {
      return filterVoucherStore.sort((a, b) => a.price - b.price);
    } else if ((sortBy.value = "priceDown")) {
      return filterVoucherStore.sort((a, b) => b.price - a.price);
    } else {
      return filterVoucherStore.sort((a, b) => b.id - a.id);
    }
  }
  const filterVoucherStore = computed(() => {
    let filterVoucherStore = [];
    if ((sortBy.value = "asc")) {
      filterVoucherStore = voucherData.value.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if ((sortBy.value = "desc")) {
      filterVoucherStore = voucherData.value.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    } else if ((sortBy.value = "priceUp")) {
      filterVoucherStore = voucherData.value.sort((a, b) => a.price - b.price);
    } else if ((sortBy.value = "priceDown")) {
      filterVoucherStore = voucherData.value.sort((a, b) => b.price - a.price);
    } else {
      filterVoucherStore = voucherData.value.sort((a, b) => b.id - a.id);
    }
    return filterVoucherStore;
  });

  return {
    //computed
    slicedVoucherStore,
    filterVoucherStore,
    totalVoucherPage,

    //states
    drawer,
    ivenCardData,
    index,
    drawerDetail,
    detailCard,
    pageIndex,
    bearerToken,
    voucherData,
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
    changePassword,
    profileEdit,
    accountEditData,

    //action
    fetchVoucher,
    fetchUserVoucher,
    purchaseVoucher,
    checkIncludes,
    setDetailStoreCard,
    changeVoucherFilter,
    sortedCampaign,
  };
});
/* eslint-enable */
