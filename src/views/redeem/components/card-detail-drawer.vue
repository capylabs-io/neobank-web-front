<template>
  <v-navigation-drawer
    v-model="voucherStore.drawerDetail"
    absolute
    right
    hide-overlay
    temporary
    width="480px"
    class="drawer"
  >
    <div
      class="white-bg overflow-hidden full-height pa-6 d-flex flex-column justify-space-between"
    >
      <div>
        <div class="d-flex flex-column">
          <div class="neutral30-border border-radius-16 overflow-hidden">
            <v-img
              class="drawer-image"
              :src="voucherStore.detailCard.thumbnailUrl"
            ></v-img>
          </div>
          <div
            v-if="voucherStore.detailCard.status == 'newDeal'"
            class="mt-3 pa-1 px-3 white--text"
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
            v-else-if="voucherStore.detailCard.status == 'hot'"
            class="mt-3 pa-1 px-3 white--text"
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
              voucherStore.detailCard.purchasedQuantity ==
              voucherStore.detailCard.totalQuantity
            "
            class="mt-3 pa-1 px-3 white--text"
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
            v-else-if="voucherStore.detailCard.status == 'active'"
            class="mt-3 pa-1 px-3 white--text"
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
            class="mt-3 pa-1 px-3 white--text"
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
        </div>
        <div class="mt-6 font-weight-bold text-center">
          <v-img class="drawer-icon mx-auto" :src="categoryIcon" />
          <div class="text-lg mt-3">{{ voucherStore.detailCard.title }}</div>
        </div>
        <div class="mt-3 text-left">
          {{ voucherStore.detailCard.fullDescription }}
        </div>
      </div>
      <!-- <v-spacer></v-spacer> -->
      <div class="text-center">
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
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
import { inventoryStore } from "@/stores/inventoryStore";
import { get } from "lodash";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
    ...mapStores(inventoryStore),
    categoryIcon() {
      return get(
        this.voucherStore,
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
      var number = this.voucherStore.detailCard.attributes.quantity;
      number++;
      this.voucherStore.detailCard.attributes.quantity = number + "";
    },
    decrease() {
      var number = this.voucherStore.detailCard.attributes.quantity;
      number--;
      this.voucherStore.detailCard.attributes.quantity = number + "";
    },
    buy() {
      this.$dialog.confirm({
        title: "Confirm Purchase Voucher",
        topContent:
          "Are you sure you want to purchase this voucher? This action cannot be undone!",
        okText: "Confirm",
        cancelText: "Cancel",
        done: async () => {
          try {
            this.$loading.show();
            this.voucherStore.voucherId = this.voucherStore.detailCard.id;
            await this.voucherStore.purchaseVoucher();
            await this.inventoryStore.fetchUserVoucher();
            await this.userStore.fetchUserMetadata();
            await this.voucherStore.fetchVoucher();
            this.voucherStore.drawerDetail = false;
            window.location.reload();
          } catch (error) {
            this.$alert.error("Error occured! Error: " + error);
          } finally {
            this.$loading.hide();
          }
        },
      });
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
  z-index: 99;
  border: 1px var(--v-neutral30-base) solid;
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
