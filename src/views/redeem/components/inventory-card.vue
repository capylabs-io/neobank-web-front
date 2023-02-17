<template>
  <v-card
    height="290px"
    max-width="225px"
    elevation="2"
    rounded="8"
    class="pa-4 inventory-card"
  >
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
    </div>
    <div class="d-flex mt-3 font-weight-bold align-center justify-center">
      <div>
        <v-img class="card-icon" :src="cards.icon"></v-img>
      </div>
      <span> {{ cards.title }} </span>
    </div>

    <v-btn
      v-if="!cards.purchased"
      class="d-flex column-gap-10 mx-auto mt-3 unpurchased"
      elevation="2"
      rounded
      text
      @click.stop="openClick"
    >
      <div>
        <span class="white--text font-weight-bold text-capitalize">Open</span>
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
        <span class="font-weight-bold text-capitalize pl-2">Redeemed</span>
      </div>
    </v-btn>

    <!-- <v-card
      v-if="drawer"
      elevation="8"
      class="drawer pa-5 d-flex flex-column justify-space-between"
    >
      <v-card class="drawer-card" flat>
        <div
          class="drawer-image d-flex flex-column"
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
        </div>
        <div
          class="d-flex flex-column mt-3 font-weight-bold align-center justify-center"
        >
          <div>
            <v-img class="drawer-icon" :src="cards.icon"></v-img>
          </div>
          <span class="mt-3"> {{ cards.detailheader }} </span>
        </div>
        <div class="mt-3 text-left">{{ cards.firstDetail }}</div>
        <div class="mt-3 text-left">{{ cards.secondDetail }}</div>
      </v-card>

      <v-btn icon elevation="4" class="btn-arrow" @click.stop="drawer = !drawer"
        ><v-icon> mdi-arrow-left</v-icon>
      </v-btn>

      <v-btn
        class="d-flex column-gap-10 mx-auto mt-3 unpurchased drawer-btn"
        elevation="2"
        rounded
        text
      >
        <div>
          <span class="white--text font-weight-bold pr-2 text-capitalize"
            >Redeem Now</span
          >
        </div>
      </v-btn>
    </v-card> -->
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
  },
  props: ["cards"],
  data() {
    return {
      index: 1,
      drawer: false,
    };
  },
  methods: {
    openClick() {
      this.userStore.drawer = !this.userStore.drawer;
      this.userStore.cardData = this.cards;
    },
  },
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
.drawer-image {
  border-radius: 8px;
  height: 240px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card-icon {
  border-radius: 100px;
}
.drawer-icon {
  border-radius: 100px;
  width: 40px;
  height: 40px;
}
.btn-arrow {
  position: absolute;
  background-color: white;
  left: 95%;
  top: 50%;
  bottom: 50%;
  z-index: 100;
}
/*
.image {
  width: 140px;
  height: 140px;
}*/
.column-gap-10 {
  column-gap: 10px;
}
.inventory-card {
  border-radius: 8px;
  display: inline-block;
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
.drawer {
  position: fixed;
  z-index: 99;
  background: white !important;
  width: 400px;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.drawer-btn {
  width: 100%;
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
