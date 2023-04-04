<template>
  <div
    class="d-flex flex-column firstSection mx-auto justify-center align-center"
  >
    <div class="white--text text-dp-lg text-center font-weight-700">
      Frequently asked questions
    </div>
    <div class="content">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item, i) in 5"
          :key="i"
          class="mt-4 expansion-panel"
        >
          <v-expansion-panel-header class="neutral40--text text-lg">
            How does VParadise work?
            <template v-slot:actions>
              <v-icon color="neutral40"> mdi-plus </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="neutral40--text text-lg text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="d-flex flex-column justify-center align-center question">
      <div class="text-md neutral40--text">
        Still have questions?
        <br />Get in touch with our team
      </div>
      <v-btn class="text-capitalize btn-contact mt-4 py-7 white--text text-lg"
        >Contact</v-btn
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
.expansion-panel {
  background-color: rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.content {
  width: 832px !important;
  margin-top: 64px;
}

.question {
  width: 400px;
  margin-top: 64px;
}
.btn-contact {
  width: 148px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.08) !important;
  border-radius: 6px;
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
</style>
