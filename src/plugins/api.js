import axios from "axios";
import utils from "@/plugins/utils";

// axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
axios.defaults.baseURL = "https://neobank-dev-api.capylabs.io/api/";
const USER_API = "/users/";

const APIHelper = (api) => ({
  search: (params, option) =>
    axios.get(api, { params: utils.filterObject(params) }, option),
  count: (params, option) =>
    axios.get(api + "count", { params: utils.filterObject(params) }, option),
  fetch: (params, option) =>
    axios.get(api, { params: utils.filterObject(params) }, option),
  fetchOne: (id, option) => axios.get(api + id, option),
  create: (params, options) =>
    axios.post(api, utils.filterObject(params), options),
  update: (id, params, option) =>
    axios.put(api + id, utils.filterObject(params), option),
  remove: (id, option) => axios.delete(api + id, option),
});
export const APIRespository = APIHelper;
export const Auth = {
  register: (userData) => axios.post("auth/local/register", userData),
  resendRegisterLink: (email) =>
    axios.post("auth/send-email-confirmation", {
      email,
    }),
  verifyRegister: (confirmCode) =>
    axios.get("auth/email-confirmation", {
      params: {
        confirmation: confirmCode,
      },
    }),
  signIn: (signInData) => axios.post("auth/local", signInData),
  forgetPassword: (email) =>
    axios.post("auth/forgot-password", {
      email,
    }),
  changePassword: (currentPassword, newPassword, confirmNewPassword, token) =>
    axios.post(
      "auth/change-password",
      {
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: confirmNewPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  resetPassword: (resetPasswordData) =>
    axios.post("auth/reset-password", resetPasswordData),
};

export const User = {
  ...APIHelper(USER_API),

  // updateUserInfo: (model) => axios.put("users/edit/", model),
  updateUserInfo: (userToken, avatarUrl, data, token) =>
    axios.put(
      `/users/` + data.id,
      {
        avatarUrl: avatarUrl,
        userMetadata: {
          outfit: {},
          bankAccount: data.userMetadata.bankAccount,
          token: userToken,
          firstName: data.userMetadata.firstName,
          lastName: data.userMetadata.lastName,
          phoneNumber: data.userMetadata.phoneNumber,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  updateMetaData: (id, token) =>
    axios.put(
      `/users/` + id,
      {
        avatarUrl: "https://neobank-strapi.s3.amazonaws.com/default-avatar.png",
        userMetadata: {
          outfit: {},
          bankAccount: "",
          token: 0,
          firstName: "",
          lastName: "",
          phoneNumber: "",
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  updateUserEmail: (email, password) =>
    axios.post("users/edit-email", {
      newEmail: email,
      password,
    }),
  getUserMetadata: (token) =>
    axios.get("users/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),

  uploadFile: (file, token) =>
    axios.post("upload", file, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }),
};
export const Voucher = {
  fetchVouchers: () =>
    axios.get("user/campaigns", {
      // headers: {
      //   Authorization: "Bearer " + token,
      // },
    }),
  purchaseVouchers: (id, token) =>
    axios.post(
      `user/vouchers`,
      { campaignId: id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  fetchUserVouchers: (id, token) =>
    axios.get(
      `vouchers?populate[0]=user&populate[1]=campaign&populate[2]=campaignCategory&filters[user][id]=` +
        id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
};

export default {
  Auth,
};
