<template>
  <v-navigation-drawer
    v-model="campaignStore.drawerDetail"
    fixed
    right
    hide-overlay
    temporary
    width="480px"
    class="drawer pb-6"
    app
  >
    <div
      class="pa-6 drawer-container white-bg full-height d-flex flex-column justify-space-between"
    >
      <div>
        <div class="d-flex flex-column">
          <div class="neutral30-border border-radius-16 overflow-hidden">
            <v-img
              class="drawer-image"
              :src="campaignStore.detailCard.thumbnailUrl"
            >
              <div
                v-if="campaignStore.detailCard.status == 'newDeal'"
                class="mt-3 pa-1 px-3 white--text status"
                :style="{
                  background: '#1890FF',
                  width: 'max-content',
                  height: 'max-content',
                  position: 'absolute',
                  'border-bottom-right-radius': '8px',
                  'border-top-right-radius': '8px',
                  'box-shadow': '0px 1px 2px rgba(0, 0, 0, 0.4)',
                }"
              >
                New Deal
              </div>
              <div
                v-else-if="campaignStore.detailCard.status == 'hot'"
                class="mt-3 pa-1 px-3 white--text status"
                :style="{
                  background: '#EC1D1D',
                  width: 'max-content',
                  height: 'max-content',
                  position: 'absolute',
                  'border-bottom-right-radius': '8px',
                  'border-top-right-radius': '8px',
                  'box-shadow': '0px 1px 2px rgba(0, 0, 0, 0.4)',
                }"
              >
                Hot
              </div>
              <div
                v-else-if="
                  campaignStore.detailCard.purchasedQuantity ==
                  campaignStore.detailCard.totalQuantity
                "
                class="mt-3 pa-1 px-3 white--text status"
                :style="{
                  background: '#FDDF59',
                  width: 'max-content',
                  height: 'max-content',
                  position: 'absolute',
                  'border-bottom-right-radius': '8px',
                  'border-top-right-radius': '8px',
                  'box-shadow': '0px 1px 2px rgba(0, 0, 0, 0.4)',
                }"
              >
                Out of stock
              </div>
              <div
                v-else-if="campaignStore.detailCard.status == 'active'"
                class="mt-3 pa-1 px-3 white--text status"
                :style="{
                  background: '#53B06C',
                  width: 'max-content',
                  height: 'max-content',
                  position: 'absolute',
                  'border-bottom-right-radius': '8px',
                  'border-top-right-radius': '8px',
                  'box-shadow': '0px 1px 2px rgba(0, 0, 0, 0.4)',
                }"
              >
                Active
              </div>
              <div
                v-else
                class="mt-3 pa-1 px-3 white--text status"
                :style="{
                  background: '#A9A9A9',
                  width: 'max-content',
                  height: 'max-content',
                  position: 'absolute',
                  'border-bottom-right-radius': '8px',
                  'border-top-right-radius': '8px',
                  'box-shadow': '0px 1px 2px rgba(0, 0, 0, 0.4)',
                }"
              >
                Expired
              </div>
            </v-img>
          </div>
        </div>
        <div class="mt-6 font-weight-bold text-center">
          <v-img class="drawer-icon mx-auto" :src="categoryIcon" />
          <div class="text-lg mt-3">{{ campaignStore.detailCard.title }}</div>
        </div>
        <div
          class="mt-3 text-left drawer-content flex-grow-1"
          v-html="campaignStore.detailCard.fullDescription"
        ></div>
      </div>
      <!-- <v-spacer></v-spacer> -->
      <!-- <div class="text-center">
        <v-btn
          class="text-none text-btn px-12"
          color="primary"
          @click="buy"
          large
          rounded
          depressed
        >
          Buy Now
        </v-btn>
      </div> -->
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { campaignStore } from "@/views/campaign-store/stores/campaignStore";
import { get } from "lodash";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(campaignStore),
    categoryIcon() {
      return get(
        this.campaignStore,
        "detailCard.campaignCategory.iconUrl",
        require("@/assets/views/category/category-icon-example.png")
      );
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    increase() {
      var number = this.campaignStore.detailCard.attributes.quantity;
      number++;
      this.campaignStore.detailCard.attributes.quantity = number + "";
    },
    decrease() {
      var number = this.campaignStore.detailCard.attributes.quantity;
      number--;
      this.campaignStore.detailCard.attributes.quantity = number + "";
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
  height: 240px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  border: 1px var(--v-neutral30-base) solid;
}
.drawer-content {
  overflow-x: hidden;
  overflow-y: auto;
}
.status {
  z-index: 99;
}
.drawer-icon {
  border-radius: 100px;
  width: 40px;
  height: 40px;
}

.draw-text {
  height: 400px;
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
.drawer-container {
  padding-top: 80px !important;
}
.amount-container {
  position: sticky;
  bottom: 0;
  right: 0;
}
.drawer-btn {
  position: sticky;
  bottom: 0;
  right: 0;
  width: 100%;
  margin-top: 20px;
}
.unpurchased {
  background: #5752e3;
  padding: 4px, 16px, 4px, 16px;
}
.disable {
}
</style>
