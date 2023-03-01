<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="DMSans d-flex flex-column justify-center align-center login">
    <div class="sign-in-content d-flex">
      <!-- <div class="sign-in-form ma-auto pa-12"> -->
      <v-form
        ref="form"
        lazy-validation
        class="sign-in-form ma-auto pa-4 pa-sm-8"
      >
        <div class="btn-back pa-0 cursor-pointer">
          <router-link
            to="/"
            class="black--text text-decoration-none align-self-center"
          >
            <v-icon small color="black"> mdi-chevron-left </v-icon>
            <span class="text-capitalize">Back</span>
          </router-link>
        </div>
        <div class="text-center font-weight-bold">
          <span :style="{ 'font-size': '30px' }"> Login</span>
        </div>
        <div class="text-xl mt-sm-4 mt-2 text-left">
          Your email or phone number
        </div>
        <v-text-field
          v-model="userStore.username"
          :rules="rules.checkIdentifier"
          type="text"
          background-color="cream"
          class="mt-2"
          solo
          dense
        />
        <div class="text-xl text-left">Password</div>
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
        <v-row class="mt-sm-2">
          <v-col cols="4" class="pa-1">
            <v-btn color="#2B69EA" class="full-width py-0 py-sm-5 px-10">
              <FacebookIcon />
            </v-btn>
          </v-col>
          <v-col cols="4" class="pa-1">
            <v-btn color="white" class="full-width py-0 py-sm-5 px-10">
              <GoogleIcon />
            </v-btn>
          </v-col>
          <v-col cols="4" class="pa-1">
            <v-btn color="black" class="full-width py-0 py-sm-5 px-10">
              <AppleIcon />
            </v-btn>
          </v-col>
        </v-row>
        <v-checkbox
          class="text-lg mt-sm-4"
          hide-details="true"
          label="Remember me"
        />

        <div class="text-center mt-2">
          <v-btn
            color="#5E6BE9"
            class="py-5 px-10 btn-submit white--text font-weight-bold full-width"
            @click="submitForm"
          >
            Sign in
          </v-btn>
        </div>
        <div class="text-center">
          <div x-small class="text-capitalize text-md cursor-pointer mt-2" />
        </div>
        <div class="text-center">
          <div x-small class="text-capitalize text-md cursor-pointer" />
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
import { userStore } from "../../../stores/userStore";
import { rules } from "@/plugins/rules";
export default {
  components: {
    FacebookIcon,
    GoogleIcon,
    AppleIcon,
  },
  mounted() {
    this.change();
  },
  computed: {
    ...mapStores(userStore),
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
      this.userStore.pageIndex = 3;
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        this.userStore.signIn();
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
  position: absolute;
  z-index: 101;
}
.sign-in-content {
  width: 100vw;
  min-height: 100vh;
  height: fit-content;
  position: absolute;
  top: 0;
  left: 0;
  .sign-in-form {
    width: 90%;
    max-width: 464px;
    height: fit-content;
    font-family: Kanit, Helvetica, Arial;
    background: #ffffff;
    box-shadow: inset 0px -8px 0px rgba(0, 0, 0, 0.15);
    border-radius: 24px;
    z-index: 101;
  }
}
</style>
