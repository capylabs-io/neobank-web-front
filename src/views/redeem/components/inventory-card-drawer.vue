<template>
  <v-navigation-drawer
    v-model="userStore.drawer"
    absolute
    temporary
    right
    hide-overlay
    width="480px"
    color="white"
    class="pa-5 drawer d-flex flex-column"
  >
    <v-card
      class="drawer-card"
      flat
    >
      <div
        class="drawer-image d-flex flex-column"
        :style="{
          backgroundImage: 'url(' + userStore.cardData.image + ')',
        }"
      >
        <div
          v-if="userStore.cardData.status == 'Expired'"
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
          {{ userStore.cardData.status }}
        </div>
        <div
          v-else-if="userStore.cardData.status == 'Hot'"
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
          {{ userStore.cardData.status }}
        </div>
        <div
          v-else
          class="mt-3 pa-1"
          :style="{
            background: '#4c99eb',
            width: 'max-content',
            height: 'max-content',
            position: 'absolute',
            'border-bottom-right-radius': '8px',
            'border-top-right-radius': '8px',
          }"
        >
          {{ userStore.cardData.status }}
        </div>
      </div>
      <div
        class="d-flex flex-column mt-3 font-weight-bold align-center justify-center"
      >
        <div>
          <v-img
            class="drawer-icon"
            :src="userStore.cardData.icon"
          />
        </div>
        <span class="mt-3"> {{ userStore.cardData.detailheader }} </span>
      </div>
      <div class="mt-3 text-left">
        {{ userStore.cardData.firstDetail }}
      </div>
      <div class="mt-3 text-left">
        {{ userStore.cardData.secondDetail }}
      </div>
    </v-card>
    <v-btn
      class="d-flex column-gap-10 mx-auto unpurchased drawer-btn"
      elevation="2"
      rounded
      text
    >
      <div>
        <span class="white--text font-weight-bold pr-2 text-capitalize">Redeem Now</span>
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
};
</script>

<style lang="scss" scoped>
.drawer-image {
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
.btn-arrow {
  position: absolute;
  background-color: white;
  z-index: 99;
}
.drawer {
  background: white !important;
  height: 100vh;
}
.drawer-btn {
  width: 100%;
  margin-top: 50%;
}
.unpurchased {
  background: #5752e3;
  padding: 4px, 16px, 4px, 16px;
}
</style>
