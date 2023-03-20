<template>
  <v-card elevation="2" rounded="8" class="pa-3">
    <v-skeleton-loader
      v-if="!cards.attributes.imageUrl"
      color="lighten-4"
      class="pa-3 card-image mx-auto"
      type="image"
    />

    <div v-else class="card-image d-flex flex-column">
      <div class="full-width">
        <v-img
          class="card-image"
          height="140px"
          :src="cards.attributes.imageUrl"
        ></v-img>
      </div>
      <div
        v-if="cards.attributes.tag == 'New Deal'"
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
        {{ cards.attributes.tag }}
      </div>
      <div
        v-else-if="cards.attributes.tag == 'Hot'"
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
        {{ cards.attributes.tag }}
      </div>
      <div
        v-else-if="
          cards.attributes.purchasedQuantity == cards.attributes.totalQuantity
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
        {{ cards.attributes.tag }}
      </div>
    </div>

    <v-hover v-slot="{ hover }">
      <div class="mt-3 font-weight-bold text-center text-truncate">
        <div class="d-inline-block voucher-title">
          {{ cards.attributes.title }}
        </div>
        <tooltip v-if="hover" class="tooltip" :cards="cards" />
      </div>
    </v-hover>

    <div
      class="d-flex mt-3 font-weight-bold align-center justify-center full-width column-gap-10"
    >
      <div>
        <!-- <v-img class="card-icon" :src="cards.attributes.iconUrl" /> -->
        <v-img class="card-icon" src="@/assets/redeem/card/baemin-icon.webp" />
      </div>
      <v-btn
        v-if="cards.attributes.tag == 'Expired'"
        class="d-flex column-gap-10 px-10 expired"
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
            {{ cards.attributes.price }}</span
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
        v-else-if="purchased"
        class="d-flex column-gap-10 px-10 purchased"
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
        class="d-flex column-gap-10 px-10 unpurchased"
        elevation="2"
        rounded
        text
        @click="Click"
      >
        <div>
          <span
            class="white--text font-weight-bold pr-2"
            :style="{ 'font-size': '18px' }"
          >
            {{ cards.attributes.price }}</span
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
import { userStore } from "../../../stores/userStore";
import tooltip from "@/views/redeem/components/card-tooltip.vue";
export default {
  components: {
    tooltip: tooltip,
  },
  props: ["cards", "id"],
  computed: {
    ...mapStores(userStore),
  },
  data() {
    return {
      index: 1,
      loading: true,
      purchased: true,
    };
  },
  mounted() {
    this.purchased = this.userStore.voucherPurchased.includes(this.id);
  },
  methods: {
    Click() {
      this.userStore.drawerDetail = !this.userStore.drawerDetail;
      this.userStore.setDetailStoreCard(this.cards);
      // this.userStore.detailCard = this.cards;
      this.userStore.voucherId = this.id;
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
}
.card-icon {
  border-radius: 100px;
  width: 40px;
  height: 40px;
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
  border-radius: 8px;
  animation: fadeleft 1s ease-in-out;
}

.unpurchased {
  background: #5752e3;
  padding: 4px, 16px, 4px, 16px;
}
.expired {
  padding: 4px, 16px, 4px, 16px;
}

.purchased {
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
