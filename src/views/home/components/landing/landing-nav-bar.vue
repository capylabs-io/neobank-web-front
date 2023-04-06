<template>
  <div class="d-flex nav-bar">
    <div
      v-if="homeStore.scrollY > 100"
      class="d-flex gap-24 DMSans nav-container justify-center align-center mx-auto pa-7"
    >
      <div class="d-flex">
        <v-img
          class="nav-logo align-self-center"
          :src="require(`@/assets/landing-logo.webp`)"
        />
        <span class="ml-2 text-md font-weight-700">VParadise</span>
      </div>
      <router-link
        to="/home"
        class="text-decoration-none align-self-center"
        active-class="active"
      >
        <div class="text-none text-uppercase nav-link">Home</div>
      </router-link>
      <router-link
        to="/world"
        class="text-decoration-none align-self-center"
        active-class="active"
      >
        <div class="text-none text-uppercase nav-link">World</div>
      </router-link>
      <router-link
        to="/inventory"
        class="text-decoration-none align-self-center"
        active-class="active"
      >
        <div class="text-none text-uppercase nav-link">Redeem</div>
      </router-link>
      <router-link
        v-if="!userStore.jwt"
        to="/login"
        class="text-decoration-none align-self-center"
        active-class="active"
      >
        <div class="text-none text-uppercase nav-link">Login</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { homeStore } from "@/views/home/store/homeStore";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(homeStore),
  },
};
</script>

<style lang="scss" scoped>
a {
  color: white !important;
}
.active {
  color: var(--v-primary-base) !important;
}
.nav-bar {
  width: 100%;
  position: fixed;
  z-index: 99;
  margin-top: 40px;
}
.nav-container {
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);

  border-radius: 40px;
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
  height: 24px;
  width: 24px;
}
.gap-24 {
  gap: 24px;
}
.active:hover {
  color: #2970ff;
}
</style>
