<template>
  <v-app>
    <app-navbar v-if="voucherStore.pageIndex == 1" />
    <page-navbar v-else-if="voucherStore.pageIndex == 2" />
    <div v-else />
    <v-main>
      <SnackBar />
      <router-view :key="$route.fullPath" />
    </v-main>
    <app-footer v-if="voucherStore.pageIndex == 1" />
  </v-app>
</template>
<script>
import FooterVue from "./components/Footer.vue";
import HomeNavigationBar from "./components/NavigationBar.vue";
import PageNavigationBar from "./components/NavigationBarPage.vue";
import { mapStores } from "pinia";
import { userStore } from "../src/stores/userStore";
import { voucherStore } from "../src/stores/voucherStore";
import { inventoryStore } from "@/stores/inventoryStore";
import SnackBar from "@/components/snack-bar/snack-bar.vue";
export default {
  components: {
    "app-navbar": HomeNavigationBar,
    "page-navbar": PageNavigationBar,
    "app-footer": FooterVue,
    SnackBar,
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
    ...mapStores(inventoryStore),
  },
  async created() {
    await this.inventoryStore.fetchUserVoucher();
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
.display-xxl {
  font-size: 72px;
  line-height: 90px;
}
.display-xl {
  font-size: 60px;
  line-height: 72px;
}
.display-large {
  font-size: 48px;
  line-height: 60px;
}
.display-medium {
  font-size: 36px;
  line-height: 44px;
}
.display-small {
  font-size: 30px;
  line-height: 38px;
}
.display-xs {
  font-size: 24px;
  line-height: 36px;
}

.text-xl {
  font-size: 20px;
  line-height: 32px;
}
.text-large {
  font-size: 18px;
  line-height: 28px;
}
.text-medium {
  font-size: 16px;
  line-height: 24px;
}
.text-small {
  font-size: 14px;
  line-height: 20px;
}
.text-xs {
  font-size: 12px;
  line-height: 18px;
}
.caption {
  font-size: 12px;
  line-height: 14px;
}
.overline {
  font-size: 10px;
  line-height: 12px;
}
.font-weight-400 {
  font-weight: 400;
}
.font-weight-500 {
  font-weight: 500;
}
.font-weight-700 {
  font-weight: 700;
}
</style>
