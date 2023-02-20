<template>
  <v-navigation-drawer
    absolute
    temporary
    v-model="userStore.drawerDetail"
    right
    hide-overlay
    width="480px"
    color="white"
    class="pa-5 drawer d-flex flex-column"
  >
    <v-card class="drawer-card" flat>
      <div
        class="drawer-image d-flex flex-column"
        :style="{
          backgroundImage: 'url(' + userStore.detailCard.image + ')',
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
          v-if="userStore.detailCard.status == 'Expired'"
        >
          {{ userStore.detailCard.status }}
        </div>
        <div
          class="mt-3 pa-1"
          :style="{
            background: '#f65970',
            width: 'max-content',
            height: 'max-content',
            position: 'absolute',
            'border-bottom-right-radius': '8px',
            'border-top-right-radius': '8px',
          }"
          v-else-if="userStore.detailCard.status == 'Hot'"
        >
          {{ userStore.detailCard.status }}
        </div>
        <div
          class="mt-3 pa-1"
          :style="{
            background: '#4c99eb',
            width: 'max-content',
            height: 'max-content',
            position: 'absolute',
            'border-bottom-right-radius': '8px',
            'border-top-right-radius': '8px',
          }"
          v-else
        >
          {{ userStore.detailCard.status }}
        </div>
      </div>
      <div
        class="d-flex flex-column mt-3 font-weight-bold align-center justify-center"
      >
        <div>
          <v-img class="drawer-icon" :src="userStore.detailCard.icon"></v-img>
        </div>
        <span class="mt-3"> {{ userStore.detailCard.detailheader }} </span>
      </div>
      <div class="mt-3 text-left draw-text">
        {{ userStore.detailCard.firstDetail }}
        {{ userStore.detailCard.secondDetail }}
      </div>
    </v-card>
    <div class="d-flex col-gap-10 align-center amount-container">
      <v-btn icon v-if="index == 0" disabled><v-icon>mdi-minus</v-icon></v-btn>
      <v-btn icon v-else @click="index--"><v-icon>mdi-minus</v-icon></v-btn>
      <div class="">
        <v-input class="number">{{ index }}</v-input>
      </div>
      <v-btn v-if="index == 10" disabled icon @click="index++"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
      <v-btn v-else icon @click="index++"><v-icon>mdi-plus</v-icon></v-btn>
    </div>
    <v-btn
      class="d-flex mx-auto unpurchased drawer-btn"
      elevation="2"
      rounded
      text
    >
      <div>
        <span class="white--text font-weight-bold pr-2 text-capitalize"
          >Buy Now</span
        >
      </div>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
  },
  data() {
    return {
      index: 0,
    };
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
