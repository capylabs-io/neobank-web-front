<template>
  <v-card elevation="2" rounded="8" class="pa-3 inventory-card">
    <div class="card-image d-flex flex-column">
      <div class="full-width">
        <v-img class="card-image" height="140px" :src="cards.imageUrl"></v-img>
      </div>
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
    <div
      class="d-flex mt-6 column-gap-10 font-weight-bold align-center justify-center"
    >
      <div>
        <v-img class="card-icon" :src="cards.iconUrl" />
      </div>
      <div class="d-inline-block text-truncate voucher-title">
        {{ cards.title }}
      </div>
    </div>
    <v-btn
      class="d-flex column-gap-10 mx-auto mt-3 mt-5 unpurchased"
      elevation="2"
      rounded
      text
      @click.stop="openClick"
    >
      <div>
        <span class="white--text font-weight-bold text-capitalize">Open</span>
      </div>
    </v-btn>
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
