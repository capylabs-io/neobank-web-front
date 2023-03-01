<template>
  <div class="home mx-auto">
    <div
      v-if="windowWidth > 1280 || userStore.scrollY < 1070"
      class="doorway tag"
      :style="{
        backgroundImage: 'url(' + require(`@/assets/home/door.webp`) + ')',
      }"
    />

    <introduction />
    <div class="container DMSans mx-auto d-flex flex-column">
      <!-- <intro /> -->
      <firstsection />
      <secondSection />
      <thirdSection />
    </div>
  </div>
</template>

<script>
import firstSectionVue from "../components/first-section.vue";
import introductionVue from "../components/introduction.vue";
// import intro from "../components/intro-doorway.vue";
import secondsection from "../components/second-section.vue";
import thirdSectionVue from "../components/third-section.vue";
import { mapStores } from "pinia";
import { userStore } from "../../../stores/userStore";

export default {
  name: "HomeView",
  components: {
    introduction: introductionVue,
    firstsection: firstSectionVue,
    secondSection: secondsection,
    thirdSection: thirdSectionVue,
    // intro: intro,
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
      const introduction = document.querySelector(".introduction");
      const container = document.querySelector(".container");
      const scrollY = window.scrollY;
      this.scrollValue = scrollY;
      this.userStore.scrollY = scrollY;
      console.log(scrollY);

      if (this.userStore.scrollY >= 1105) {
        introduction.style.position = "relative";
        introduction.style.animation = " zoom-in-zoom-out 3s ease-out";
        container.style.animation = " zoom-out-zoom-in 3s ease-out";
        // introduction.style.top = "40vh";
        // introduction.style.left = "auto";
      } else {
        introduction.style.position = "fixed";
        // introduction.style.top = "45%";
        // introduction.style.left = "15%";
      }
      doorway.style.backgroundSize = 100 + scrollY / 7 + "%";
      doorway.style.opacity = 1 + scrollY / 6 + "";
    },
  },
};
</script>

<style lang="scss">
.home {
  overflow-x: hidden !important;
}
.doorway {
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 4;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.container {
  @media (min-width: 1920px) {
    width: 1560px;
  }

  overflow-x: hidden !important;
  row-gap: 150px;
  z-index: 2;
  padding-top: 400px;
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
@keyframes zoom-out-zoom-in {
  0% {
    transform: scale(1, 1);
    opacity: 0;
  }
  50% {
    transform: scale(1.25, 1.25);
    opacity: 0.5;
  }
  100% {
    transform: scale(1, 1);
    opacity: 1;
  }
}
@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(1.5, 1.5);
    opacity: 1;
  }
  50% {
    transform: scale(1.25, 1.25);
    opacity: 0.5;
  }
  100% {
    transform: scale(1, 1);
    opacity: 0;
  }
}
</style>
