<template>
  <div class="d-flex flex-column">
    <div class="right-container mx-auto pa-6 full-height">
      <div class="d-flex justify-space-between button-filter">
        <div class="d-flex column-gap-10">
          <v-btn
            class="clothes active"
            elevation="3"
            rounded
            text
            @click="clothesTab()"
          >
            Clothes
          </v-btn>
          <v-btn
            class="voucher"
            elevation="3"
            rounded
            text
            @click="voucherTab()"
          >
            Voucher
          </v-btn>
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
      <div class="full-width mt-6 card-container">
        <v-row>
          <v-col
            cols="12"
            xl="2"
            md="3"
            sm="6"
            xs="12"
            v-for="card in userStore.userVoucher"
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
  background: #5752e3;
  color: white;
}
.pagination {
  z-index: 97;
}
</style>
