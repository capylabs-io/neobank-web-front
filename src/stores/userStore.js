import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, User, Voucher } from "@/plugins/api.js";
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
    userVoucherPerPage: 10,

    sortBy: "",
    ivenVoucherQr: "",
    invenVoucherIconUrl: "",

    bearerToken: {},
    ivenCardData: {},

    userVoucher: [],
    userVoucherId: [],
    file: null,
  }),
  getters: {
    isConnected() {
      return !!this.userData && !!this.jwt;
    },
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
      if (!this.rememberMe) {
        this.userData = {};
        this.email = "";
      }
      this.password = "";
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmNewPassword = "";
    },
    isEditEnable() {
      if (this.email && this.password) return false;
      return true;
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
