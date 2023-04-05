<template>
  <v-card elevation="2" rounded="8" class="pa-3">
    <v-skeleton-loader
      v-if="!cards.thumbnailUrl"
      color="lighten-4"
      class="pa-3 card-image mx-auto"
      type="image"
    />

    <div v-else class="card-image d-flex flex-column">
      <div class="full-width">
        <v-img
          class="card-image"
          height="140px"
          :src="cards.thumbnailUrl"
        ></v-img>
      </div>
      <div
        v-if="cards.status == 'newDeal'"
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
        v-else-if="cards.status == 'hot'"
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
        v-else-if="cards.purchasedQuantity == cards.totalQuantity"
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
        v-else-if="cards.status == 'active'"
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

    <v-hover v-slot="{ hover }">
      <div class="mt-3 font-weight-bold text-center text-truncate">
        <div class="d-inline-block voucher-title">
          {{ cards.title }}
        </div>
        <tooltip v-if="hover" class="tooltip" :cards="cards" />
      </div>
    </v-hover>

    <div
      class="d-flex mt-3 font-weight-bold align-center justify-center column-gap-10"
    >
      <div>
        <v-img
          v-if="cards.campaignCategory.iconUrl"
          class="card-icon"
          :src="cards.campaignCategory.iconUrl"
        />
        <v-img
          v-else
          class="card-icon"
          src="@/assets/redeem/card/baemin-icon.webp"
        />
      </div>

      <v-btn
        v-if="
          cards.status == 'expired' ||
          cards.purchasedQuantity == cards.totalQuantity
        "
        class="d-flex column-gap-10 expired"
        elevation="2"
        rounded
        text
        disabled
        color="expired"
      >
        <div>
          <span
            class="font-weight-bold pr-2"
            :style="{ 'font-size': '18px', color: '#AFAFAF' }"
          >
            {{ cards.price }}</span
          >
        </div>
        <div>
          <v-img
            :style="{ 'border-radius': '40px' }"
            :src="require(`@/assets/redeem/coin.webp`)"
          />
        </div>
      </v-btn>
      <v-btn
        v-else-if="isPurchased"
        class="d-flex column-gap-10 purchased"
        elevation="2"
        rounded
        text
      >
        <v-icon color="success"> mdi-check </v-icon>
        <div>
          <span class="font-weight-bold text-capitalize pl-2">Purchased</span>
        </div>
      </v-btn>
      <v-btn
        v-else
        class="d-flex column-gap-10 unpurchased"
        elevation="2"
        rounded
        text
        @click="buyClicked()"
      >
        <div>
          <span
            class="white--text font-weight-bold pr-2"
            :style="{ 'font-size': '18px' }"
          >
            {{ cards.price }}</span
          >
        </div>
        <div>
          <v-img
            :style="{ 'border-radius': '40px' }"
            :src="require(`@/assets/redeem/coin.webp`)"
          />
        </div>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
import { inventoryStore } from "@/stores/inventoryStore";
import tooltip from "@/views/redeem/components/card-tooltip.vue";
export default {
  components: {
    tooltip: tooltip,
  },
  props: ["cards", "id", "isPurchased"],
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
    ...mapStores(inventoryStore),
  },
  data() {
    return {
      index: 1,
      loading: true,
    };
  },
  methods: {
    buyClicked() {
      if (
        this.userStore.userData.userMetadata.token >= this.cards.price &&
        this.cards.purchasedQuantity == this.cards.totalQuantity
      ) {
        this.voucherStore.checkPurchased(`Campaign Out of Stock`);
      } else if (
        this.userStore.userData.userMetadata.token >= this.cards.price
      ) {
        this.voucherStore.drawerDetail = !this.voucherStore.drawerDetail;
        this.voucherStore.setDetailStoreCard(this.cards);
        this.voucherStore.voucherId = this.id;
      } else {
        this.voucherStore.checkPurchased(`You dont have enough Token To buy`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-image {
  height: 140px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px var(--v-neutral30-base) solid;
}
.card-icon {
  border-radius: 100px;
  width: 35px;
  height: 35px;
}

.column-gap-10 {
  column-gap: 10px;
}
.tooltip {
  position: absolute;
  width: 400px;
  top: 7%;
  z-index: 99;
}

.v-card {
  border-radius: 12px;
  animation: fadeleft 1s ease-in-out;
  width: max-content;
}
.v-card:hover {
  border: 2px solid var(--v-blue-base);
}

.unpurchased {
  width: calc(100% - 45px);
  background: var(--v-blue-base);
  padding: 4px, 16px, 4px, 16px;
}
.expired {
  width: calc(100% - 45px);
  padding: 4px, 16px, 4px, 16px;
}

.purchased {
  width: calc(100% - 45px);
  background: #00ff2926;
  color: #22c33c;
  padding: 4px, 16px, 4px, 16px;
}
@keyframes fadeleft {
  0% {
    opacity: 0;
    transform: translatex(-100px);
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translatey(300px);
  }
  to {
    opacity: 1;
  }
}
</style>
