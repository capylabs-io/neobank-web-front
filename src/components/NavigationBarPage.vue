<template>
  <v-app-bar class="nav-bar" app flat>
    <div
      class="d-flex gap-24 DMSans black--text nav-bar align-center pa-7"
      v-if="isMobile"
    >
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
    <div class="d-flex align-center justify-space-between" v-else>
      <div>
        <v-img
          class="nav-logo align-self-center"
          :src="require(`@/assets/home/web-logo.webp`)"
        ></v-img>
      </div>
      <div>
        <v-menu offset-y class="">
          <template v-slot:activator="{ on, attrs }">
            <v-app-bar-nav-icon
              v-bind="attrs"
              v-on="on"
              @click.stop="expansion = !expansion"
            ></v-app-bar-nav-icon>
          </template>
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
        </v-menu>
      </div>
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
  methods: {
    isMobile() {
      if (window.innerWidth <= 599) {
        return true;
      } else {
        return false;
      }
    },
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
