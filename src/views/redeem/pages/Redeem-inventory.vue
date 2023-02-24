<template>
  <div class="right d-flex flex-column align-center">
    <div class="mt-5 d-flex gap-45 card-container flex-wrap">
      <inventoryCard
        v-for="card in inventoryCards"
        :key="card"
        :cards="card"
      />
    </div>
    <div class="mt-3">
      <v-pagination
        :length="3"
        light
      />
    </div>
  </div>
</template>

<script>
import inventoryCard from "@/views/redeem/components/inventory-card.vue";
export default {
  components: {
    inventoryCard: inventoryCard,
  },
  data() {
    return {
      inventoryCards: [
        {
          image: require(`@/assets/redeem/card/cgv-card.webp`),
          icon: require(`@/assets/redeem/card/cgv-icon.webp`),
          price: "50",
          status: "Hot",
          title: "50.000đ voucher film ticket CGV",
          detailheader:
            "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
          firstDetail:
            "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
          secondDetail:
            " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
          isRedeem: false,
        },
        {
          image: require(`@/assets/redeem/card/viettel-card.webp`),
          icon: require(`@/assets/redeem/card/viettel-icon.webp`),
          price: "50",
          title: "50.000đ mobile top up Viettel",
          status: "New",
          detailheader:
            "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
          firstDetail:
            "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
          secondDetail:
            " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
          isRedeem: false,
        },
        {
          image: require(`@/assets/redeem/card/baemin-card.webp`),
          icon: require(`@/assets/redeem/card/baemin-icon.webp`),
          price: "100",
          title: "100.000đ voucher Baemin",
          status: "Expired",
          detailheader:
            "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
          firstDetail:
            "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
          secondDetail:
            " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
          isRedeem: false,
        },
        {
          image: require(`@/assets/redeem/card/viettel-card.webp`),
          icon: require(`@/assets/redeem/card/viettel-icon.webp`),
          price: "50",
          title: "10% off max 10k voucher ETC ",
          status: "Hot",
          detailheader:
            "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
          firstDetail:
            "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
          secondDetail:
            " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
          isRedeem: false,
        },
        {
          image: require(`@/assets/redeem/card/viettel-card.webp`),
          icon: require(`@/assets/redeem/card/viettel-icon.webp`),
          price: "50",
          title: "50.000đ mobile top up Viettel",
          status: "New",
          detailheader:
            "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
          firstDetail:
            "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
          secondDetail:
            " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
          isRedeem: true,
        },
        {
          image: require(`@/assets/redeem/card/viettel-card.webp`),
          icon: require(`@/assets/redeem/card/viettel-icon.webp`),
          price: "50",
          title: "50.000đ mobile top up Viettel",
          status: "Hot",
          detailheader:
            "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
          firstDetail:
            "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
          secondDetail:
            " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
          isRedeem: true,
        },
        {
          image: require(`@/assets/redeem/card/viettel-card.webp`),
          icon: require(`@/assets/redeem/card/viettel-icon.webp`),
          price: "50",
          title: "50.000đ mobile top up Viettel",
          status: "Expired",
          detailheader:
            "Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung tu 50k tren VParadise",
          firstDetail:
            "Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel porttitor malesuada amet velit vestibulum parturient habitasse. Nibh lobortis aliquam turpis commodo pellentesque scelerisque lectus. Vitae sollicitudin pellentesque sed pharetra in massa.",
          secondDetail:
            " Euismod ultrices gravida consequat semper in molestie lacinia eu risus. Lorem pulvinar habitant cursus tortor ut sed in felis. Donec mattis tincidunt maecenas et eu eget dui. Posuere velit viverra adipiscing ornare. Feugiat magna massa lorem sed ut. Eget lacus ultrices etiam dapibus. ",
          isRedeem: false,
        },
      ],
      index: 1,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.right {
  max-width: max-content;
  width: 85%;
  background: #f5f5f5;
  padding: 30px 100px;
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
.card-container {
  max-width: max-content;
}
</style>
