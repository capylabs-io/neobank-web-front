<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="d-flex flex-column justify-center align-center introduction"
    :style="{
      backgroundImage:
        'url(' + require(`@/assets/home/intro-background.webp`) + ')',
    }"
    data-aos="zoom-in"
    data-aos-delay="200"
    data-aos-duration="11000"
    data-aos-easing="ease-in-out"
  >
    <div
      class="introduction-content d-flex flex-column justify-center align-center row-gap-30"
      :style="{ width: '70%' }"
      data-aos-delay="200"
      data-aos-duration="11000"
      data-aos-easing="ease-in-out"
      data-aos="zoom-in"
    >
      <div
        class="text-center white--text text-dp-xxl font-weight-700"
        :style="{ width: '50%' }"
      >
        Welcome to VParadise
      </div>
      <div class="text-center white--text text-dp-xs" :style="{ width: '60%' }">
        Journey into the future of banking with VParadise, a harmony between
        technologies and banking
      </div>
      <v-btn color="lightblue" class="white--text pa-5">
        <div class="text-decoration-none text-sm">Discover now</div>
        <v-icon color="white"> mdi-arrow-right-thin </v-icon>
      </v-btn>
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
.introduction {
  position: fixed;
  width: 100%;
  height: 105vh;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 3;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

.introduction:before {
  content: "";
  background-image: linear-gradient(
    180deg,
    rgba(12, 14, 18, 0) 0%,
    #0c0e12 100%
  );
  transform: rotate(180deg);
  position: absolute;
  height: 160px;
  left: 0;
  top: 0;
  right: 0;
}
.introduction:after {
  content: "";
  background-image: linear-gradient(
    180deg,
    rgba(12, 14, 18, 0) 0%,
    #0c0e12 100%
  );
  position: absolute;
  height: 160px;
  left: 0;
  bottom: 0;
  right: 0;
}
/*
.introduction-content {
  position: fixed;
  top: 45%;
  left: 15%;
}*/
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  width: 47%;
  z-index: 2;
}
.rectangle {
  position: absolute;
  height: 560px;
  width: 400px;
  z-index: 1;
  background: #eafff4;
}
.introduction-image {
  background-position: cover;
  background-repeat: no-repeat;
  background-size: auto 100%;
  width: 53%;
}
.v-btn {
  max-width: 193px;
  height: 48px;
  border-radius: 40px;
}
.row-gap-30 {
  row-gap: 30px;
}
</style>
>
