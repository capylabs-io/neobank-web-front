<template>
  <v-card
    height="290px"
    max-width="225px"
    elevation="2"
    rounded="8"
    class="pa-4"
  >
    <v-hover v-slot="{ hover }">
      <div
        class="card-image d-flex flex-column"
        :style="{
          backgroundImage: 'url(' + cards.image + ')',
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
          {{ cards.price }}.000₫
        </div>
        <tooltip class="tooltip" :cards="cards" v-if="hover"></tooltip>
      </div>
    </v-hover>
    <div class="d-flex mt-3 font-weight-bold align-center justify-center">
      <div>
        <v-img class="card-icon" :src="cards.icon"></v-img>
      </div>
      <span> {{ cards.title }} </span>
    </div>
    <v-btn
      class="d-flex column-gap-10 mx-auto mt-3 unpurchased"
      elevation="2"
      rounded
      text
    >
      <div>
        <span
          class="white--text font-weight-bold pr-2"
          :style="{ 'font-size': '18px' }"
        >
          {{ cards.price }}000</span
        >
      </div>
      <div>
        <v-img
          :style="{ 'border-radius': '40px' }"
          :src="require(`@/assets/redeem/coin.webp`)"
        ></v-img>
      </div>
    </v-btn>
  </v-card>
</template>

<script>
import tooltip from "@/views/redeem/components/card-tooltip.vue";
export default {
  props: ["cards"],
  components: {
    tooltip: tooltip,
  },
  data() {
    return {
      index: 1,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.card-image {
  border-radius: 8px;
  height: 140px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card-icon {
  border-radius: 100px;
}
/*
.image {
  width: 140px;
  height: 140px;
}*/
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
