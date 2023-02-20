<template>
  <v-card
    height="290px"
    max-width="14.3%"
    elevation="2"
    rounded="8"
    class="pa-3"
  >
    <div class="card-image d-flex flex-column justify-center align-center">
      <div class="image">
        <v-img :src="require(`@/assets/redeem/voucher-icon.webp`)"></v-img>
      </div>
    </div>
    <div class="mt-3 font-weight-bold">Valentine Chocolate backpack</div>
    <v-btn
      v-if="status.index == 1"
      class="d-flex column-gap-10 mx-auto mt-3 unpurchased"
      elevation="2"
      rounded
      text
    >
      <div>
        <span
          class="white--text font-weight-bold pr-2"
          :style="{ 'font-size': '18px' }"
          >100</span
        >
      </div>
      <div>
        <v-img
          :style="{ 'border-radius': '40px' }"
          :src="require(`@/assets/redeem/coin.webp`)"
        ></v-img>
      </div>
    </v-btn>
    <v-btn
      v-else
      class="d-flex column-gap-10 mx-auto mt-3 purchased"
      elevation="2"
      rounded
      text
    >
      <v-icon color="success">mdi-check</v-icon>
      <div>
        <span class="font-weight-bold text-capitalize pl-2">Purchased</span>
      </div>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: ["status"],

  data() {
    return {
      index: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-image {
  background: #f5f5f5;
  border-radius: 8px;
}
.image {
  width: 140px;
  height: 140px;
}
.column-gap-10 {
  column-gap: 10px;
}
.v-card {
  border-radius: 8px;
  animation: fadeleft 1s ease-in-out;
}

.unpurchased {
  background: #5752e3;
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
</style>
