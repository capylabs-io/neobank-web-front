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
    <div class="d-flex justify-center align-center">
      <v-row>
        <v-col cols="4">
          <v-card class="pa-3"
            ><div class="image-card full-width"></div>
            <div
              class="mt-8 d-flex flex-column justify-center align-center white--text"
            >
              <span class="text-dp-xs font-weight-500">Lorem ipsum</span>
              <span class="text-md font-weight-400 mt-2"
                >Lorem ipsum dolor sit amet consectetur. Ut egestas aliquet enim
                cursus turpis odio blandit hendrerit. Eget nunc integer faucibus
                purus</span
              >
            </div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="pa-3"
            ><div class="image-card full-width"></div>
            <div
              class="mt-8 d-flex flex-column justify-center align-center white--text"
            >
              <span class="text-dp-xs font-weight-500">Lorem ipsum</span>
              <span class="text-md font-weight-400 mt-2"
                >Lorem ipsum dolor sit amet consectetur. Ut egestas aliquet enim
                cursus turpis odio blandit hendrerit. Eget nunc integer faucibus
                purus</span
              >
            </div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="pa-3"
            ><div class="image-card full-width"></div>
            <div
              class="mt-8 d-flex flex-column justify-center align-center white--text"
            >
              <span class="text-dp-xs font-weight-500">Lorem ipsum</span>
              <span class="text-md font-weight-400 mt-2"
                >Lorem ipsum dolor sit amet consectetur. Ut egestas aliquet enim
                cursus turpis odio blandit hendrerit. Eget nunc integer faucibus
                purus</span
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
.v-card {
  width: 400px;
  height: 440px;
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
.image-card {
  background: rgba(255, 255, 255, 0.1);
  height: 240px;
}
</style>
