<template>
  <v-card
    max-width="400px"
    height="max-content"
    elevation="2"
    rounded="8"
    class="pa-4"
  >
    <div class="card-image d-flex flex-column">
      <div class="full-width">
        <v-img class="card-image" :src="cards.thumbnailUrl"></v-img>
      </div>
      <div
        v-if="cards.status == 'New Deal'"
        class="mt-3 pa-1 px-3 white--text"
        :style="{
          background: '#1890FF',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
          'box-shadow': '0px 1px 2px rgba(0, 0, 0, 0.4)',
        }"
      >
        New Deal
      </div>
      <div
        v-else-if="cards.status == 'hot'"
        class="mt-3 pa-1 px-3 white--text"
        :style="{
          background: '#EC1D1D',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
          'box-shadow': '0px 1px 2px rgba(0, 0, 0, 0.4)',
        }"
      >
        Hot
      </div>
      <div
        v-else-if="cards.purchasedQuantity == cards.totalQuantity"
        class="mt-3 pa-1 px-3 white--text"
        :style="{
          background: '#FDDF59',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
          'box-shadow': '0px 1px 2px rgba(0, 0, 0, 0.4)',
        }"
      >
        Out of stock
      </div>
      <div
        v-else-if="cards.status == 'active'"
        class="mt-3 pa-1 px-3 white--text"
        :style="{
          background: '#53B06C',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
          'box-shadow': '0px 1px 2px rgba(0, 0, 0, 0.4)',
        }"
      >
        Active
      </div>
      <div
        v-else
        class="mt-3 pa-1 px-3 white--text"
        :style="{
          background: '#A9A9A9',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
          'box-shadow': '0px 1px 2px rgba(0, 0, 0, 0.4)',
        }"
      >
        Expired
      </div>
    </div>
    <div class="mt-3 font-weight-bold text-left">
      <span class="mt-3"> {{ cards.shortDescription }} </span>
    </div>
    <div class="mt-3 text-left d-flex column-gap-10">
      <div>
        <v-img class="card-icon" :src="cards.campaignCategory.iconUrl" />
        <!-- <v-img class="card-icon" :src="cards.iconUrl" /> -->
      </div>
      <span> HSD: 31 Oct 2022 </span>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["cards"],
  data() {
    return {
      index: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  z-index: 98;
}
.card-image {
  border-radius: 8px;
  height: 160px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card-icon {
  border-radius: 100px;
  width: 32px;
  height: 32px;
}
/*
.image {
  width: 140px;
  height: 140px;
}*/
.column-gap-10 {
  column-gap: 10px;
}
.v-card {
  border-radius: 8px;
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
</style>
