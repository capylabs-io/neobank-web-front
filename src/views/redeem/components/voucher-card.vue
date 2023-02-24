<template>
  <v-card height="290px" width="14.3%" elevation="2" rounded="8" class="pa-2">
    <v-skeleton-loader
      v-if="!cards.imageUrl"
      color="lighten-4"
      class="pa-3 card-image mx-auto"
      type="image"
    />
    <div
      v-else
      class="card-image d-flex flex-column"
      :style="{
        backgroundImage: 'url(' + cards.imageUrl + ')',
      }"
    >
      <div
        v-if="cards.status == 'New'"
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
        {{ cards.status }}
      </div>
      <div
        v-else-if="cards.status == 'Hot'"
        class="mt-3 pa-1"
        :style="{
          background: '#f65970',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.status }}
      </div>
      <div
        v-else
        class="mt-3 pa-1"
        :style="{
          background: '#CBCBCB',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.status }}
      </div>
    </div>

    <v-hover v-slot="{ hover }">
      <div class="d-flex mt-3 font-weight-bold align-center justify-center">
        <div>
          <v-img class="card-icon" :src="cards.iconUrl" />
        </div>
        <div
          class="d-inline-block text-truncate voucher-title"
          style="max-width: 80%"
        >
          {{ cards.title }}
        </div>
        <tooltip v-if="hover" class="tooltip" :cards="cards" />
      </div>
    </v-hover>

    <v-btn
      v-if="cards.status == 'Expired'"
      class="d-flex column-gap-10 mx-auto mt-3 expired"
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
      v-else
      class="d-flex column-gap-10 mx-auto mt-3 unpurchased"
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
    };
  },
  methods: {
    Click() {
      this.userStore.drawerDetail = !this.userStore.drawerDetail;
      this.userStore.detailCard = this.cards;
      this.userStore.voucherId = this.id + 1;
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
}

.column-gap-10 {
  column-gap: 10px;
}
.tooltip {
  position: absolute;
  width: 400px;
  top: 45%;
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
