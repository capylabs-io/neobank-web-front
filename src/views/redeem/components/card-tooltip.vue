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
        <v-img class="card-image" :src="cards.attributes.imageUrl"></v-img>
      </div>
      <div
        v-if="cards.attributes.tag == 'New Deal'"
        class="mt-3 pa-2"
        :style="{
          background: '#FDDF59',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.attributes.tag }}
      </div>
      <div
        v-else-if="cards.attributes.tag == 'Hot'"
        class="mt-3 pa-2"
        :style="{
          background: '#f65970',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.attributes.tag }}
      </div>
      <div
        v-else
        class="mt-3 pa-2"
        :style="{
          background: '#CBCBCB',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.attributes.tag }}
      </div>
    </div>
    <div class="mt-3 font-weight-bold text-left">
      <span class="mt-3"> {{ cards.attributes.shortDescription }} </span>
    </div>
    <div class="mt-3 text-left d-flex column-gap-10">
      <div>
        <v-img class="card-icon" src="@/assets/redeem/card/baemin-icon.webp" />
        <!-- <v-img class="card-icon" :src="cards.attributes.iconUrl" /> -->
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
