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
    <div v-for="(item, index) in sectionContent" :key="index">
      <slider :index="index" :visibleContent="visibleContent" :content="item">
        <div class="d-flex btn-group">
          <v-btn icon class="mr-3 arrow-btn" color="white" @click="prev()"
            ><v-icon small>mdi-arrow-left</v-icon></v-btn
          >
          <v-btn icon color="white" class="arrow-btn" @click="next()"
            ><v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
      </slider>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    slider: () => import("../landing/components/slider-content.vue"),
  },
  data() {
    return {
      visibleContent: 0,
      sectionContent: [
        {
          image: require(`@/assets/home/image4.webp`),
          content:
            "Simply put, VParadise is a bank. We are a community bank that does many of the things other banks do. Like – lend money, manage your deposits, offer online banking, and provide other financial services.",
          title: "What is VParadise",
        },
        {
          image: require(`@/assets/home/image2.webp`),
          content:
            "VParadise was created to serve 3 mains users including: Customers, Bank and their Partners. Each users will have different ways to interact with the system and gain benefits from it",
          title: "Who is using VParadise? ",
        },
        {
          image: require(`@/assets/home/image3.webp`),
          content:
            "VParadise is the first banking product on the market that create a 3D virtual world to enhance customers experience. Anyone can participate in this virtual world to explore and gain rewards for themselves ",
          title: "What makes it different?",
        },
      ],
    };
  },
  methods: {
    next() {
      if (this.visibleContent >= this.sectionContent.length - 1) {
        this.visibleContent = 0;
      } else {
        this.visibleContent++;
      }
    },

    prev() {
      if (this.visibleContent <= 0) {
        this.visibleContent = this.sectionContent.length - 1;
      } else {
        this.visibleContent--;
      }
    },
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
  background: rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
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
