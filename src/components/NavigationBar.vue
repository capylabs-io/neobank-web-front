<template>
  <div class="d-flex nav-bar">
    <div
      v-if="userStore.scrollY < 2350"
      class="d-flex gap-24 DMSans black--text nav-container justify-center align-center mx-auto pa-7"
    >
      <v-img
        class="nav-logo align-self-center"
        :src="require(`@/assets/home/web-logo.webp`)"
      />
      <router-link
        to="/"
        class="white--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase nav-link">HOME</div>
      </router-link>
      <router-link
        to="/"
        class="white--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase nav-link">WORLD</div>
      </router-link>
      <router-link
        to="/vn/redeem"
        class="white--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase nav-link">REDEEM</div>
      </router-link>
      <router-link
        v-if="!userStore.jwt"
        to="/vn/login"
        class="white--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase nav-link">LOGIN</div>
      </router-link>
    </div>

    <div
      v-else
      class="d-flex gap-24 DMSans black--text nav-container-white justify-center align-center mx-auto pa-7"
    >
      <v-img
        class="nav-logo align-self-center"
        :src="require(`@/assets/home/web-logo.webp`)"
      />
      <router-link
        to="/"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase nav-link">HOME</div>
      </router-link>
      <router-link
        to="/"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase nav-link">WORLD</div>
      </router-link>
      <router-link
        to="/vn/redeem"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase nav-link">REDEEM</div>
      </router-link>
      <router-link
        v-if="!userStore.jwt"
        to="/vn/login"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase nav-link">LOGIN</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../stores/userStore";
export default {
  data() {
    return {};
  },
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
  margin-top: 80px;
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

.nav-container-white {
  border: 5px black solid;
  border-radius: 40px;
  background: white;
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
.nav-link:hover {
  color: lightskyblue;
}
</style>
