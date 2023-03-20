<template>
  <div class="d-flex flex-column justify-space-between">
    <div class="right-container mx-auto pa-6 full-height">
      <div class="d-flex justify-space-between button-filter">
        <div class="d-flex column-gap-10 left-filter-group pa-1">
          <v-btn class="clothes active" rounded text @click="clothesTab()">
            Clothes
          </v-btn>
          <v-btn class="voucher" rounded text @click="voucherTab()">
            Voucher
          </v-btn>
        </div>
        <div class="right-filter-group pa-2">
          <!-- <v-card class="d-flex text-left px-3 right-filter-group">
            <div class="d-flex flex-column">
              <span class="overline">SORT BY</span>
              <span class="text-small">--Select One--</span>
            </div>
            <v-icon>mdi-chevron-down</v-icon>
          </v-card> -->
          <div class="text-left">SORT BY: {{ userStore.sortBy }}</div>
          <v-select
            v-model="userStore.sortBy"
            class="filter mt-2"
            :items="sort"
            item-text="name"
            label="---Select One---"
            outlined
          ></v-select>
        </div>
      </div>
      <div v-if="index == 2" class="full-width mt-6 card-container">
        <!-- TODO: use vue-responsive-components to make right container responsive better -->
        <v-row>
          <v-col
            cols="12"
            xl="3"
            md="3"
            sm="6"
            xs="12"
            v-for="card in voucher"
            :key="card.id"
          >
            <voucherCard :id="card.id" :cards="card" />
          </v-col>
        </v-row>
      </div>

      <div v-else class="mt-6 full-width">
        <v-row>
          <!-- TODO: use vue-responsive-components to make right container responsive better -->
          <v-col
            cols="12"
            xl="2"
            md="3"
            sm="6"
            xs="12"
            v-for="card in clothesCards"
            :key="card.id"
          >
            <clothesCard :status="card" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="pagination">
      <v-pagination
        v-model="userStore.voucherPage"
        :length="userStore.totalVoucherPage"
        light
        circle
        color="#5752e3"
      />
    </div>
  </div>
</template>

<script>
import voucherCard from "@/views/redeem/components/voucher-card.vue";
import clothesCard from "@/views/redeem/components/clothes-card.vue";
import { userStore } from "@/stores/userStore";
import { mapStores } from "pinia";
export default {
  props: ["voucher", "userVoucher"],
  components: {
    voucherCard: voucherCard,
    clothesCard: clothesCard,
  },
  computed: {
    ...mapStores(userStore),
  },
  mounted() {
    console.log("voucher", this.voucher);
  },
  data() {
    return {
      // sort: ["Name(A-Z)", "Name(Z-A)", "Price Up", "Price Down"],
      sort: [
        {
          value: "asc",
          name: "Name(A-Z)",
        },
        {
          value: "desc",
          name: "Name(Z-A)",
        },
        {
          value: "priceUp",
          name: "Price Up",
        },
        {
          value: "priceDown",
          name: "Price Down",
        },
      ],
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

      index: 1,
    };
  },
  methods: {
    clothesTab() {
      this.index = 1;
      const clothes = document.querySelector(".clothes");
      const voucher = document.querySelector(".voucher");
      clothes.classList.add("active");
      voucher.classList.remove("active");
    },
    voucherTab() {
      this.index = 2;
      const clothes = document.querySelector(".clothes");
      const voucher = document.querySelector(".voucher");
      clothes.classList.remove("active");
      voucher.classList.add("active");
    },
  },
};
</script>
<style lang="scss" scoped>
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
  max-width: 1500px;
}
.card-container {
  height: max-content;
}
.button-filter {
}

.active {
  background: #f5f8ff;
  color: #2970ff;
  font-weight: bold;
}
.pagination {
  z-index: 97;
}
.left-filter-group {
  background-color: white;
  height: max-content;
  border-radius: 12px;
}
.right-filter-group {
  width: max-content;
  background-color: white;
  border-radius: 12px;
}
.v-select {
  padding: 0;
  margin: 0;
}
</style>
