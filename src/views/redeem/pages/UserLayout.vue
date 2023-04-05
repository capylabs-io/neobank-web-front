<template>
  <div class="wrapper full-height d-flex">
    <NavigationDrawer />
    <div class="container mx-auto pa-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";

export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
  components: {
    NavigationDrawer: () => import("../components/navigation-drawer.vue"),
  },
  created() {
    this.voucherStore.pageIndex = 2;
  },
};
</script>

<style scoped>
.wrapper {
  background: var(--v-neutral10-base) !important;
}
.container {
  max-width: 1400px;
  animation: fadeleft 1s ease-in-out;
}
</style>