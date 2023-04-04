<template>
  <div class="home mx-auto">
    <div
      v-if="windowWidth > 1280 || homeStore.scrollY < 1070"
      class="doorway tag"
      :style="{
        backgroundImage: 'url(' + require(`@/assets/home/door.webp`) + ')',
      }"
    />

    <introduction />
    <div class="container DMSans mx-auto d-flex flex-column">
      <firstsection />
      <secondSection />
      <thirdSection />
    </div>
  </div>
</template>

<script>
import firstSectionVue from "../components/first-section.vue";
import introductionVue from "../components/introduction.vue";
import secondsection from "../components/second-section.vue";
import thirdSectionVue from "../components/third-section.vue";
import { mapStores } from "pinia";
import { homeStore } from "@/views/home/store/homeStore";
import { voucherStore } from "../../../stores/voucherStore";

export default {
  name: "HomeView",
  components: {
    introduction: introductionVue,
    firstsection: firstSectionVue,
    secondSection: secondsection,
    thirdSection: thirdSectionVue,
  },
  computed: {
    ...mapStores(voucherStore),
    ...mapStores(homeStore),
  },
  data() {
    return {
      index: 1,
      scrollValue: 0,
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.change();
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    change() {
      this.voucherStore.pageIndex = 1;
    },
    handleScroll() {
      const doorway = document.querySelector(".doorway");
      const introduction = document.querySelector(".introduction");
      const container = document.querySelector(".container");
      const scrollY = window.scrollY;
      this.scrollValue = scrollY;
      this.homeStore.scrollY = scrollY;
      console.log(scrollY);

      if (this.homeStore.scrollY >= 1105) {
        introduction.style.position = "relative";
        introduction.style.animation = " zoom-in-zoom-out 2s ease-out";
        container.style.animation = " zoom-out-zoom-in 2s ease-out";
      } else {
        introduction.style.position = "fixed";
        container.style.animation = " zoom-in-zoom-out 2s ease-out";
        introduction.style.animation = " zoom-out-zoom-in 2s ease-out";
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
    transform: scale(1.1, 1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1, 1);
    opacity: 1;
  }
}
@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(1.15, 1.15);
    opacity: 1;
  }
  50% {
    transform: scale(1.1, 1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1, 1);
    opacity: 0;
  }
}
</style>
