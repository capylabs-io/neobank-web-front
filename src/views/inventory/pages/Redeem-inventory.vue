<template>
  <div class="d-flex flex-column justify-space-between full-height">
    <InventoryDetailDrawer />
    <div>
      <!-- <div class="d-flex justify-space-between button-filter">
        <div class="d-flex column-gap-10 left-filter-group pa-1">
          <v-btn class="clothes active" rounded text @click="clothesTab()">
            Clothes
          </v-btn>
          <v-btn class="voucher" rounded text @click="voucherTab()">
            Voucher
          </v-btn>
        </div>
        <div class="right-filter-group">
          <v-select
            class="btn-customize"
            v-model="campaignStore.sortBy"
            label="SortBy"
            :items="sort"
            item-text="name"
            :menu-props="{ maxHeight: '400' }"
            solo
            dense
            flat
            hide-details
            persistent-hint
          ></v-select>
        </div>
      </div> -->
      <div class="">
        <v-row>
          <v-col
            cols="12"
            xl="3"
            md="4"
            sm="6"
            xs="12"
            v-for="card in userStore.slicedUserVoucher"
            :key="card.id"
          >
            <inventoryCard :id="card.id" :cards="card" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="pagination">
      <v-pagination
        v-model="userStore.userVoucherPage"
        :length="userStore.totalUserVoucherPerPage"
        light
        circle
        color="#5752e3"
      />
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
export default {
  components: {
    inventoryCard: () => import("../components/inventory-card.vue"),
    InventoryDetailDrawer: () =>
      import("../components/inventory-card-drawer.vue"),
  },
  async created() {
    await this.userStore.fetchUserVoucher();
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(userStore),
  },
  watch: {
    group() {
      this.drawer = false;
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
  height: 600px;
}
.button-filter {
}

.active {
  background: #f5f8ff;
  color: #2970ff;
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
</style>
