<template>
  <div class="wrapper full-height d-flex">
    <NavigationDrawer v-if="userStore.isConnected" />
    <div class="container mx-auto pa-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";

export default {
  computed: {
    ...mapStores(userStore),
  },
  components: {
    NavigationDrawer: () => import("@/components/navigation-drawer.vue"),
  },
  async created() {
    await this.userStore.fetchUserMetadata();
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
