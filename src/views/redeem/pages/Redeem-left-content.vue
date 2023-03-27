<template>
  <div class="d-flex flex-column justify-space-between full-height">
    <div class="d-flex flex-column">
      <div
        class="d-flex flex-column align-center justify-center left-first pa-6"
      >
        <div>
          <v-img
            :style="{ 'border-radius': '10px' }"
            class
            :src="require(`@/assets/redeem/user-profile.webp`)"
          />
        </div>
        <div class="mt-3">
          <span class="font-weight-bold"
            >{{ userStore.userData.username }} #291090</span
          >
        </div>
        <div class="subtitle-2">
          <span>{{ userStore.userData.email }}</span>
        </div>
        <div
          class="d-flex left-profile-section align-center font-weight-bold mt-3 pa-2"
        >
          <span :style="{ 'font-size': '18px' }">{{
            userStore.userData.token
          }}</span>
          <div>
            <v-img
              :style="{ 'border-radius': '40px' }"
              :src="require(`@/assets/redeem/coin.webp`)"
            />
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex flex-column justify-center left-second pa-6">
        <!-- TODO: Change to v-list -->
        <div @click="storeClick()">
          <div class="pa-2 content d-flex store active cursor-pointer">
            <v-icon class="mr-2">mdi-store </v-icon>
            <span>Redeem store</span>
          </div>
        </div>
        <div class="mt-2" @click="inventoryClick()">
          <div class="pa-2 content d-flex inventory cursor-pointer">
            <v-icon class="mr-2"> mdi-treasure-chest</v-icon>
            <span>Inventory</span>
          </div>
        </div>
        <div class="mt-2" @click="accountClick()">
          <div class="pa-2 content d-flex setting cursor-pointer">
            <v-icon class="mr-2"> mdi-account-box</v-icon>
            <span>Account setting</span>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
    </div>
    <div class="d-flex flex-column align-left justify-end left-third pa-6">
      <v-btn class="" @click="signout()" text>
        <div class="mr-2">
          <v-icon color="red"> mdi-logout </v-icon>
        </div>
        <div class="text-capitalize" :style="{ color: 'red' }">Log-out</div>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../../stores/userStore";
import { voucherStore } from "../../../stores/voucherStore";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
  mounted() {
    this.carousel();
  },
  methods: {
    inventoryClick() {
      const store = document.querySelector(".store");
      const inventory = document.querySelector(".inventory");
      const setting = document.querySelector(".setting");
      this.voucherStore.index = 2;
      store.classList.remove("active");
      inventory.classList.add("active");
      setting.classList.remove("active");
    },
    storeClick() {
      const store = document.querySelector(".store");
      const inventory = document.querySelector(".inventory");
      const setting = document.querySelector(".setting");
      this.voucherStore.index = 1;
      store.classList.add("active");
      inventory.classList.remove("active");
      setting.classList.remove("active");
    },
    accountClick() {
      const store = document.querySelector(".store");
      const inventory = document.querySelector(".inventory");
      const setting = document.querySelector(".setting");
      this.voucherStore.index = 3;
      store.classList.remove("active");
      inventory.classList.remove("active");
      setting.classList.add("active");
    },
    signout() {
      this.userStore.logout();
      this.$router.push("/vn/login");
    },
    carousel() {},
  },
};
</script>

<style lang="scss" scoped>
.column-gap-10 {
  column-gap: 10px;
}
.row-gap-3 {
  row-gap: 3px;
}
.row-gap-1 {
  row-gap: 1px;
}

.gap-30 {
  gap: 30px;
}
.left-profile-section {
  background: #f5f8ff;
  border-radius: 8px;
  padding: 8px, 16px, 8px, 16px;
}

.content {
  border-radius: 8px;
}
.content:hover {
  background: #f5f8ff;
  color: #2970ff;
  .v-icon {
    color: #2970ff;
  }
}
.active {
  background: #f5f8ff;
  color: #2970ff;
  .v-icon {
    color: #2970ff;
  }
}
.card-icon {
  border-radius: 100px;
}
</style>
