<template>
  <div class="d-flex flex-column justify-space-between full-height">
    <PurchasedCampaignNoti />
    <CardDetailDrawer />
    <div class="full-height">
      <div class="d-flex justify-space-between button-filter">
        <div class="d-flex column-gap-10 left-filter-group pa-1">
          <v-btn class="voucher active" rounded text @click="voucherTab()">
            Voucher
          </v-btn>
          <v-btn class="clothes" rounded text @click="clothesTab()">
            In-game Items
          </v-btn>
        </div>

        <div class="right-filter-group">
          <v-select
            class="btn-customize"
            label="SortBy"
            item-text="name"
            :items="sort"
            :menu-props="{ maxHeight: '400' }"
            @change="campaignStore.changeVoucherFilter($event)"
            solo
            dense
            flat
            hide-details
            persistent-hint
          ></v-select>
        </div>
      </div>
      <div v-if="index == 1" class="full-width mt-6 card-container">
        <!-- TODO: use vue-responsive-components to make right container responsive better -->
        <v-row>
          <v-col
            cols="12"
            md="3"
            v-for="card in campaignStore.slicedVoucherStore"
            :key="card.id"
          >
            <CampaignCard
              :campaign="card"
              :isPurchased="campaignStore.voucherPurchased.includes(card.id)"
            />
          </v-col>
        </v-row>
      </div>

      <div v-if="index == 2" class="mt-6 full-width">
        <v-row>
          <!-- TODO: use vue-responsive-components to make right container responsive better -->
          <v-col
            cols="12"
            xl="2"
            md="3"
            sm="6"
            v-for="card in clothesCards"
            :key="card.id"
          >
            <clothesCard :status="card" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="pagination mt-5">
      <v-pagination
        v-model="campaignStore.voucherPage"
        :length="campaignStore.totalVoucherPage"
        light
        circle
        color="#5752e3"
      />
    </div>
  </div>
</template>

<script>
import clothesCard from "@/views/redeem/components/campaign/clothes-card.vue";
import { userStore } from "@/stores/userStore";
import { campaignStore } from "@/views/redeem/components/campaign/stores/campaignStore";
import { inventoryStore } from "@/views/redeem/components/inventory/stores/inventoryStore";
import { mapStores } from "pinia";

export default {
  props: ["voucher", "userVoucher"],
  components: {
    // voucherCard: voucherCard,
    clothesCard: clothesCard,
    CampaignCard: () => import("../components/campaign-card.vue"),
    CardDetailDrawer: () => import("../components/card-detail-drawer.vue"),
    PurchasedCampaignNoti: () =>
      import("../components/purchased-noti-dialog.vue"),
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(campaignStore),
    ...mapStores(inventoryStore),
  },
  created() {},
  data() {
    return {
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
          name: "Price-Up",
        },
        {
          value: "priceDown",
          name: "Price-Down",
        },
        {
          value: "newest",
          name: "Newest",
        },
        {
          value: "oldest",
          name: "Oldest",
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

      index: 0,
    };
  },
  async created() {
    if (this.userStore.jwt) {
      this.index = 1;
    } else {
      this.index = 2;
    }
    await this.campaignStore.fetchVoucher();
    await this.inventoryStore.fetchUserVoucher();
    await this.campaignStore.checkIncludes();
  },
  methods: {
    clothesTab() {
      this.index = 2;
      const clothes = document.querySelector(".clothes");
      const voucher = document.querySelector(".voucher");
      clothes.classList.add("active");
      voucher.classList.remove("active");
    },
    voucherTab() {
      this.index = 1;
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
  width: 1500px;
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
  z-index: 4;
}
.left-filter-group {
  background-color: white;
  height: max-content;
  border-radius: 12px;
}
.right-filter-group {
  width: max-content;
}
.btn-customize {
  background: white;
  border-radius: 8px;
  border: 1px solid #e3e8ef;
  height: max-content;
}
.v-select {
  padding: 0;
  margin: 0;
}
</style>
