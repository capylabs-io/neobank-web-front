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

</style>
>
