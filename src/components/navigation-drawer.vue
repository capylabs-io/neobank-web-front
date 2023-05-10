<template>
  <v-navigation-drawer
    class="pa-0"
    width="300"
    app
    permanent
    clipped
    clipped-left
  >
    <div class="d-flex flex-column full-height overflow-hidden">
      <div class="d-flex flex-column justify-center px-6 pt-8 pb-6">
        <div class="mx-auto" v-if="userStore.userData.avatarUrl">
          <v-img
            class="border-radius-8 neutral30-border"
            max-width="128"
            max-height="128"
            :src="userStore.userData.avatarUrl"
          />
        </div>
        <div class="mx-auto" v-else>
          <v-img
            class="border-radius-8 neutral30-border"
            max-width="128"
            max-height="128"
            :src="require(`@/assets/redeem/user-profile.webp`)"
          />
        </div>
        <div class="mt-3 text-center">
          <span class="text-lg font-weight-bold"
            >{{ userStore.userData.username }} #{{
              userStore.userData.id
            }}</span
          >
        </div>
        <div class="text-sm neutral70--text text-center">
          <span>{{ userStore.userData.email }}</span>
        </div>
        <div
          class="d-flex left-profile-section align-center font-weight-bold mx-auto mt-2"
        >
          <span class="text-dp-xs">{{ userToken }}</span>
          <div class="ml-2 token-icon">
            P
            <!-- <v-img
              :style="{ 'border-radius': '40px' }"
              :src="require(`@/assets/redeem/coin.webp`)"
            /> -->
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <div class="py-4 px-6">
        <v-list class="py-0">
          <v-list-item
            class="border-radius-8 px-2 text-left"
            to="/store"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-store </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md">Reward Centre</v-list-item-title>
          </v-list-item>
          <v-list-item
            class="border-radius-8 px-2 mt-3 text-left"
            to="/inventory"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-treasure-chest </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md">Inventory</v-list-item-title>
          </v-list-item>
          <v-list-item
            class="border-radius-8 px-2 mt-3 text-left"
            to="/account-setting"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-account-box </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md"
              >Account Setting</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </div>
      <v-divider></v-divider>

      <v-spacer></v-spacer>

      <div class="px-6 pb-4 full-width">
        <v-btn
          class="d-flex red60--text px-0 text-none mb-2 text-btn"
          @click="onLogoutClicked"
          text
        >
          <v-icon class="mr-2" color="red60"> mdi-power </v-icon>
          <div>Log Out</div>
        </v-btn>
        <v-divider></v-divider>
        <div class="text-xs neutral70--text mt-2">
          v{{ version }} - {{ environment }}
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { get } from "lodash";
export default {
  computed: {
    ...mapStores(userStore),
    userToken() {
      return get(this.userStore, "userData.userMetadata.token", 0);
    },
    version() {
      return get(process.env, "VUE_APP_API_VERSION", "1.0.0");
    },
    environment() {
      return get(process.env, "VUE_APP_ENV", "Development");
    },
  },
  methods: {
    onLogoutClicked() {
      this.userStore.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-img {
  width: 36px;
  height: 36px;
}
.logo-img {
  width: 50px;
  height: 50px;
}

.active-item {
  background: var(--v-primary5-base) !important;
  color: var(--v-primary-base) !important;
  .v-icon {
    color: var(--v-primary50-base) !important;
  }
}
</style>
