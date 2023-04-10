import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Voucher } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { userStore } from "@/stores/userStore";
export const inventoryStore = defineStore("inventory", {
  state: () => ({
    drawer: false,
    userVoucherPage: 1,
    userVoucherPerPage: 10,

    sortBy: "",
    ivenVoucherQr: "",
    invenVoucherIconUrl: "",

    bearerToken: {},
    ivenCardData: {},

    userVoucher: [],
    userVoucherId: [],
  }),
  getters: {
    slicedUserVoucher() {
      if (!this.userVoucher || this.userVoucher.length == 0) return [];
      return this.sortedInventory.slice(
        (this.userVoucherPage - 1) * this.userVoucherPerPage,
        this.userVoucherPage * this.userVoucherPerPage
      );
    },
    sortedInventory() {
      if (!this.userVoucher || this.userVoucher.length == 0) return [];
      let sortedInventory = this.userVoucher;
      if (!this.sortBy) return sortedInventory;
      switch (this.sortBy) {
        default:
        case "desc":
          sortedInventory.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "desc":
          sortedInventory.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "priceUp":
          sortedInventory
            .filter((voucher) => voucher.price)
            .sort((a, b) => a.price - b.price);
          break;
        case "priceDown":
          sortedInventory
            .filter((voucher) => voucher.price)
            .sort((a, b) => b.price - a.price);
          break;
      }
      return sortedInventory;
    },
    totalUserVoucherPerPage() {
      if (!this.userVoucher || this.sortedInventory.length == 0) return 1;
      if (this.sortedInventory.length % this.userVoucherPerPage == 0)
        return this.sortedInventory.length / this.userVoucherPerPage;
      else
        return (
          Math.floor(this.sortedInventory.length / this.userVoucherPerPage) + 1
        );
    },
  },
  actions: {
    async fetchUserVoucher() {
      const user = userStore();
      try {
        loading.show();
        const res = await Voucher.fetchUserVouchers(user.userData.id, user.jwt);
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        this.userVoucher = res.data.data.map((index) => index.attributes);
        this.userVoucherId = res.data.data
          .filter((campaign) => campaign.attributes.campaign.data)
          .map((index) => index.attributes.campaign.data.id);
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
  },
});
/* eslint-enable */
