import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, Category, Partner, User, Voucher } from "@/plugins/api.js";
import { get } from "lodash-es";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import router from "@/router";
export const userStore = defineStore("user", {
  state: () => ({
    rememberMe: false,
    acceptTerm: false,

    jwt: "",
    username: "",
    email: "",
    password: "",
    cfpassword: "",
    avatar: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    userData: {},
    avatarUrl: [],

    drawer: false,
    userVoucherPage: 1,
    userVoucherPerPage: 8,

    sortBy: "",
    ivenVoucherQr: "",
    invenVoucherIconUrl: "",
    searchKey: "",
    sortBy: "",

    bearerToken: {},
    ivenCardData: {},

    userVoucher: [],
    userVoucherId: [],
    filterPartner: [],
    filterCategory: [],
    categories: [],
    partners: [],
    file: null,
  }),
  getters: {
    isConnected() {
      return !!this.userData && !!this.jwt;
    },
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
    slicedUserVoucher() {
      if (!this.userVoucher || this.userVoucher.length == 0) return [];
      return this.filteredInventory.slice(
        (this.userVoucherPage - 1) * this.userVoucherPerPage,
        this.userVoucherPage * this.userVoucherPerPage
      );
    },
    filteredInventory() {
      if (!this.userVoucher || this.userVoucher.length == 0) return [];
      let filtered = this.sortedInventory;
      if (this.searchKey)
        filtered = filtered.filter((campaign) =>
          campaign.campaign.data.attributes.title
            .toLowerCase()
            .includes(this.searchKey.trim().toLowerCase())
        );
      if (this.filterPartner && this.filterPartner.length > 0) {
        const filterIds = this.filterPartner.map((filter) => filter.id);
        filtered = filtered.filter(
          (campaign) =>
            campaign.partner && filterIds.includes(campaign.partner.data.id)
        );
      }
      if (this.filterCategory && this.filterCategory.length > 0) {
        const filterIds = this.filterCategory.map((filter) => filter.id);
        filtered = filtered.filter(
          (campaign) =>
            campaign.campaignCategory &&
            filterIds.includes(campaign.campaignCategory.data.id)
        );
      }
      return filtered;
    },
    sortedInventory() {
      if (!this.userVoucher || this.userVoucher.length == 0) return [];
      let sortedInventory = this.userVoucher;
      if (!this.sortBy) return sortedInventory;
      switch (this.sortBy) {
        default:
        case "asc":
          sortedInventory.sort((a, b) =>
            a.campaign.data.attributes.title.localeCompare(
              b.campaign.data.attributes.title
            )
          );
          break;
        case "desc":
          sortedInventory.sort((a, b) =>
            b.campaign.data.attributes.title.localeCompare(
              a.campaign.data.attributes.title
            )
          );
          break;
        case "newest":
          sortedInventory.sort(
            (a, b) =>
              new Date(b.campaign.data.attributes.createdAt).getTime() -
              new Date(a.campaign.data.attributes.createdAt).getTime()
          );
          break;
        case "oldest":
          sortedInventory.sort(
            (a, b) =>
              new Date(a.campaign.data.attributes.createdAt).getTime() -
              new Date(b.campaign.data.attributes.createdAt).getTime()
          );
          break;
        case "priceUp":
          sortedInventory
            // .filter((voucher) => voucher.price)
            .sort(
              (a, b) =>
                a.campaign.data.attributes.price -
                b.campaign.data.attributes.price
            );
          break;
        case "priceDown":
          sortedInventory
            // .filter((voucher) => voucher.price)
            .sort(
              (a, b) =>
                b.campaign.data.attributes.price -
                a.campaign.data.attributes.price
            );
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
    async signIn() {
      try {
        loading.show();
        const res = await Auth.signIn({
          identifier: this.email,
          password: this.password,
        });
        if (!res) {
          alert.error(`Error occurred! Login Failed`);
          return;
        }
        alert.success("Login successfully!");
        this.jwt = res.data.jwt;
        this.userData = res.data.user;
        if (!this.rememberMe) {
          this.password = "";
        }
        this.router.push("/inventory");
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },

    async register() {
      try {
        if (this.acceptTerm) {
          loading.show();
          const res = await Auth.register({
            email: this.email,
            username: this.username,
            password: this.password,
          });
          if (!res) {
            alert.error(`Error occurred! Login Failed`);
            return;
          }
          alert.success("Register successfully!");
          this.jwt = res.data.jwt;
          this.userData = res.data.user;
          this.updateMetaData(res.data.user.id);
          this.router.push("/login");
        } else {
          alert.error(`Would you follow our Terms and Services `);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
    async fetchUserVoucher() {
      try {
        loading.show();
        const res = await Voucher.fetchUserVouchers(this.userData.id, this.jwt);
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
    async updateAccountSetting() {
      if (this.file) {
        try {
          loading.show();
          const formData = new FormData();
          formData.append("files", this.file);
          console.log("callapi", formData);
          const filedata = await User.uploadFile(formData, this.jwt);
          this.avatarUrl = filedata.data.map((index) => index.url);
          if (!this.avatarUrl) {
            alert.error(`Error occurred Upload File! Please try again later!`);
          } else {
            const res = await User.updateUserInfo(
              this.userData.userMetadata.token,
              this.avatarUrl[0],
              this.userData,
              this.jwt
            );
            if (!res) {
              alert.error(`Error occurred Update! Please try again later!`);
              return;
            }
            this.userData = res.data;
            this.avatar = res.data.avatarUrl;
            alert.success("Update successfully!");
          }
        } catch (error) {
          console.error(`Error: ${error}`);
          alert.error(error);
        } finally {
          loading.hide();
        }
      }
    },
    async updateBankAccount() {
      try {
        const res = await User.updateUserInfo(
          this.userData.userMetadata.token,
          this.userData.userMetadata.avatarUrl,
          this.userData,
          this.jwt
        );
        if (!res) {
          alert.error(`Error occurred Update! Please try again later!`);
          return;
        }
        this.userData = res.data;
        alert.success("Update successfully!");
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },

    async fetchUserMetadata() {
      try {
        loading.show();
        const res = await User.getUserMetadata(this.jwt);
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        this.userData = res.data;
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },

    async updateMetaData(id) {
      try {
        loading.show();
        const res = await User.updateMetaData(id, this.jwt);
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },

    async changePassword() {
      try {
        loading.show();
        const res = await Auth.changePassword(
          this.currentPassword,
          this.newPassword,
          this.confirmNewPassword,
          this.jwt
        );
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        alert.success("Password has been Changed!");
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
    logout() {
      this.jwt = "";
      this.userData = {};
      if (!this.rememberMe) {
        this.email = "";
      }
      this.userVoucherId = [];
      this.password = "";
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmNewPassword = "";
    },
    changeVoucherFilter(sortBy) {
      this.sortBy = sortBy;
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await Category.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching categories!",
            "Please try again later!"
          );
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
    async fetchPartners() {
      try {
        loading.show();
        const res = await Partner.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching partners!",
            "Please try again later!"
          );
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
  },
  persist: [
    {
      paths: ["password", "rememberMe", "username", "userData", "jwt"],
      storage: localStorage,
    },
  ],
});

/* eslint-enable */
