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
    const rememberMe = ref(false);
    const isShowPass = ref(false);
    const isShowcPass = ref(false);
    const isShowpPass = ref(false);

    const jwt = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const cfpassword = ref("");
    const avatar = ref("");
    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmNewPassword = ref("");

    const avatarUrl = ref([]);
    const userData = ref({});

    const file = ref(null);

    async function signIn() {
      try {
        loading.increaseRequest();
        const res = await Auth.signIn({
          identifier: this.email,
          password: this.password,
        });
        if (!res) {
          snackbar.error(`Error occurred! Login Failed`);
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

    async function register() {
      try {
        if (this.rememberMe) {
          loading.increaseRequest();
          const res = await Auth.register({
            email: this.email,
            username: this.username,
            password: this.password,
          });
          if (!res) {
            snackbar.error(`Error occurred! Login Failed`);
            return;
          }
          snackbar.success("Register successfully!");
          this.jwt = res.data.jwt;
          this.userData = res.data.user;
          this.updateMetaData(res.data.user.id);
          this.router.push({
            name: "Login",
          });
        } else {
          snackbar.error(`Would you follow our Terms and Services `);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }
    // async function uploadFile() {
    //   if (this.file) {
    //     const formData = new FormData();
    //     formData.append("files", this.file);
    //     console.log("callapi", formData);
    //     try {
    //       loading.increaseRequest();
    //       const res = await User.uploadFile(formData, this.jwt);
    //       if (!res) {
    //         snackbar.error(
    //           `Error occurred when upload file! Please try again later!`
    //         );
    //         return;
    //       }
    //       this.avatarUrl = res.data.map((index) => index.url);
    //       snackbar.success("Upload Image successfully!");
    //     } catch (error) {
    //       console.error(`Error: ${error}`);
    //       snackbar.commonError(error);
    //     }
    //   }
    // }
    async function updateAccountSetting() {
      if (this.file) {
        try {
          loading.increaseRequest();
          const formData = new FormData();
          formData.append("files", this.file);
          console.log("callapi", formData);
          const filedata = await User.uploadFile(formData, this.jwt);
          this.avatarUrl = filedata.data.map((index) => index.url);
          if (!this.avatarUrl) {
            snackbar.error(`Error occurred Upload File! Please try again later!`);
          } else {
            const res = await User.updateUserInfo(
              this.userData.userMetadata.token,
              this.avatarUrl[0],
              this.userData,
              this.jwt
            );
            if (!res) {
              snackbar.error(`Error occurred Update! Please try again later!`);
              return;
            }
            this.userData = res.data;
            this.avatar = res.data.avatarUrl;
            snackbar.success("Update successfully!");
          }
        } catch (error) {
          console.error(`Error: ${error}`);
          snackbar.commonError(error);
        }
      }
    }

    async function fetchUserMetadata() {
      try {
        loading.increaseRequest();
        const res = await User.getUserMetadata(this.jwt);
        if (!res) {
          snackbar.error(`Error occurred! Please try again later!`);
          return;
        }
        this.userData = res.data;
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }

    async function updateMetaData(id) {
      try {
        loading.increaseRequest();
        const res = await User.updateMetaData(id, this.jwt);
        if (!res) {
          snackbar.commonError(`Error occurred! Please try again later!`);
          return;
        }
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
          snackbar.error(`Error occurred! Please try again later!`);
          return;
        }
        snackbar.success("Password has been Changed!");
      } catch (error) {
        console.error(`Error: ${error}`);
        snackbar.commonError(error);
      }
    }
    function logout() {
      jwt.value = "";
      userData.value = "";
    }
    function isEditEnable() {
      if (this.username && this.password) return false;
      return true;
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
      email,
      cfpassword,
      //action
      register,
      signIn,
      logout,
      updateAccountSetting,
      updateMetaData,
      changePassword,
      isEditEnable,
      fetchUserMetadata,
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
