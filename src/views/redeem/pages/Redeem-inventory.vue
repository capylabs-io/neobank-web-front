<template>
  <div class="d-flex flex-column">
    <div class="right-container mx-auto pa-6 full-height">
      <div class="d-flex justify-space-between button-filter">
        <!-- <div class="d-flex column-gap-10 left-filter-group pa-1">
          <v-btn class="clothes active" rounded text @click="clothesTab()">
            Clothes
          </v-btn>
          <v-btn class="voucher" rounded text @click="voucherTab()">
            Voucher
          </v-btn>
        </div> -->
        <div class="right-filter-group">
          <v-select
            class="btn-customize"
            v-model="voucherStore.sortBy"
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
      </div>
      <div class="full-width mt-6 card-container">
        <v-row>
          <v-col
            cols="12"
            xl="2"
            md="3"
            sm="6"
            xs="12"
            v-for="card in voucherStore.userVoucher"
            :key="card.id"
          >
            <inventoryCard :id="card.id" :cards="card" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="pagination">
      <v-pagination :length="3" light circle color="#5752e3" />
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
import inventoryCard from "@/views/redeem/components/inventory-card.vue";
export default {
  components: {
    inventoryCard: inventoryCard,
  },

  data() {
    return {};
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
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
  max-width: 1500px;
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
  z-index: 97;
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
