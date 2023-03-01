<template>
  <div class="left d-flex flex-column row-gap-3">
    <div
      v-if="!userStore.jwt"
      class="d-flex flex-column align-center justify-center left-first pa-8"
    >
      <div>
        <v-img
          :style="{ 'border-radius': '10px' }"
          class
          :src="require(`@/assets/redeem/user-profile.webp`)"
        />
      </div>
      <div>
        <span class="font-weight-bold">Tung69 #291090</span>
      </div>
      <div class="subtitle-2">
        <span>tung.bro.bro69@gmail.com</span>
      </div>
      <div
        class="d-flex left-profile-section align-center font-weight-bold column-gap-10 pa-2"
      >
        <span :style="{ 'font-size': '18px' }">1000</span>
        <div>
          <v-img
            :style="{ 'border-radius': '40px' }"
            :src="require(`@/assets/redeem/coin.webp`)"
          />
        </div>
      </div>
    </div>
    <div
      v-else
      class="d-flex flex-column align-center justify-center left-first pa-8"
    >
      <div>
        <v-img
          :style="{ 'border-radius': '10px' }"
          class
          :src="require(`@/assets/redeem/user-profile.webp`)"
        />
      </div>
      <div>
        <span class="font-weight-bold"
          >{{ userStore.userData.username }} #291090</span
        >
      </div>
      <div class="subtitle-2">
        <span>{{ userStore.userData.email }}</span>
      </div>
      <div
        class="d-flex left-profile-section align-center font-weight-bold column-gap-10 pa-2"
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
    <div class="d-flex flex-column justify-center left-second pa-8 row-gap-1">
      <div class="pa-2 content store" @click="storeClick">
        <div class="d-flex column-gap-10">
          <div>
            <v-icon>mdi-store </v-icon>
          </div>
          <span>Redeem store</span>
        </div>
      </div>
      <div class="pa-2 content inventory" @click="inventoryClick">
        <div class="d-flex column-gap-10">
          <div>
            <v-icon> mdi-treasure-chest</v-icon>
          </div>
          <span>Inventory</span>
        </div>
      </div>
      <div class="pa-2 content setting" @click="accountClick()">
        <div class="d-flex column-gap-10">
          <div>
            <v-icon> mdi-account-box</v-icon>
          </div>
          <span>Account setting</span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column align-left justify-end left-third pa-8">
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
export default {
  computed: {
    ...mapStores(userStore),
  },
  mounted() {
    this.carousel();
  },
  methods: {
    inventoryClick() {
      this.userStore.index = 2;
    },
    storeClick() {
      this.userStore.index = 1;
    },
    accountClick() {
      this.userStore.index = 3;
    },
    signout() {
      this.userStore.logout();
      this.$router.push("/vn/login");
    },
    carousel() {
      const store = document.querySelector(".store");
      const inventory = document.querySelector(".inventory");
      const setting = document.querySelector(".setting");
      if (this.userStore.index == 1) {
        inventory.className += "active";
      } else if (this.userStore.index == 2) {
        store.className += "active";
      } else {
        setting.className += "active";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  width: 15%;
  background: #f5f5f5;
  height: 100vh;
}
.left-first {
  height: 28%;
  background: white;
  row-gap: 10px;
}
.left-second {
  height: 13%;
  background: white;
}
.left-third {
  height: 59%;
  background: white;
}
.right {
  width: 95%;
  background: #f5f5f5;
  padding: 30px 100px;
}
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
  .v-icon {
    color: #2970ff;
  }
}
.active {
  background: #f5f8ff;
  .v-icon {
    color: #2970ff;
  }
}
.card-icon {
  border-radius: 100px;
}
</style>
