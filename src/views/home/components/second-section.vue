<template>
  <div class="d-flex secondsection justify-center align-center">
    <div
      class="right d-flex flex-column justify-center align-center"
      data-aos="fade-up-right"
    >
      <div class="d-flex flex-column row-gap-25" :style="{ width: '90%' }">
        <div class="black--text display-2 font-weight-bold content-title">
          A new Era is coming
        </div>
        <div class="text-left black--text">
          We have big plans for Coastal World! We want to empower good money
          habits, make banking easier to access, and have fun along the way.
          Banking doesn’t have to be boring.
        </div>
      </div>
    </div>
    <div class="left d-flex justify-center align-center">
      <div class="rectangle" data-aos="fade-up-left" />
      <div
        class="second-section-image mx-auto"
        data-aos="fade-up-left"
        :style="{
          backgroundImage: 'url(' + require(`@/assets/home/image2.webp`) + ')',
        }"
      />
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
.secondsection {
  height: max-content;
  @media (max-width: 1280px) {
    margin-top: 50px;
    flex-direction: column-reverse;
    height: max-content;
    padding-bottom: 20px;
    row-gap: 30px;
  }
}
.second-section-image {
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
.rectangle {
  height: 450px;
  width: 200px;
  margin-left: 24%;
  margin-bottom: 3%;
  border-radius: 12px;
  position: absolute;
  z-index: 1;
  background: #d8d7ff;
}
</style>
