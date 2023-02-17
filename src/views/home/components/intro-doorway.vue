<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="d-flex flex-column justify-center align-center intro-doorway full-width"
    :style="{
      backgroundImage:
        'url(' + require(`@/assets/home/intro-background.webp`) + ')',
    }"
  >
    <div
      class="d-flex flex-column justify-center align-center row-gap-30"
      :style="{ width: '32%' }"
      data-aos-delay="700"
      data-aos-duration="10000"
      data-aos-easing="ease-in-out"
      data-aos="zoom-out"
    >
      <div class="text-center white--text display-3 font-weight-bold">
        Welcome to VParadise
      </div>
      <div class="text-center white--text body-1">
        Journey into the future of banking with VParadise, a harmony between
        technologies and banking
      </div>
      <v-btn color="introbtn" class="white--text pa-5">
        Discover now
        <v-icon color="white">mdi-arrow-right-thin</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.intro-doorway {
  height: 120vh;
  top: 0;
  left: 0;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 1280px) {
    display: none !important;
  }
}

.title {
  width: 47%;
  z-index: 2;
}
.rectangle {
  position: absolute;
  height: 560px;
  width: 400px;
  z-index: 1;
  background: #eafff4;
}
.introduction-image {
  background-position: cover;
  background-repeat: no-repeat;
  background-size: auto 100%;
  width: 53%;
}
.v-btn {
  max-width: 193px;
  height: 48px;
  border-radius: 40px;
}
.row-gap-30 {
  row-gap: 30px;
}
</style>
>
