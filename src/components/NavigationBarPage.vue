<template>
  <div class="nav-bar d-flex justify-space-between">
    <div class="d-flex gap-24 DMSans black--text align-center pa-7">
      <div>
        <v-img
          class="nav-logo align-self-center"
          :src="require(`@/assets/home/web-logo.webp`)"
        />
      </div>
      <router-link
        to="/home"
        class="text-decoration-none align-self-center"
        active-class="active"
      >
        <div class="text-capitalize">HOME</div>
      </router-link>
      <router-link
        to="/world"
        class="text-decoration-none align-self-center"
        active-class="active"
      >
        <div class="text-capitalize">WORLD</div>
      </router-link>
      <router-link
        to="/redeem"
        class="text-decoration-none align-self-center"
        active-class="active"
      >
        <div class="text-capitalize">REDEEM</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
  },
  created() {},
  methods: {
    isMobile() {
      if (window.innerWidth <= 599) {
        return true;
      } else {
        return false;
      }
    },
    signout() {
      this.userStore.logout;
    },
  },
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
  width: 100%;
  background-color: white;
  height: 80px;
  font-size: 16px;
  font-weight: bold;
  z-index: 100;
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
