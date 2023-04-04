<template>
  <v-app>
    <!-- <app-navbar v-if="voucherStore.pageIndex == 1" /> -->
    <NavBarLanding v-if="voucherStore.pageIndex == 1" />
    <page-navbar v-else-if="voucherStore.pageIndex == 2" />
    <div v-else />
    <v-main>
      <SnackBar />
      <router-view :key="$route.fullPath" />
    </v-main>
    <!-- <app-footer v-if="voucherStore.pageIndex == 1" /> -->
  </v-app>
</template>
<script>
import FooterVue from "./components/Footer.vue";
import NavBarLanding from "@/views/home/components/landing/landing-nav-bar.vue";
import HomeNavigationBar from "./components/NavigationBar.vue";
import PageNavigationBar from "./components/NavigationBarPage.vue";
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
import { inventoryStore } from "@/stores/inventoryStore";
import SnackBar from "@/components/snack-bar/snack-bar.vue";
export default {
  components: {
    // "app-navbar": HomeNavigationBar,
    "page-navbar": PageNavigationBar,
    // "app-footer": FooterVue,
    NavBarLanding: NavBarLanding,
    SnackBar,
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
    ...mapStores(inventoryStore),
  },
  async created() {
    if (this.userStore.jwt) {
      await this.inventoryStore.fetchUserVoucher();
    }
  },
  data() {
    return {
      index: 2,
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=DM+Sans&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.DMSans {
  font-family: "DM Sans", sans-serif;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.full-width {
  width: 100% !important;
}
.full-height {
  height: 100% !important;
}
.cursor-pointer {
  cursor: pointer !important;
}
.neutral30-border {
  border: 1px solid var(--v-neutral30-base) !important;
}
.border-radius-24 {
  border-radius: 24px !important;
}
.border-radius-16 {
  border-radius: 16px !important;
}
.border-radius-12 {
  border-radius: 12px !important;
}
.border-radius-8 {
  border-radius: 8px !important;
}
.border-radius-6 {
  border-radius: 6px !important;
}
.border-radius-4 {
  border-radius: 4px !important;
}
.gap-4 {
  gap: 4px;
}
.gap-8 {
  gap: 8px;
}
.gap-16 {
  gap: 16px;
}
.full-width {
  width: 100% !important;
}
.full-height {
  height: 100% !important;
}
.cursor-pointer {
  cursor: pointer !important;
}
.overflow-hidden {
  overflow: hidden;
}
.text-btn {
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px;
  line-height: 20px;
}
.text-overline-1 {
  font-size: 10px !important;
  line-height: 12px !important;
}
.text-caption {
  font-size: 12px !important;
  line-height: 14px !important;
}
.text-xs {
  font-size: 12px !important;
  line-height: 18px !important;
}
.text-sm {
  font-size: 14px !important;
  line-height: 20px !important;
}
.text-md {
  font-size: 16px !important;
  line-height: 24px !important;
}
.text-lg {
  font-size: 18px !important;
  line-height: 28px !important;
}
.text-xl {
  font-size: 20px !important;
  line-height: 32px !important;
}
.text-dp-xs {
  font-size: 24px !important;
  line-height: 36px !important;
}
.text-dp-sm {
  font-size: 30px !important;
  line-height: 38px !important;
}
.text-dp-md {
  font-size: 36px !important;
  line-height: 44px !important;
  letter-spacing: -2% !important;
}
.text-dp-lg {
  font-size: 48px !important;
  line-height: 60px !important;
  letter-spacing: -2% !important;
}
.text-dp-xl {
  font-size: 60px !important;
  line-height: 72px !important;
  letter-spacing: -2% !important;
}
.text-dp-xxl {
  font-size: 72px !important;
  line-height: 90px !important;
  letter-spacing: -2% !important;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 8px var(--v-gray13-base);
  background-color: transparent !important;
}
::-webkit-scrollbar {
  width: 6px;
  background-color: transparent !important;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: 0 0 8px var(--v-gray13-base);
  background-color: var(--v-primary-base);
}

.font-weight-400 {
  font-weight: 400 !important;
}
.font-weight-500 {
  font-weight: 500 !important;
}
.font-weight-700 {
  font-weight: 700 !important;
}
</style>
