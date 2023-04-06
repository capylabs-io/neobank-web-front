<template>
  <v-navigation-drawer
    v-model="inventoryStore.drawer"
    fixed
    right
    hide-overlay
    temporary
    width="480px"
    class="drawer"
  >
    <div
      class="drawer-container white-bg overflow-hidden full-height pa-6 d-flex flex-column"
    >
      <div class="drawer-image d-flex flex-column">
        <div class="full-width">
          <v-img
            class="drawer-image"
            :src="inventoryStore.ivenCardData.campaign.data.attributes.thumbnailUrl"
          ></v-img>
        </div>
      </div>
      <div class="mt-6 font-weight-bold text-center">
        <v-img class="drawer-icon mx-auto" :src="categoryIcon" />
      </div>
      <div class="mt-3 font-weight-bold text-center text-lg">
        <!-- <div>
          <v-img class="drawer-icon" :src="inventoryStore.ivenCardData.campaign.data.attributes.iconUrl" />
        </div> -->
        <span class="mt-3"> {{ inventoryStore.ivenCardData.campaign.data.attributes.title }} </span>
      </div>

      <div class="mt-3 text-left draw-text">
        {{ inventoryStore.ivenCardData.campaign.data.attributes.fullDescription }}
      </div>
      <v-spacer></v-spacer>
      <div class="qr-img mx-auto mt-3 justify-space-between">
        <v-img class="" :src="inventoryStore.ivenVoucherQr" />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { inventoryStore } from "@/stores/inventoryStore";
import { get } from "lodash";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(inventoryStore),
    categoryIcon() {
      return get(
        this.inventoryStore,
        "ivenCardData.campaignCategory.data.attributes.iconUrl",
        require("@/assets/views/category/category-icon-example.png")
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-image {
  position: sticky;
  left: 0;
  top: 0;
  border-radius: 8px;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px var(--v-neutral30-base) solid;
}
.drawer-icon {
  border-radius: 100px;
  width: 40px;
  height: 40px;
}

.draw-text {
  height: max-content;
  overflow-y: auto;
}
.col-gap-10 {
  column-gap: 10px;
}
.btn-arrow {
  position: absolute;
  background-color: white;
  z-index: 99;
}
.number {
  background: #d0dbf4;
  width: 50px;
  height: 30px;
}
.drawer {
  z-index: 99;
}

.qr-img {
  position: sticky;
  bottom: -10;
  right: 0;
  width: 200px;
  height: 200px;
}

.drawer-container {
  padding-top: 80px !important;
}
.unpurchased {
  background: #5752e3;
  padding: 4px, 16px, 4px, 16px;
}
.disable {
}
</style>
