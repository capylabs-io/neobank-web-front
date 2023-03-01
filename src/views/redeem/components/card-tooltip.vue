<template>
  <v-card
    max-width="400px"
    height="max-content"
    elevation="2"
    rounded="8"
    class="pa-4"
  >
    <!-- <div
      class="card-image d-flex flex-column"
      :style="{
        backgroundImage: 'url(' + cards.attributes.imageUrl + ')',
      }"
    > -->
    <div class="card-image d-flex flex-column">
      <div class="full-width">
        <v-img
          class="card-image"
            :src="cards.attributes.imageUrl"
        ></v-img>
      </div>
      <div
        v-if="cards.attributes.status == 'New'"
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
        {{ cards.attributes.status }}
      </div>
      <div
        v-else-if="cards.attributes.status == 'Hot'"
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
        {{ cards.attributes.status }}
      </div>
      <div
        v-else
        class="mt-3 pa-1"
        :style="{
          background: '#CBCBCB',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.attributes.status }}
      </div>
    </div>
    <div
      class="d-flex flex-column mt-3 font-weight-bold align-center justify-center"
    >
      <div>
        <v-img
          class="card-icon"
          :src="cards.attributes.iconUrl"
        />
      </div>
      <span class="mt-3"> {{ cards.attributes.title }} </span>
      <span class="mt-3"> {{ cards.attributes.shortDescription }} </span>
    </div>
    <div class="mt-3 text-left">
      HSD: 31 Oct 2022
    </div>
    <div class="mt-3 text-left">
      Notice: lorem ipsum
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
.card-image {
  border-radius: 8px;
  height: 200px;
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
