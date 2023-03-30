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
  resetPassword: (resetPasswordData) =>
    axios.post("auth/reset-password", resetPasswordData),
};

export const User = {
  ...APIHelper(USER_API),
  changePassword: (currentPassword, newPassword, confirmNewPassword) =>
    axios.post("users/change-password", {
      currentPassword,
      newPassword,
      confirmNewPassword,
    }),
  updateUserInfo: (model) => axios.put("users/edit/", model),
  updateUserEmail: (email, password) =>
    axios.post("users/edit-email", {
      newEmail: email,
      password,
    }),
};
export const Voucher = {
  fetchVouchers: (token) =>
    axios.get("campaigns?populate=campaignCategory", {
      headers: {
        Authorization: "Bearer " + token,
      },
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
  fetchUserVouchers: (token) =>
    axios.get("user-vouchers", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
};

export default {
  Auth,
};
