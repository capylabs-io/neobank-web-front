<template>
  <div class="d-flex firstSection justify-center align-center mt-2">
    <div class="left d-flex justify-center align-center">
      <div class="rectangle" data-aos="fade-right"></div>
      <div
        class="first-section-image mx-auto"
        data-aos="fade-right"
        data-aos-delay="50"
        :style="{
          backgroundImage: 'url(' + require(`@/assets/home/image4.webp`) + ')',
        }"
      ></div>
    </div>
    <div
      class="right d-flex flex-column justify-center align-center"
      data-aos="fade-left"
    >
      <div class="d-flex flex-column row-gap-25" :style="{ width: '90%' }">
        <div class="black--text display-2 font-weight-bold content-title">
          What is VParadise?
        </div>
        <div class="text-left black--text">
          Simply put, Coastal is a bank. We are a community bank that does many
          of the things other banks do. Like – lend money, manage your deposits,
          offer online banking, and provide other financial services. However,
          there are differences. We are rooted in community, bold enough to try
          new things, and truly care about people.
        </div>
        <div class="text-left black--text">
          That is why, when we had the opportunity to grow our community and
          help MORE people, we jumped on the chance to do so. Several years ago,
          we began offering Banking as a Service (BaaS) to Fintechs on a mission
          to make banking easier and more accessible.
        </div>
        <div class="text-left black--text">
          So what is BaaS, you ask? It is simple. We provide banking
          infrastructure, compliance oversight, years of industry experience,
          and Member FDIC insurance so our Fintech partners can now deliver you
          – the customer – customized banking solutions that fit your lifestyle
          or specific financial situation. Everybody wins.
        </div>
      </div>
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
  height: 700px;
  @media (max-width: 1280px) {
    margin-top: 70px;
    height: max-content;
    flex-direction: column;
    row-gap: 30px;
    padding-bottom: 50px;
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
.rectangle {
  position: absolute;
  margin-left: 24%;
  margin-bottom: 3%;
  height: 450px;
  width: 200px;
  border-radius: 12px;
  z-index: 1;
  background: #d8d7ff;
}
</style>
