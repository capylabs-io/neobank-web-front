<template>
  <div class="left d-flex flex-column row-gap-3">
    <div class="d-flex flex-column align-center justify-center left-first pa-8">
      <div>
        <v-img
          :style="{ 'border-radius': '10px' }"
          class
          :src="require(`@/assets/redeem/user-profile.webp`)"
        >
        </v-img>
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
          ></v-img>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column justify-center left-second pa-8 row-gap-6">
      <div class="pa-2 content" @click="storeClick">
        <div class="d-flex column-gap-10">
          <div>
            <v-icon>mdi-store </v-icon>
          </div>
          <span>Redeem store</span>
        </div>
      </div>
      <div class="pa-2 content" @click="inventoryClick">
        <div class="d-flex column-gap-10">
          <div>
            <v-icon> mdi-treasure-chest</v-icon>
          </div>
          <span>Inventory</span>
        </div>
      </div>
      <div class="pa-2 content" @click="accountClick()">
        <div class="d-flex column-gap-10">
          <div>
            <v-icon> mdi-account-box</v-icon>
          </div>
          <span>Account setting</span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column align-left justify-end left-third pa-8">
      <div class="d-flex column-gap-10">
        <div>
          <v-icon color="red"> mdi-cog</v-icon>
        </div>
        <span :style="{ color: 'red' }">Log-out</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
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
  height: 26%;
  background: white;
  row-gap: 10px;
}
.left-second {
  height: 13%;
  background: white;
}
.left-third {
  height: 61%;
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
.row-gap-6 {
  row-gap: 6px;
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
.card-icon {
  border-radius: 100px;
}
</style>
