<template>
  <div class="d-flex thirdsection justify-center align-center">
    <div class="left d-flex justify-center align-center">
      <div class="rectangle" data-aos="zoom-in-right"></div>
      <div
        class="first-section-image mx-auto"
        data-aos="zoom-in-right"
        :style="{
          backgroundImage: 'url(' + require(`@/assets/home/image3.webp`) + ')',
        }"
      ></div>
    </div>
    <div
      class="right d-flex flex-column justify-center align-center"
      data-aos="zoom-in-left"
    >
      <div class="d-flex flex-column row-gap-25" :style="{ width: '90%' }">
        <div class="black--text display-2 font-weight-bold content-title">
          Bank Anywhere
        </div>
        <div class="text-left black--text third-description">
          Download our Coastal Community Bank Mobile Banking App and access your
          accounts anytime. Take advantage of mobile deposit, funds transfer,
          and bill pay.
        </div>
        <!-- <div class="d-flex col-gap-8 logo-group">
          <div class="logo">
            <v-img :src="require(`@/assets/home/apple.webp`)"></v-img>
          </div>
          <div class="logo">
            <v-img :src="require(`@/assets/home/android.webp`)"></v-img>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rectangle: window.innerWidth - (window.innerWidth * 90) / 100,
    };
  },
};
</script>

<style lang="scss" scoped>
.thirdsection {
  height: max-content;
  padding-bottom: 100px;

  @media (max-width: 1280px) {
    height: max-content;
    flex-direction: column;
    row-gap: 30px;
    padding-bottom: 20px;
  }
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
.row-gap-25 {
  row-gap: 25px;
}
.col-gap-8 {
  column-gap: 8px;
}
.rectangle {
  position: absolute;
  height: 200px;
  width: 600px;
  z-index: 1;
  margin-left: 3%;
  margin-top: 15%;
  border-radius: 12px;
  background: #d8d7ff;
}
.logo {
  height: 48px;
  width: 164px;
}
.third-description {
  width: 80%;
  @media (max-width: 1280px) {
    width: 100% !important;
  }
}
</style>
