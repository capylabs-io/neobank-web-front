import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getActivePinia } from "pinia";
import { Auth, User, Voucher } from "@/plugins/api.js";
import { snackBarController } from "@/components/snack-bar/snack-bar-controller.js";
import { loadingController } from "@/components/global-loading/global-loading-controller.js";
export const userStore = defineStore(
  "user",
  () => {
    const loading = loadingController(); //store
    const snackbar = snackBarController(); //store
    const jwt = ref("");
    const rememberMe = ref(false);
    const isShowPass = ref(false);
    const isShowcPass = ref(false);
    const isShowpPass = ref(false);
    const username = ref("");
    const password = ref("");
    const file = ref(null);
    const avatarUrl = ref([]);
    const avatar = ref("");
    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmNewPassword = ref("");
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
          name: "home",
        });
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }
    async function changePassword() {
      try {
        loading.increaseRequest();
        const res = await Auth.changePassword(
          this.currentPassword,
          this.newPassword,
          this.confirmNewPassword,
          this.jwt
        );
        if (!res) {
          snackbar.commonError(`Error occurred! Please try again later!`);
          return;
        }
        snackbar.success("Password has been Changed!");
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }
    async function updateAccountSetting() {
      try {
        loading.increaseRequest();
        const res = await User.updateUserInfo(
          this.avatarUrl[0],
          this.userData,
          this.jwt
        );
        if (!res) {
          snackbar.commonError(`Error occurred! Please try again later!`);
          return;
        }
        this.userData = res.data;
        this.avatar = res.data.avatarUrl;
        snackbar.success("Update successfully!");
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }
    async function uploadFile() {
      if (this.file) {
        const formData = new FormData();
        formData.append("files", this.file);
        console.log("callapi", formData);
        try {
          loading.increaseRequest();
          const res = await User.uploadFile(formData, this.jwt);
          if (!res) {
            snackbar.commonError(`Error occurred! Please try again later!`);
            return;
          }
          this.avatarUrl = res.data.map((index) => index.url);
          snackbar.success("Upload Image successfully!");
        } catch (error) {
          console.error(`Error: ${error}`);
          snackbar.commonError(error);
        }
      }
    }
    function logout() {
      jwt.value = "";
      userData.value = "";
    }
    const isConnected = computed(() => jwt);

    return {
      //computed
      isConnected,
      //states
      username,
      password,
      jwt,
      isShowPass,
      userData,
      rememberMe,
      file,
      currentPassword,
      newPassword,
      confirmNewPassword,
      isShowcPass,
      isShowpPass,
      avatarUrl,
      avatar,
      //action
      signIn,
      logout,
      updateAccountSetting,
      uploadFile,
      changePassword,
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
