<template>
  <v-app>
    <NavBarLanding v-if="campaignStore.pageIndex == 1" />
    <page-navbar v-else-if="campaignStore.pageIndex == 2" />
    <div v-else />
    <v-main>
      <PluginLoading />
      <PluginSnackbar />
      <PluginConfirmDialog />
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>
<script>
import NavBarLanding from "@/views/home/components/landing/landing-nav-bar.vue";
import PageNavigationBar from "./components/NavigationBarPage.vue";
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { campaignStore } from "@/views/redeem/components/campaign/stores/campaignStore";
import { inventoryStore } from "@/views/redeem/components/inventory/stores/inventoryStore";
export default {
  components: {
    "page-navbar": PageNavigationBar,
    NavBarLanding: NavBarLanding,
    PluginLoading: () => import("@/components/plugin/PluginLoading.vue"),
    PluginSnackbar: () => import("@/components/plugin/PluginAlert.vue"),
    PluginConfirmDialog: () =>
      import("@/components/plugin/PluginConfirmDialog.vue"),
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(campaignStore),
    ...mapStores(inventoryStore),
  },
  async created() {
    // if (this.userStore.jwt) {
    //   await this.inventoryStore.fetchUserVoucher();
    // }
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

.v-application,
body {
  font-family: "DM Sans", sans-serif !important;
  font-weight: 400;
  color: var(--v-neutral100-base) !important;
}

.theme--light.v-list-item--active::before {
  opacity: 0 !important;
}

.DMSans {
  font-family: "DM Sans", sans-serif;
}
.primary-bg {
  background: var(--v-primary-base) !important;
}
.neutral10-bg {
  background: var(--v-neutral10-base) !important;
}
.white-bg {
  background: white !important;
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
  overflow: hidden !important;
}
.text-btn {
  font-style: normal;
  font-weight: 700 !important;
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

//Other
.token-icon {
  border: 1px solid black;
  border-radius: 40px;
}
</style>
