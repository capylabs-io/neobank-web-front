<template>
  <v-app-bar class="white-bg nav-bar" elevation="1" app clipped-left>
    <div class="full-width d-flex justify-space-between">
      <div class="d-flex gap-24 DMSans black--text align-center pa-7">
        <div>
          <v-img
            class="nav-logo align-self-center"
            :src="require(`@/assets/project-logo.webp`)"
          />
        </div>
        <router-link
          to="/home"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-capitalize">HOME</div>
        </router-link>
        <!-- <router-link
          to="/world"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-capitalize">WORLD</div>
        </router-link> -->
        <router-link
          to="/store"
          class="text-decoration-none align-self-center"
          active-class="active"
        >
          <div class="text-capitalize">REDEEM</div>
        </router-link>
      </div>
      <div class="d-flex gap-8 align-center" v-if="!userStore.jwt">
        <v-btn
          class="text-capitalize"
          variant="text"
          outlined
          depressed
          to="/register"
        >
          Sign Up
        </v-btn>

        <v-btn
          class="text-capitalize white--text"
          type="submit"
          form="check-edit-bank-account"
          color="primary"
          depressed
          to="/login"
        >
          Login
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";

export default {
  computed: {
    ...mapStores(userStore),
  },
  created() {},
};
</script>

<style lang="scss" scoped>
a {
  color: black !important;
}
.active {
  color: var(--v-primary-base) !important;
}
.nav-bar {
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
  height: 80px;
  font-size: 16px;
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0px 1px 3px 0px #1219261a;
}
.nav-logo {
  height: 38px;
  width: 158px;
}
.gap-24 {
  gap: 24px;
}
.gap-15 {
  gap: 15px;
}
.active:hover {
  color: #2970ff;
}
</style>
