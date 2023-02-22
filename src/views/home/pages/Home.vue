<template>
  <div class="home mx-auto">
    <div
      v-if="windowWidth > 1280"
      class="doorway tag"
      :style="{
        backgroundImage: 'url(' + require(`@/assets/home/door.webp`) + ')',
      }"
    ></div>

    <div class="container DMSans mx-auto d-flex flex-column">
      <intro></intro>
      <introduction></introduction>
      <firstsection></firstsection>
      <secondSection></secondSection>
      <thirdSection></thirdSection>
    </div>
  </div>
</template>

<script>
import firstSectionVue from "../components/first-section.vue";
import introductionVue from "../components/introduction.vue";
import intro from "../components/intro-doorway.vue";
import secondsection from "../components/second-section.vue";
import thirdSectionVue from "../components/third-section.vue";
import { mapStores } from "pinia";
import { userStore } from "../../stores/userStore";

export default {
  name: "HomeView",
  components: {
    introduction: introductionVue,
    firstsection: firstSectionVue,
    secondSection: secondsection,
    thirdSection: thirdSectionVue,
    intro: intro,
  },
  computed: {
    ...mapStores(userStore),
  },
  data() {
    return {
      index: 1,
      scrollValue: 0,
      windowWidth: window.innerWidth,
    };
  },
  mounted: {},
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.change();
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    change() {
      this.userStore.pageIndex = 1;
    },
    handleScroll() {
      const doorway = document.querySelector(".doorway");
      const scrollY = window.scrollY;
      this.scrollValue = scrollY;
      const introDoorway = document.querySelector(".intro-doorway");
      console.log(scrollY);
      if (scrollY > 0 && scrollY > 400) {
        introDoorway.style.opacity = "0.6";
        introDoorway.className += ".visible";
      } else {
        introDoorway.style.opacity = "1";
      }
      doorway.style.backgroundSize = 100 + scrollY / 7 + "%";
      doorway.style.opacity = 1 + scrollY / 6 + "";
      // const maxBackgroundSize = 120;
      // const backgroundSize = scrollY / (maxBackgroundSize - 100); // increases as user scrolls
      // doorway.style.transform =
      //   "scale(" + (100 + backgroundSize * 1) / 100 + ")";
    },
  },
};
</script>

<style lang="scss">
.home {
  overflow-x: hidden !important;
  @media (min-width: 1920px) {
    width: 1560px;
  }
}
.doorway {
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.container {
  overflow-x: hidden !important;
  row-gap: 150px;
  z-index: 2;
  padding-bottom: 100px;
}

.tag {
  opacity: 1;
}
.tag.visible {
  opacity: 0;
  transition: all 1s;
}
@media (max-width: 1280px) {
  .rectangle {
    display: none !important;
  }
}
.content-title {
  text-align: left;
  @media (max-width: 1280px) {
    text-align: center !important;
  }
}
.logo-group {
  @media (max-width: 1280px) {
    margin: 0 auto;
  }
}
</style>
