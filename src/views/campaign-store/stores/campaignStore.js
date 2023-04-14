import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, Category, Partner, Voucher } from "@/plugins/api.js";
import { userStore } from "@/stores/userStore";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { get } from "lodash-es";

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
    vouchersPerPage: 8,

    sortBy: "",
    voucherId: "",

    bearerToken: {},
    detailCard: {},

    searchKey: "",
    voucherData: [],
    voucherDataId: [],
    voucherPurchased: [],

    filterPartner: [],
    filterCategory: [],
    categories: [],
    partners: [],
  }),
  getters: {
    filters() {
      return [
        ...this.filterPartner.map((filter) => {
          return {
            filterName: filter.brandName,
            filterType: "partner",
            id: filter.id,
          };
        }),
        ...this.filterCategory.map((filter) => {
          return {
            filterName: filter.name,
            filterType: "category",
            id: filter.id,
          };
        }),
      ];
    },
    slicedVoucherStore() {
      if (!this.voucherData || this.voucherData.length == 0) return [];
      return this.filteredCampaigns.slice(
        (this.voucherPage - 1) * this.vouchersPerPage,
        this.voucherPage * this.vouchersPerPage
      );
    },
    filteredCampaigns() {
      if (!this.voucherData || this.voucherData.length == 0) return [];
      let filtered = this.sortedCampaigns;
      if (this.searchKey)
        filtered = filtered.filter((campaign) =>
          campaign.title.toLowerCase().includes(this.searchKey.trim().toLowerCase())
        );
      if (this.filterPartner && this.filterPartner.length > 0) {
        const filterIds = this.filterPartner.map((filter) => filter.id);
        filtered = filtered.filter((campaign) => campaign.partner && filterIds.includes(campaign.partner.id));
      }
      if (this.filterCategory && this.filterCategory.length > 0) {
        const filterIds = this.filterCategory.map((filter) => filter.id);
        filtered = filtered.filter(
          (campaign) => campaign.campaignCategory && filterIds.includes(campaign.campaignCategory.id)
        );
      }
      return filtered;
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
      if (!this.voucherData || this.filteredCampaigns.length == 0) return 1;
      if (this.filteredCampaigns.length % this.vouchersPerPage == 0)
        return this.filteredCampaigns.length / this.vouchersPerPage;
      else return Math.floor(this.filteredCampaigns.length / this.vouchersPerPage) + 1;
    },
  },
  actions: {
    removeFilter(removedFilter) {
      if (!removedFilter) return;
      if (removedFilter.filterType == "partner") {
        const indexOfObject = this.filterPartner.findIndex((filter) => {
          return removedFilter.id == filter.id;
        });
        this.filterPartner.splice(indexOfObject, 1);
      } else if (removedFilter.filterType == "category") {
        const indexOfObject = this.filterCategory.findIndex((filter) => {
          return removedFilter.id == filter.id;
        });
        this.filterCategory.splice(indexOfObject, 1);
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await Category.fetch();
        if (!res) {
          alert.error("Error occurred when fetching categories!", "Please try again later!");
          return;
        }
        const categories = get(res, "data.data", []);
        if (!categories && categories.length == 0) return;
        const mappedCategories = categories.map((category) => {
          return {
            id: category.id,
            name: get(category, "attributes.name", "Category Name"),
            icon: get(category, "attributes.iconUrl", ""),
          };
        });
        this.categories = mappedCategories;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchPartners() {
      try {
        loading.show();
        const res = await Partner.fetch();
        if (!res) {
          alert.error("Error occurred when fetching partners!", "Please try again later!");
          return;
        }
        const partners = get(res, "data", []);
        if (!partners && partners.length == 0) return;
        this.partners = partners;
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
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
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },

    async purchaseVoucher() {
      const user = userStore();
      try {
        loading.show();
        const res = await Voucher.purchaseVouchers(this.voucherId, user.jwt);
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
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
    },
    setDetailStoreCard(cards) {
      this.detailCard = cards;
    },
    checkPurchased(message) {
      return alert.error(message);
    },

    checkIncludes() {
      const user = userStore();
      if (this.voucherDataId && user.userVoucherId) {
        this.voucherPurchased = this.voucherDataId.filter((data) => user.userVoucherId.includes(data));
      }
      console.log("Purchased voucher", this.voucherPurchased);
    },
  },
});
/* eslint-enable */
