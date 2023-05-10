<template>
  <v-card flat class="form-detail mt-sm-3 full-width pa-5">
    <v-form @submit.prevent="changeYourPassword" id="change-password-form">
      <v-row no-gutters>
        <v-col cols="3"
          ><div class="text-left text-md font-weight-700 mt-2">
            Current Password
          </div>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-if="!changePassword"
            height="36px"
            type="password"
            class="pa-0"
            placeholder="Your Password"
            background-color="neutral10"
            solo
            dense
            readonly
            flat
          />
          <v-text-field
            v-else
            v-model="userStore.currentPassword"
            height="36px"
            :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isShowPass ? 'text' : 'password'"
            :rules="rules.password"
            @click:append="isShowPass = !isShowPass"
            class="pa-0"
            outlined
            dense
            flat
          />
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="3"
          ><div class="text-left text-md font-weight-700 mt-2">
            New Password
          </div>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-if="!changePassword"
            height="36px"
            type="password"
            class="pa-0"
            placeholder="Your Password"
            background-color="neutral10"
            solo
            dense
            readonly
            flat
          />
          <v-text-field
            v-else
            v-model="userStore.newPassword"
            class="pa-0"
            placeholder=""
            outlined
            :append-icon="isShowpPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isShowpPass ? 'text' : 'password'"
            :rules="rules.password"
            @click:append="isShowpPass = !isShowpPass"
            dense
            flat
          />
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="3"
          ><div class="text-left text-md font-weight-700 mt-2">
            Re-enter New Password
          </div>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-if="!changePassword"
            height="36px"
            type="password"
            class="pa-0"
            placeholder="Your Password"
            background-color="neutral10"
            solo
            dense
            readonly
            flat
          />
          <v-text-field
            v-else
            height="36px"
            class="pa-0"
            v-model="userStore.confirmNewPassword"
            placeholder=""
            outlined
            :rules="[passwordConfirmationRule]"
            :append-icon="isShowcPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isShowcPass ? 'text' : 'password'"
            @click:append="isShowcPass = !isShowcPass"
            dense
            flat
          />
        </v-col>
      </v-row>
      <v-divider class="mb-6" />
      <div class="d-flex gap-8">
        <v-btn
          class="text-capitalize text-btn"
          variant="text"
          @click="changePassword = true"
          v-if="!changePassword"
          outlined
          depressed
        >
          Change Password
        </v-btn>
        <div class="d-flex gap-8" v-else>
          <v-btn
            class="text-capitalize"
            variant="text"
            @click="changePassword = false"
            outlined
            depressed
          >
            Cancel
          </v-btn>

          <v-btn
            class="text-capitalize"
            type="submit"
            form="change-password-form"
            color="primary"
            :disabled="
              !userStore.currentPassword ||
              !userStore.confirmNewPassword ||
              !userStore.newPassword
            "
            depressed
          >
            Save
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { rules } from "@/plugins/rules";
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
    passwordConfirmationRule() {
      return () =>
        this.userStore.newPassword === this.userStore.confirmNewPassword ||
        "Password must match";
    },
  },
  data() {
    return {
      rules: rules,
      isShowPass: false,
      isShowcPass: false,
      isShowpPass: false,
      changePassword: false,
    };
  },
  methods: {
    changeYourPassword() {
      this.userStore.changePassword();
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
