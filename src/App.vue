<template>
  <v-app>
    <app-navbar v-if="userStore.pageIndex == 1" />
    <page-navbar v-else-if="userStore.pageIndex == 2" />
    <div v-else />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <app-footer v-if="userStore.pageIndex == 1" />
  </v-app>
</template>
<script>
import FooterVue from "./components/Footer.vue";
import HomeNavigationBar from "./components/NavigationBar.vue";
import PageNavigationBar from "./components/NavigationBarPage.vue";
import { mapStores } from "pinia";
import { userStore } from "../src/stores/userStore";

export default {
  components: {
    "app-navbar": HomeNavigationBar,
    "page-navbar": PageNavigationBar,
    "app-footer": FooterVue,
  },
  computed: {
    ...mapStores(userStore),
  },
  created() {},
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

.full-width{
  width: 100% !important;
}
.full-height{
  height: 100% !important;
}
.cursor-pointer{
  cursor: pointer !important;;
}
</style>
