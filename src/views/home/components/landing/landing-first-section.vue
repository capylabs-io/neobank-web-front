<template>
  <div
    class="d-flex flex-column firstSection mx-auto justify-center align-center"
  >
    <div class="white--text text-dp-lg text-center font-weight-700">
      What is VParadise?
    </div>
    <div class="neutral40--text text-xl text-center font-weight-400">
      Say hello to a new metaverse wolrd.
    </div>
    <v-card
      class="d-flex mx-auto col-gap-28 justify-center align-center section-card pa-8"
    >
      <div
        class="right d-flex flex-column justify-center align-center row-gap-25"
        data-aos="fade-left"
      >
        <div class="rocket-icon mx-auto pa-4">
          <v-icon large color="white">mdi-rocket-launch</v-icon>
        </div>
        <div class="white--text text-dp-sm text-center font-weight-700">
          What is VParadise?
        </div>
        <div class="text-left text-md white--text font-weight-400">
          Simply put, VParadise is a bank. We are a community bank that does
          many of the things other banks do. Like – lend money, manage your
          deposits, offer online banking, and provide other financial services.
          However, there are differences. We are rooted in community, bold
          enough to try new things, and truly care about people.
        </div>
        <div class="d-flex btn-group">
          <v-btn icon class="mr-3 arrow-btn" color="white"
            ><v-icon small>mdi-arrow-left</v-icon></v-btn
          >
          <v-btn icon color="white" class="arrow-btn"
            ><v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
      </div>
      <div class="left d-flex justify-center align-center">
        <div
          class="first-section-image mx-auto"
          data-aos="fade-right"
          data-aos-delay="50"
          :style="{
            backgroundImage:
              'url(' + require(`@/assets/home/image4.webp`) + ')',
          }"
        />
      </div>
    </v-card>
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
.firstSection {
  height: max-content;
  width: 1290px;
  @media (max-width: 1280px) {
    margin-top: 70px;
    height: max-content;
    flex-direction: column;
    row-gap: 30px;
    padding-bottom: 50px;
  }
}
.section-card {
  margin-top: 64px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
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
