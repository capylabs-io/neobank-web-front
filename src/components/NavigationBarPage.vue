<template>
  <v-app-bar class="nav-bar" app flat>
    <div class="d-flex gap-24 DMSans black--text nav-bar align-center pa-7">
      <div>
        <v-img
          class="nav-logo align-self-center"
          :src="require(`@/assets/home/web-logo.webp`)"
        ></v-img>
      </div>
      <router-link
        @click="userStore.navChange = false"
        to="/"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-capitalize active">HOME</div>
      </router-link>
      <router-link
        to="/"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-capitalize active">WORLD</div>
      </router-link>
      <router-link
        @click="userStore.navChange = true"
        to="/vn/redeem"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-capitalize active">REDEEM</div>
      </router-link>
      <router-link
        @click="userStore.navChange = false"
        to="/vn/login"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-capitalize active">LOGIN</div>
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
  </v-app-bar>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../views/stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  background: white;
  color: white;
  height: 60px;
  font-size: 16px;
  font-weight: bold;
}
.nav-logo {
  height: 38px;
  width: 158px;
}
.gap-24 {
  gap: 24px;
}
.active:hover {
  color: #2970ff;
}
</style>
