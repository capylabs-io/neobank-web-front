<template>
  <v-navigation-drawer
    v-model="userStore.drawerDetail"
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
            :src="userStore.detailCard.imageUrl"
          ></v-img>
        </div>
        <div
          v-if="userStore.detailCard.status == 'Expired'"
          class="mt-3 pa-1 px-3 status"
          :style="{
            background: '#FDDF59',
            width: 'max-content',
            height: 'max-content',
            position: 'absolute',
            'border-bottom-right-radius': '8px',
            'border-top-right-radius': '8px',
          }"
        >
          {{ userStore.detailCard.status }}
        </div>
        <div
          v-else-if="userStore.detailCard.status == 'Hot'"
          class="mt-3 pa-1 px-3 status"
          :style="{
            background: '#f65970',
            width: 'max-content',
            height: 'max-content',
            position: 'absolute',
            'border-bottom-right-radius': '8px',
            'border-top-right-radius': '8px',
          }"
        >
          {{ userStore.detailCard.status }}
        </div>
        <div
          v-else
          class="mt-3 pa-1 px-3 status"
          :style="{
            background: '#FDDF59',
            width: 'max-content',
            height: 'max-content',
            position: 'absolute',
            'border-bottom-right-radius': '8px',
            'border-top-right-radius': '8px',
          }"
        >
          {{ userStore.detailCard.status }}
        </div>
      </div>
      <div
        class="d-flex flex-column mt-3 font-weight-bold align-center justify-center"
      >
        <div>
          <v-img class="drawer-icon" :src="userStore.detailCard.iconUrl" />
        </div>
        <span class="mt-3"> {{ userStore.detailCard.title }} </span>
      </div>
      <div class="mt-3 text-left draw-text">
        {{ userStore.detailCard.shortDescription }}
        {{ userStore.detailCard.fullDescription }}
      </div>
    </v-card>
    <!-- <div class="d-flex col-gap-10 align-center amount-container">
      <v-btn v-if="userStore.detailCard.attributes.quantity == 0" icon disabled>
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn v-else icon @click="decrease">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <div class="">
        <v-input class="number">
          {{ userStore.detailCard.attributes.quantity }}
        </v-input>
      </div>
      <v-btn
        v-if="userStore.detailCard.attributes.quantity == 10"
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
    <div>id: {{ userStore.voucherId }}</div>
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
export default {
  computed: {
    ...mapStores(userStore),
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    increase() {
      var number = this.userStore.detailCard.attributes.quantity;
      number++;
      this.userStore.detailCard.attributes.quantity = number + "";
    },
    decrease() {
      var number = this.userStore.detailCard.attributes.quantity;
      number--;
      this.userStore.detailCard.attributes.quantity = number + "";
    },
    buy() {
      this.userStore.drawerDetail = !this.userStore.drawerDetail;
      this.userStore.cfDialog = true;
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
