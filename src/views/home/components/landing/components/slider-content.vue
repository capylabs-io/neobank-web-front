<template>
  <v-card
    class="d-flex mx-auto col-gap-28 justify-center align-center section-card pa-8"
    v-if="visibleContent === index"
  >
    <div
      class="right d-flex flex-column justify-center align-center row-gap-25"
      data-aos="fade-left"
    >
      <div class="rocket-icon mx-auto pa-4">
        <v-icon large color="white">mdi-rocket-launch</v-icon>
      </div>
      <div class="white--text text-dp-sm text-center font-weight-700">
        {{ content.title }}
      </div>
      <div class="text-left text-md white--text font-weight-400">
        {{ content.content }}
      </div>
      <slot></slot>
    </div>
    <div class="left d-flex justify-center align-center">
      <div
        class="first-section-image mx-auto"
        data-aos="fade-right"
        data-aos-delay="50"
        :style="{
          backgroundImage: 'url(' + content.image + ')',
        }"
      />
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    index: Number,
    visibleContent: Number,
    content: Object,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.section-card {
  margin-top: 64px;
  background: rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
}
.first-section-image {
  background-position: cover;
  background-repeat: no-repeat;
  background-size: auto 100%;
  height: 456px;
  width: 600px;
  border-radius: 12px;
  z-index: 2;
}
.left {
  width: 50%;
  @media (max-width: 1280px) {
    width: 95%;
  }
}
.right {
  width: 50%;
  z-index: 2;
  @media (max-width: 1280px) {
    width: 95%;
  }
}
.rocket-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}
.row-gap-25 {
  row-gap: 25px;
}
.col-gap-28 {
  column-gap: 50px;
}
.arrow-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ffffff;
}
.btn-group {
  margin-top: 89px;
}
</style>
