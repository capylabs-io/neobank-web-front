<template>
  <v-card height="290px" width="250px" elevation="2" rounded="8" class="pa-2">
    <v-skeleton-loader
      v-if="!cards.attributes.imageUrl"
      color="lighten-4"
      class="pa-3 card-image mx-auto"
      type="image"
    />
    <!-- :style="{
      backgroundImage: 'url(' + cards.attributes.imageUrl + ')',
    }" -->
    <div v-else class="card-image d-flex flex-column">
      <div class="full-width">
        <v-img
            class="card-image"
            height="140px"
          :src="cards.attributes.imageUrl"
        ></v-img>
      </div>
      <div
        v-if="cards.attributes.status == 'New'"
        class="mt-3 pa-1 px-3"
        :style="{
          background: '#FDDF59',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.attributes.status }}
      </div>
      <div
        v-else-if="cards.attributes.status == 'Hot'"
        class="mt-3 pa-1 px-3"
        :style="{
          background: '#f65970',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.attributes.status }}
      </div>
      <div
        v-else
        class="mt-3 pa-1 px-3"
        :style="{
          background: '#CBCBCB',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.attributes.status }}
      </div>
    </div>

    <v-hover v-slot="{ hover }">
      <div class="d-flex mt-6 font-weight-bold align-center justify-center">
        <div>
          <v-img class="card-icon" :src="cards.attributes.iconUrl" />
        </div>
        <div
          class="d-inline-block text-truncate voucher-title"
          style="height: 50px ,  max-width:60%"
        >
          {{ cards.attributes.title }}
        </div>
        <tooltip v-if="hover" class="tooltip" :cards="cards" />
      </div>
    </v-hover>

    <v-btn
      v-if="cards.attributes.status == 'Expired'"
      class="d-flex column-gap-10 mx-auto mt-3 mt-5 expired"
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
      class="d-flex column-gap-10 mx-auto mt-3 mt-5 purchased"
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
      class="d-flex column-gap-10 mx-auto mt-3 mt-5 unpurchased"
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
      if (this.userStore.userData.token > this.cards.attributes.price) {
        this.userStore.drawerDetail = !this.userStore.drawerDetail;
        this.userStore.detailCard = this.cards;
        this.userStore.voucherId = this.id;
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
  margin-left: 100px;
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
