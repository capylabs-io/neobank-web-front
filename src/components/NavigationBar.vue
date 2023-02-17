<template>
  <div class="d-flex nav-bar mt-5">
    <div
      class="d-flex gap-24 DMSans black--text nav-container justify-center align-center mx-auto pa-7"
    >
      <v-img
        class="nav-logo align-self-center"
        :src="require(`@/assets/home/web-logo.webp`)"
      ></v-img>
      <router-link
        @click="userStore.navChange = false"
        to="/"
        class="white--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase">HOME</div>
      </router-link>
      <router-link
        to="/"
        class="white--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase">WORLD</div>
      </router-link>
      <router-link
        @click="userStore.navChange = true"
        to="/vn/redeem"
        class="white--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase">REDEEM</div>
      </router-link>
      <router-link
        @click="userStore.navChange = false"
        to="/vn/login"
        class="white--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase">LOGIN</div>
      </router-link>
      <!-- <router-link
        to="/"
        class="white--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase">SME</div>
      </router-link> -->
      <!-- <v-btn text icon>
        <v-icon color="green">mdi-magnify</v-icon>
      </v-btn> -->
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../views/stores/userStore";
export default {
  data() {},
  computed: {
    ...mapStores(userStore),
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  position: fixed;
  z-index: 99;
}
.nav-container {
  border-radius: 40px;
  background: rgba(255, 249, 247, 0.2);
  color: white;
  height: 60px;
  font-size: 16px;
  font-weight: bold;
  width: max-content;
}
.nav-logo {
  height: 38px;
  width: 158px;
}
.gap-24 {
  gap: 24px;
}
</style>
