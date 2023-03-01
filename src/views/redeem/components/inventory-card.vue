<template>
  <v-card
    height="290px"
    width="250px"
    elevation="2"
    rounded="8"
    class="pa-2 inventory-card"
  >
    <div
      class="card-image d-flex flex-column"
      :style="{
        backgroundImage: 'url(' + cards.imageUrl + ')',
      }"
    >
      <div
        v-if="cards.status == 'Expired'"
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
        {{ cards.status }}
      </div>
      <div
        v-else-if="cards.status == 'Hot'"
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
        {{ cards.status }}
      </div>
      <div
        v-else
        class="mt-3 pa-1 px-3"
        :style="{
          background: '#4c99eb',
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
    <div class="d-flex mt-3 font-weight-bold align-center justify-center">
      <div>
        <v-img class="card-icon" :src="cards.iconUrl" />
      </div>
      <div
        class="d-inline-block text-truncate voucher-title"
        style="height: 50px ,  max-width:60%"
      >
        {{ cards.title }}
      </div>
    </div>
    <v-btn
      class="d-flex column-gap-10 mx-auto mt-3 mt-8 unpurchased"
      elevation="2"
      rounded
      text
      @click.stop="openClick"
    >
      <div>
        <span class="white--text font-weight-bold text-capitalize">Open</span>
      </div>
    </v-btn>
    <!-- <v-btn
      v-if="!cards.isRedeem"
      class="d-flex column-gap-10 mx-auto mt-3 mt-8 unpurchased"
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
      class="d-flex column-gap-10 mx-auto mt-3 mt-8 purchased"
      elevation="2"
      rounded
      text
    >
      <v-icon color="success">
        mdi-check
      </v-icon>
      <div>
        <span class="font-weight-bold text-capitalize pl-2">Redeemed</span>
      </div>
    </v-btn> -->
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../../stores/userStore";
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
  width: 40px;
  height: 40px;
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
  /* display: inline-block;*/
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
