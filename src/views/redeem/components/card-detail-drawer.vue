<template>
  <v-navigation-drawer
    v-model="voucherStore.drawerDetail"
    absolute
    temporary
    right
    hide-overlay
    width="480px"
    color="white"
    class="drawer d-flex flex-column"
  >
    <v-card class="drawer-card" flat>
      <div class="drawer-image d-flex flex-column">
        <div class="full-width">
          <v-img
            class="drawer-image"
            :src="voucherStore.detailCard.thumbnailUrl"
          ></v-img>
        </div>
        <div
          v-if="voucherStore.detailCard.status == 'New Deal'"
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
      <div
        class="d-flex flex-column mt-3 font-weight-bold align-center justify-center"
      >
        <!-- <div>
          <v-img
            class="drawer-icon"
            :src="voucherStore.detailCard.campaignCategory.iconUrl"
          />
        </div> -->
        <span class="mt-3"> {{ voucherStore.detailCard.title }} </span>
      </div>
      <div class="mt-3 text-left draw-text">
        {{ voucherStore.detailCard.shortDescription }}
        {{ voucherStore.detailCard.fullDescription }}
      </div>
    </v-card>
    <!-- <div class="d-flex col-gap-10 align-center amount-container">
      <v-btn v-if="voucherStore.detailCard.attributes.quantity == 0" icon disabled>
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn v-else icon @click="decrease">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <div class="">
        <v-input class="number">
          {{ voucherStore.detailCard.attributes.quantity }}
        </v-input>
      </div>
      <v-btn
        v-if="voucherStore.detailCard.attributes.quantity == 10"
        disabled
        icon
        @click="increase"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn v-else icon @click="increase">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div> -->
    <v-btn
      class="d-flex mx-auto unpurchased drawer-btn"
      elevation="2"
      rounded
      text
      @click="buy"
    >
      <div>
        <span class="white--text font-weight-bold pr-2 text-capitalize"
          >Buy Now
        </span>
      </div>
    </v-btn>
  </v-navigation-drawer>
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
      this.voucherStore.drawerDetail = !this.voucherStore.drawerDetail;
      this.voucherStore.cfDialog = true;
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
  background: white !important;
  height: 100vh;
  padding: 85px 20px;
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
