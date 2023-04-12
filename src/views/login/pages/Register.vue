<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="DMSans d-flex flex-column justify-center align-center login">
    <div class="sign-in-content ma-auto d-flex flex-column">
      <!-- <div class="sign-in-form ma-auto pa-12"> -->
      <div class="btn-back pa-0 cursor-pointer mr-auto mb-3">
        <router-link to="/login" class="white--text text-decoration-none">
          <v-icon small color="white"> mdi-arrow-left </v-icon>
          <span class="ml-2 text-capitalize">Go Back</span>
        </router-link>
      </div>
      <v-form ref="form" lazy-validation class="sign-in-form pa-4 pa-sm-8">
        <div class="text-center font-weight-bold">
          <span :style="{ 'font-size': '30px' }"> Sign Up</span>
        </div>
        <div class="text-xl mt-sm-4 mt-2 text-left">Email</div>
        <v-text-field
          v-model="userStore.email"
          :rules="rules.email"
          type="text"
          background-color="cream"
          class="mt-2"
          solo
          dense
        />
        <div class="text-xl mt-sm-4 mt-2 text-left">Username</div>
        <v-text-field
          v-model="userStore.username"
          :rules="rules.required"
          type="text"
          background-color="cream"
          class="mt-2"
          solo
          dense
        />
        <div class="text-xl text-left mt-sm-4">Password</div>
        <v-text-field
          v-model="userStore.password"
          :append-icon="userStore.isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="userStore.isShowPass ? 'text' : 'password'"
          :rules="rules.password"
          @click:append="userStore.isShowPass = !userStore.isShowPass"
          solo
          dense
          background-color="cream"
          class="mt-2"
        />
        <div class="text-xl text-left mt-sm-4">Re-enter password</div>
        <v-text-field
          v-model="userStore.cfpassword"
          :append-icon="userStore.isShowcPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="userStore.isShowcPass ? 'text' : 'password'"
          :rules="[passwordConfirmationRule]"
          @click:append="userStore.isShowcPass = !userStore.isShowcPass"
          solo
          dense
          background-color="cream"
          class="mt-2"
        />
        <div>
          <v-checkbox
            v-model="userStore.acceptTerm"
            class="text-lg"
            hide-details="true"
            label="Accept Terms and Services"
          />
        </div>

        <div class="text-center mt-6">
          <v-btn
            color="#5E6BE9"
            class="py-5 px-10 btn-submit white--text font-weight-bold"
            @click="submitForm"
            :disabled="
              !userStore.password ||
              !userStore.email ||
              !userStore.username ||
              !userStore.cfpassword
            "
          >
            Create account
          </v-btn>
        </div>
      </v-form>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import FacebookIcon from "@/components/svg/facebook.vue";
import GoogleIcon from "@/components/svg/google.vue";
import AppleIcon from "@/components/svg/apple.vue";
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { campaignStore } from "@/views/redeem/components/campaign/stores/campaignStore";
import { rules } from "@/plugins/rules";
export default {
  components: {},
  created() {
    this.change();
    this.userStore.email = "";
    this.userStore.password = "";
    this.userStore.username = "";
    this.userStore.cfpassword = "";
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(campaignStore),
    passwordConfirmationRule() {
      return () =>
        this.userStore.password === this.userStore.cfpassword ||
        "Password must match";
    },
  },
  data() {
    return {
      rules: rules,
      isShow: true,
    };
  },
  methods: {
    gotoRouter(url) {
      this.$router.push({
        params: "vn",
        name: url,
      });
    },
    change() {
      this.campaignStore.pageIndex = 3;
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        this.userStore.register();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  &::before {
    content: "";
    background: url("@/assets/home/intro-background.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(4px);
    height: 100%;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }
  z-index: 101;
}
.btn-back {
  z-index: 101;
}
.sign-in-content {
  width: max-content;
  height: max-content;
  z-index: 101;
  .sign-in-form {
    width: 465px;
    height: fit-content;
    font-family: Kanit, Helvetica, Arial;
    background: #ffffff;
    border-radius: 24px;
    z-index: 101;
  }
}
</style>
