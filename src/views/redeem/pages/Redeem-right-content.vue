<template>
  <div class="right d-flex flex-column">
    <div class="right-container">
      <div class="d-flex justify-space-between button-filter">
        <div class="d-flex column-gap-10">
          <v-btn elevation="3" rounded text @click="index = 1"> Clothes </v-btn>
          <v-btn elevation="3" rounded text @click="index = 2"> Voucher </v-btn>
        </div>
        <div class="d-flex column-gap-10">
          <v-btn elevation="3" rounded text> A-Z </v-btn>
          <v-btn class="d-flex" elevation="3" rounded text>
            <span> Price </span>
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
          <v-btn elevation="3" text>
            <span> Price </span> <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </div>
      </div>
      <div v-if="index == 2" class="d-flex flex-wrap gap-45 card-container">
        <voucherCard
          v-for="card in voucher"
          :key="card.id"
          :id="card.id"
          :cards="card"
        />
      </div>

      <div v-else class="d-flex flex-wrap gap-45 card-container">
        <clothesCard
          v-for="card in clothesCards"
          :key="card.id"
          :status="card"
        />
      </div>
      <div class="pagination" v-if="index == 2">
        <v-pagination
          v-model="userStore.voucherPage"
          :length="userStore.totalVoucherPage"
          light
        />
      </div>
    </div>
  </div>
</template>

<script>
import voucherCard from "@/views/redeem/components/voucher-card.vue";
import clothesCard from "@/views/redeem/components/clothes-card.vue";
import { userStore } from "@/stores/userStore";
import { mapStores } from "pinia";
export default {
  components: {
    voucherCard: voucherCard,
    clothesCard: clothesCard,
  },
  computed: {
    ...mapStores(userStore),
  },
  props: ["voucher", "userVoucher"],
  data() {
    return {
      clothesCards: [
        { index: 2 },
        { index: 1 },
        { index: 1 },
        { index: 2 },
        { index: 1 },
        { index: 2 },
        { index: 1 },
        { index: 1 },
        { index: 2 },
      ],
      // voucherCards: [
      //   {
      //     image: require(`@/assets/redeem/card/cgv-card.webp`),
      //     icon: require(`@/assets/redeem/card/cgv-icon.webp`),
      //     price: "50",
      //     status: "Hot",
      //     title: "50.000đ voucher film ticket CGV",
      //     detailheader:
      //       "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
      //     firstDetail:
      //       "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
      //     secondDetail:
      //       " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
      //   },
      //   {
      //     image: require(`@/assets/redeem/card/viettel-card.webp`),
      //     icon: require(`@/assets/redeem/card/viettel-icon.webp`),
      //     price: "50",
      //     title: "50.000đ mobile top up Viettel",
      //     status: "New",
      //     detailheader:
      //       "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
      //     firstDetail:
      //       "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
      //     secondDetail:
      //       " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
      //   },
      //   {
      //     image: require(`@/assets/redeem/card/baemin-card.webp`),
      //     icon: require(`@/assets/redeem/card/baemin-icon.webp`),
      //     price: "100",
      //     title: "100.000đ voucher Baemin",
      //     status: "Expired",
      //     detailheader:
      //       "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
      //     firstDetail:
      //       "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
      //     secondDetail:
      //       " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
      //   },
      //   {
      //     image: require(`@/assets/redeem/card/viettel-card.webp`),
      //     icon: require(`@/assets/redeem/card/viettel-icon.webp`),
      //     price: "50",
      //     title: "10% off max 10k voucher ETC ",
      //     status: "Hot",
      //     detailheader:
      //       "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
      //     firstDetail:
      //       "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
      //     secondDetail:
      //       " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
      //   },
      //   {
      //     image: require(`@/assets/redeem/card/viettel-card.webp`),
      //     icon: require(`@/assets/redeem/card/viettel-icon.webp`),
      //     price: "50",
      //     title: "50.000đ mobile top up Viettel",
      //     status: "New",
      //     detailheader:
      //       "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
      //     firstDetail:
      //       "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
      //     secondDetail:
      //       " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
      //   },
      //   {
      //     image: require(`@/assets/redeem/card/viettel-card.webp`),
      //     icon: require(`@/assets/redeem/card/viettel-icon.webp`),
      //     price: "50",
      //     title: "50.000đ mobile top up Viettel",
      //     status: "Hot",
      //     detailheader:
      //       "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
      //     firstDetail:
      //       "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
      //     secondDetail:
      //       " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
      //   },
      //   {
      //     image: require(`@/assets/redeem/card/viettel-card.webp`),
      //     icon: require(`@/assets/redeem/card/viettel-icon.webp`),
      //     price: "50",
      //     title: "50.000đ mobile top up Viettel",
      //     status: "Expired",
      //     detailheader:
      //       "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
      //     firstDetail:
      //       "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
      //     secondDetail:
      //       " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
      //   },
      // ],
      index: 1,
    };
  },
};
</script>
<style lang="scss" scoped>
.right {
  width: 85%;
  background: #f5f5f5;
  padding: 30px 100px;
  overflow-y: auto;
}
.column-gap-10 {
  column-gap: 10px;
}
.row-gap-3 {
  row-gap: 3px;
}
.row-gap-6 {
  row-gap: 6px;
}
.v-btn {
  border-radius: 8px;
  text-transform: capitalize;
}
.gap-45 {
  gap: 45px;
}
.left-profile-section {
  background: #f5f8ff;
  border-radius: 8px;
  padding: 8px, 16px, 8px, 16px;
}

.content {
  border-radius: 8px;
}
.content:hover {
  background: #f5f8ff;
  .v-icon {
    color: #2970ff;
  }
}
.right-container {
}
.card-container {
  margin-top: 45px;
  margin-bottom: 45px;
  height: 400px;
}
.button-filter {
}
.pagination {
  position: absolute;
  margin-top: 200px;
  z-index: 99;
}
</style>
