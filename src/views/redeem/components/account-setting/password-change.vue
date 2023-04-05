<template>
  <v-card flat class="form-detail mt-sm-3 full-width pa-5">
    <v-row>
      <v-col cols="5">
        <v-form @submit.prevent="changeYourPassword" id="change-password-form">
          <div class="d-flex mt-sm-3">
            <div
              class="text-left text-md font-weight-700"
              :style="{ width: '185px' }"
            >
              Current Password
            </div>
            <v-text-field
              v-if="!voucherStore.changePassword"
              height="36px"
              type="password"
              class="pa-0 ml-10 btn-customize"
              placeholder=""
              solo
              dense
              readonly
              hide-details
              flat
            />
            <v-text-field
              v-else
              v-model="userStore.currentPassword"
              height="36px"
              :append-icon="userStore.isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="userStore.isShowPass ? 'text' : 'password'"
              :rules="rules.password"
              @click:append="userStore.isShowPass = !userStore.isShowPass"
              class="pa-0 ml-10"
              placeholder=""
              outlined
              dense
              flat
            />
          </div>

          <div class="d-flex mt-sm-3">
            <div
              class="text-left text-md font-weight-700"
              :style="{ width: '185px' }"
            >
              New password
            </div>
            <v-text-field
              v-if="!voucherStore.changePassword"
              height="36px"
              type="password"
              class="pa-0 ml-10 btn-customize"
              placeholder=""
              solo
              dense
              hide-details
              flat
            />
            <v-text-field
              v-else
              height="36px"
              v-model="userStore.newPassword"
              class="pa-0 ml-10"
              placeholder=""
              outlined
              :append-icon="userStore.isShowpPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="userStore.isShowpPass ? 'text' : 'password'"
              :rules="rules.password"
              @click:append="userStore.isShowpPass = !userStore.isShowpPass"
              dense
              flat
            />
          </div>

          <div class="d-flex mt-sm-3">
            <div
              class="text-left text-md font-weight-700"
              :style="{ width: '185px' }"
            >
              Re-enter new password
            </div>
            <v-text-field
              v-if="!voucherStore.changePassword"
              height="36px"
              type="password"
              class="pa-0 ml-10 btn-customize"
              placeholder=""
              solo
              dense
              hide-details
              flat
            />
            <v-text-field
              v-else
              height="36px"
              class="pa-0 ml-10"
              v-model="userStore.confirmNewPassword"
              placeholder=""
              outlined
              :rules="[passwordConfirmationRule]"
              :append-icon="userStore.isShowcPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="userStore.isShowcPass ? 'text' : 'password'"
              @click:append="userStore.isShowcPass = !userStore.isShowcPass"
              dense
              flat
            />
          </div>
        </v-form>
      </v-col>
    </v-row>
    <v-divider class="mt-sm-3" />
    <v-row class="mt-sm-1">
      <v-col cols="2" v-if="!voucherStore.changePassword">
        <v-btn
          class="text-capitalize full-width"
          :style="{ border: '1px solid #E3E8EF' }"
          color="black"
          variant="text"
          @click="voucherStore.changePassword = true"
          text
        >
          Change password
        </v-btn>
      </v-col>
      <v-col cols="5" v-else class="d-flex">
        <v-btn
          class="text-capitalize"
          :style="{ border: '1px solid #E3E8EF' }"
          color="black"
          variant="text"
          @click="voucherStore.changePassword = false"
          text
        >
          Cancel
        </v-btn>

        <v-btn
          class="ml-4 text-capitalize"
          :style="{ backgroundColor: 'var(--v-blue-base)' }"
          color="white"
          variant="text"
          type="submit"
          form="change-password-form"
          text
          :disabled="
            !userStore.currentPassword ||
            !userStore.confirmNewPassword ||
            !userStore.newPassword
          "
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { rules } from "@/plugins/rules";
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
    passwordConfirmationRule() {
      return () =>
        this.userStore.newPassword === this.userStore.confirmNewPassword ||
        "Password must match";
    },
  },
  data() {
    return {
      rules: rules,
    };
  },
  methods: {
    changeYourPassword() {
      this.userStore.changePassword();
      this.voucherStore.changePassword = false;
      this.userStore.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes fadeleft {
  0% {
    opacity: 0;
    transform: translatex(-100px);
  }
  100% {
    opacity: 1;
  }
}
.form-detail {
  background-color: white;
  height: max-content !important;
  border: 1px solid #e3e8ef;
}

.v-card {
  border-radius: 12px !important;
}
.user-logo {
  height: 39px;
  width: 100px;
}
.user-image {
  height: 79px;
  width: 64px;
}
.btn-customize {
  width: 300px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e3e8ef;
}
</style>
