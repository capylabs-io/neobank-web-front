import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, Voucher } from "@/plugins/api.js";
import { userStore } from "@/stores/userStore";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { inventoryStore } from "@/views/inventory/stores/inventoryStore";
export const campaignStore = defineStore("campaign", {
  state: () => ({
    drawer: false,
    drawerDetail: false,
    cfDialog: false,
    profileEdit: false,
    bankAccountEdit: false,
    changePassword: false,
    purchaseCampaignNoti: false,

    pageIndex: 1,
    index: 1,

    voucherPage: 1,
    vouchersPerPage: 4,

    sortBy: "",
    voucherId: "",

    bearerToken: {},
    detailCard: {},

    voucherData: [],
    voucherDataId: [],
    voucherPurchased: [],
  }),
  getters: {
    slicedVoucherStore() {
      if (!this.voucherData || this.voucherData.length == 0) return [];
      return this.sortedCampaigns.slice(
        (this.voucherPage - 1) * this.vouchersPerPage,
        this.voucherPage * this.vouchersPerPage
      );
    },
    sortedCampaigns() {
      if (!this.voucherData || this.voucherData.length == 0) return [];
      let sortedCampaigns = this.voucherData;
      if (!this.sortBy) return sortedCampaigns;
      switch (this.sortBy) {
        default:
        case "asc":
          sortedCampaigns.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "desc":
          sortedCampaigns.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "newest":
          sortedCampaigns.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "oldest":
          sortedCampaigns.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        case "priceUp":
          sortedCampaigns
            // .filter((voucher) => voucher.price)
            .sort((a, b) => a.price - b.price);
          break;
        case "priceDown":
          sortedCampaigns
            // .filter((voucher) => voucher.price)
            .sort((a, b) => b.price - a.price);
          break;
      }
      return sortedCampaigns;
    },
    totalVoucherPage() {
      if (!this.voucherData || this.sortedCampaigns.length == 0) return 1;
      if (this.sortedCampaigns.length % this.vouchersPerPage == 0)
        return this.sortedCampaigns.length / this.vouchersPerPage;
      else return Math.floor(this.sortedCampaigns.length / this.vouchersPerPage) + 1;
    },
  },
  actions: {
    async fetchVoucher() {
      const user = userStore();
      try {
        loading.show();
        const res = await Voucher.fetchVouchers();
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        this.voucherData = res.data;
        this.voucherDataId = this.voucherData.map((index) => index.id);
        console.log("storeVoucher", this.voucherData);
        console.log("storeVoucherid", this.voucherDataId);
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },

    async purchaseVoucher() {
      try {
        loading.show();
        const res = await Voucher.purchaseVouchers(this.voucherId, this.bearerToken.jwt);
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        console.log("purchase", res.data);
        alert.success("Voucher Purchased successfully!");
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },

    changeVoucherFilter(sortBy) {
      this.sortBy = sortBy;
      console.log("sortBy", this.sortBy);
      console.log("sortedCampaign", this.sortedCampaigns);
    },
    setDetailStoreCard(cards) {
      this.detailCard = cards;
    },
    checkPurchased(message) {
      return alert.error(message);
    },

    checkIncludes() {
      const inventory = inventoryStore();
      if (this.voucherDataId && inventory.userVoucherId) {
        this.voucherPurchased = this.voucherDataId.filter((data) => inventory.userVoucherId.includes(data));
      }
      console.log("Purchased voucher", this.voucherPurchased);
    },
  },
});
/* eslint-enable */
