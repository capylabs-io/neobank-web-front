import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Voucher } from "@/plugins/api.js";
import { userStore } from "./userStore";
import { snackBarController } from "@/components/snack-bar/snack-bar-controller.js";
import { loadingController } from "@/components/global-loading/global-loading-controller.js";
export const inventoryStore = defineStore("inventory", () => {
  const user = userStore();
  const loading = loadingController(); //store
  const snackbar = snackBarController(); //store
  const drawer = ref(false);

  const userVoucherPage = ref(1);
  const userVoucherPerPage = ref(10);

  const sortBy = ref("");
  const ivenVoucherQr = ref("");

  const bearerToken = ref({});
  const ivenCardData = ref({});

  const userVoucher = ref([]);
  const userVoucherId = ref([]);

  async function fetchUserVoucher() {
    try {
      loading.increaseRequest();
      const res = await Voucher.fetchUserVouchers(user.userData.id, user.jwt);
      if (!res) {
        snackbar.error(`Error occurred! Please try again later!`);
        return;
      }
      this.userVoucher = res.data.data.map((index) => index.attributes);
      this.userVoucherId = res.data.data
        .filter((campaign) => campaign.attributes.campaign.data)
        .map((index) => index.attributes.campaign.data.id);
    } catch (error) {
      console.error(`Error: ${error}`);
      snackbar.commonError(error);
    } finally {
      loading.decreaseRequest();
    }
  }
  const slicedUserVoucher = computed(() => {
    if (!filterUserVouchers.value) return [];
    return filterUserVouchers.value.slice(
      (userVoucherPage.value - 1) * userVoucherPerPage.value,
      userVoucherPage.value * userVoucherPerPage.value
    );
  });

  const totalUserVoucherPerPage = computed(() => {
    if (!filterUserVouchers.value || filterUserVouchers.value.length == 0) return 1;
    if (filterUserVouchers.value.length % userVoucherPerPage.value == 0)
      return filterUserVouchers.value.length / userVoucherPerPage.value;
    else return Math.floor(filterUserVouchers.value.length / userVoucherPerPage.value) + 1;
  });
  function sortedInventory() {
    const filterUserVouchers = userVoucher.value;
    if ((sortBy.value = "asc")) {
      return filterUserVouchers.sort((a, b) => a.user.data.attributes.email - b.user.data.attributes.email);
    } else if ((sortBy.value = "desc")) {
      return filterUserVouchers.sort((a, b) =>
        b.user.data.attributes.email.localeCompare(a.user.data.attributes.email)
      );
    } else {
      return filterUserVouchers.sort((a, b) => b.id - a.id);
    }
  }
  const filterUserVouchers = computed(() => {
    let filterUserVouchers = [];
    if ((sortBy.value = "asc")) {
      filterUserVouchers = userVoucher.value.sort((a, b) =>
        a.user.data.attributes.email.localeCompare(b.user.data.attributes.email)
      );
    } else if ((sortBy.value = "desc")) {
      filterUserVouchers = userVoucher.value.sort((a, b) =>
        b.user.data.attributes.email.localeCompare(a.user.data.attributes.email)
      );
    } else if ((sortBy.value = "priceUp")) {
      filterUserVouchers = userVoucher.value.sort((a, b) => a.price - b.price);
    } else if ((sortBy.value = "priceDown")) {
      filterUserVouchers = userVoucher.value.sort((a, b) => b.price - a.price);
    } else {
      filterUserVouchers = userVoucher.value.sort((a, b) => b.id - a.id);
    }
    return filterUserVouchers;
  });

  return {
    //computed
    slicedUserVoucher,
    filterUserVouchers,
    totalUserVoucherPerPage,

    //states
    drawer,
    ivenCardData,
    bearerToken,
    userVoucher,
    userVoucherId,
    userVoucherPage,
    userVoucherPerPage,
    sortBy,
    ivenVoucherQr,

    //action
    fetchUserVoucher,
    sortedInventory,
  };
});
/* eslint-enable */
