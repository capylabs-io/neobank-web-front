<template>
  <v-navigation-drawer
    v-model="userStore.drawer"
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
            :src="userStore.ivenCardData.imageUrl"
          ></v-img>
        </div>
        <div
          v-if="userStore.ivenCardData.tag == 'New Deal'"
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
          {{ userStore.ivenCardData.tag }}
        </div>
        <div
          v-else-if="userStore.ivenCardData.tag == 'Hot'"
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
          {{ userStore.ivenCardData.tag }}
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
          {{ userStore.ivenCardData.tag }}
        </div>
      </div>
      <div
        class="d-flex flex-column mt-3 font-weight-bold align-center justify-center"
      >
        <div>
          <v-img class="drawer-icon" :src="userStore.ivenCardData.iconUrl" />
        </div>
        <span class="mt-3"> {{ userStore.ivenCardData.title }} </span>
      </div>
      <div class="mt-3 text-left draw-text">
        {{ userStore.ivenCardData.fullDescription }}
      </div>
    </v-card>
    <div class="qr-img mx-auto mt-3">
      <v-img class="" :src="userStore.ivenVoucherQr" />
    </div>
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
  position: sticky;
  left: 0;
  top: 0;
  border-radius: 8px;
  height: 200px;
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
  height: max-content;
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

.qr-img {
  position: sticky;
  bottom: -10;
  right: 0;
  width: 200px;
  height: 200px;
}
.unpurchased {
  background: #5752e3;
  padding: 4px, 16px, 4px, 16px;
}
.disable {
}
</style>
