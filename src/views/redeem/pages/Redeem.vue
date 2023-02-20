<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="redeem d-flex DMSans">
    <!-- <v-navigation-drawer
      absolute
      temporary
      v-model="userStore.drawer"
      right
      hide-overlay
      width="480px"
      color="white"
      class="pa-5 drawer d-flex flex-column"
    >
      <v-card class="drawer-card" flat>
        <div
          class="drawer-image d-flex flex-column"
          :style="{
            backgroundImage: 'url(' + userStore.cardData.image + ')',
          }"
        >
          <div
            class="mt-3 pa-1"
            :style="{
              background: '#FDDF59',
              width: 'max-content',
              height: 'max-content',
              position: 'absolute',
              'border-bottom-right-radius': '8px',
              'border-top-right-radius': '8px',
            }"
          >
            {{ userStore.cardData.price }}.000₫
          </div>
        </div>
        <div
          class="d-flex flex-column mt-3 font-weight-bold align-center justify-center"
        >
          <div>
            <v-img class="drawer-icon" :src="userStore.cardData.icon"></v-img>
          </div>
          <span class="mt-3"> {{ userStore.cardData.detailheader }} </span>
        </div>
        <div class="mt-3 text-left">{{ userStore.cardData.firstDetail }}</div>
        <div class="mt-3 text-left">{{ userStore.cardData.secondDetail }}</div>
      </v-card>
      <v-btn
        class="d-flex column-gap-10 mx-auto unpurchased drawer-btn"
        elevation="2"
        rounded
        text
      >
        <div>
          <span class="white--text font-weight-bold pr-2 text-capitalize"
            >Redeem Now</span
          >
        </div>
      </v-btn>
    </v-navigation-drawer> -->
    <inventoryDrawer></inventoryDrawer>
    <detail></detail>
    <left-content></left-content>
    <right-content v-if="!userStore.isInventory"></right-content>
    <inventory-content v-else></inventory-content>
  </div>
</template>

<script>
import leftContent from "@/views/redeem/pages/Redeem-left-content.vue";
import rightContent from "@/views/redeem/pages/Redeem-right-content.vue";
import inventoryContent from "@/views/redeem/pages/Redeem-inventory.vue";
import detailDrawer from "@/views/redeem/components/card-detail-drawer.vue";
import inventoryDrawer from "@/views/redeem/components/inventory-card-drawer.vue";

import { mapStores } from "pinia";
import { userStore } from "../../stores/userStore";

export default {
  components: {
    rightContent: rightContent,
    leftContent: leftContent,
    inventoryContent: inventoryContent,
    detail: detailDrawer,
    inventoryDrawer: inventoryDrawer,
  },
  mounted: {},
  computed: {
    ...mapStores(userStore),
  },
  created() {
    this.change();
  },
  data() {
    return {
      inventory: true,
    };
  },
  methods: {
    change() {
      this.userStore.navChange = false;
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
}
.left-second {
  height: 9%;
  background: white;
}
.left-third {
  height: 65%;
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
.drawer-image {
  border-radius: 8px;
  height: 240px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.drawer-icon {
  border-radius: 100px;
  width: 40px;
  height: 40px;
}
.btn-arrow {
  position: absolute;
  background-color: white;
  z-index: 99;
}
.drawer {
  background: white !important;
  height: 100vh;
}
.drawer-btn {
  width: 100%;
  margin-top: 50%;
}
.unpurchased {
  background: #5752e3;
  padding: 4px, 16px, 4px, 16px;
}
</style>
