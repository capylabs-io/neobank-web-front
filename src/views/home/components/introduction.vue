<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="d-flex flex-column justify-center align-center introduction"
    :style="{
      backgroundImage:
        'url(' + require(`@/assets/home/intro-background.webp`) + ')',
    }"
    data-aos="zoom-in"
    data-aos-delay="200"
    data-aos-duration="11000"
    data-aos-easing="ease-in-out"
  >
    <div
      class="introduction-content d-flex flex-column justify-center align-center row-gap-30"
      :style="{ width: '70%' }"
      data-aos-delay="200"
      data-aos-duration="11000"
      data-aos-easing="ease-in-out"
      data-aos="zoom-in"
    >
      <div class="text-center white--text text-xl-h2 font-weight-bold">
        Welcome to VParadise
      </div>
      <div class="text-center white--text text-md-h6">
        Journey into the future of banking with VParadise, a harmony between
        technologies and banking
      </div>
      <v-btn color="introbtn" class="white--text pa-5">
        <div class="text-decoration-none">Discover now</div>
        <v-icon color="white"> mdi-arrow-right-thin </v-icon>
      </v-btn>
    </div>
    <!-- <div class="rectangle align-self-center"></div>
    <div class="d-flex flex-column title justify-center align-center">
      <div class="d-flex flex-column row-gap-30" :style="{ width: '60%' }">
        <div class="text-left black--text display-3 font-weight-bold">
          Introducing: VParadise Bank
        </div>
        <div class="text-left black--text">
          NeoBank is an immersive 3D web platform that promotes, educates, and
          informs visitors about digital banking solutions that best fit their
          lifestyle, values, or specific financial situations through a fun and
          engaging online experience.
        </div>
        <v-btn class="white--text intro-btn pa-5">
          Discover now
          <v-icon color="white">mdi-arrow-right-thin</v-icon></v-btn
        >
      </div>
    </div> -->
    <!-- <div
      class="introduction-image"
      :style="{
        backgroundImage: 'url(' + require(`@/assets/home/image1.webp`) + ')',
      }"
    ></div> -->
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
.introduction {
  position: fixed;
  width: 100%;
  height: 105vh;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 3;
}
/*
.introduction-content {
  position: fixed;
  top: 45%;
  left: 15%;
}*/
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
