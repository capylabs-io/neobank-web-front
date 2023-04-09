<template>
  <div
    class="d-flex flex-column firstSection mx-auto justify-center align-center"
  >
    <div class="white--text text-dp-lg text-center font-weight-700">
      VParadise Features
    </div>
    <div class="neutral40--text text-xl text-center font-weight-400">
      Say hello to a new metaverse wolrd.
    </div>
    <div class="d-flex justify-center align-center">
      <v-row>
        <v-col cols="4">
          <v-card class="pa-3 info-card"
            ><div class="full-width">
              <v-img
                class="image-card"
                :src="require(`@/assets/home/image1.webp`)"
              >
              </v-img>
            </div>
            <div
              class="mt-8 d-flex flex-column justify-center align-center text-center white--text"
            >
              <span class="text-dp-xs font-weight-500">3D Immersive World</span>
              <span class="text-md font-weight-400 mt-2"
                >An open virtual world that allow customers to freely explore
                and interact with not just the NPC but also other
                customers</span
              >
            </div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="pa-3 info-card"
            ><div class="full-width">
              <v-img
                class="image-card"
                :src="require(`@/assets/home/image2.webp`)"
              >
              </v-img>
            </div>
            <div
              class="mt-8 d-flex flex-column justify-center align-center white--text text-center"
            >
              <span class="text-dp-xs font-weight-500">Real-life Rewards</span>
              <span class="text-md font-weight-400 mt-2"
                >VParadise is an omni channel that allows Vietinbank’s customers
                to gain and manage benefits not from just the bank but also its
                partners</span
              >
            </div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="pa-3 info-card"
            ><div class="full-width">
              <v-img
                class="image-card"
                :src="require(`@/assets/home/image3.webp`)"
              >
              </v-img>
            </div>
            <div
              class="mt-8 d-flex flex-column justify-center align-center white--text text-center"
            >
              <span class="text-dp-xs font-weight-500"
                >Professional & Supportive</span
              >
              <span class="text-md font-weight-400 mt-2"
                >While being build as an open world, VParadise aim is to provide
                customers with fundamental banking services anytime,
                anywhere</span
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
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
.info-card {
  background: rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
}
.v-card {
  width: 400px;
  height: 440px;
  margin-top: 64px;
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
.image-card {
  background: rgba(255, 255, 255, 0.1);
  height: 240px;
  border-radius: 16px !important;
}
</style>
