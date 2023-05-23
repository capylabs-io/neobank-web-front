<template>
  <div class="d-flex flex-column justify-space-between full-height">
    <InventoryDetailDrawer />
    <div class="full-height">
      <div class="d-flex justify-space-between button-filter">
        <div class="d-flex left-filter-group d-flex align-center">
          <v-text-field
            v-model="userStore.searchKey"
            class="border-radius-6 search-select"
            placeholder="Search By Name"
            prepend-inner-icon="mdi-magnify"
            flat
            solo
            outlined
            dense
            hide-details
            clearable
          ></v-text-field>
        </div>

        <div class="right-filter-group gap-8 d-flex align-center">
          <!-- <v-autocomplete
            class="select border-radius-6"
            placeholder="Filter by Partner"
            v-model="userStore.filterPartner"
            :items="userStore.partners"
            item-text="brandName"
            item-value="id"
            return-object
            multiple
            flat
            solo
            dense
            outlined
            clearable
            hide-details
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{ item.brandName }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text text-caption">
                (+{{ userStore.filterPartner.length - 1 }} others)
              </span>
            </template>
          </v-autocomplete> -->
          <v-select
            v-model="userStore.filterCategory"
            :items="userStore.categories"
            item-text="name"
            item-value="id"
            class="select border-radius-6"
            placeholder="Filter by Category"
            return-object
            multiple
            flat
            solo
            dense
            outlined
            clearable
            hide-details
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{ item.name }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text text-caption">
                (+{{ userStore.filterCategory.length - 1 }} others)
              </span>
            </template>
          </v-select>

          <v-select
            class="select border-radius-6"
            label="SortBy"
            item-text="name"
            :items="sort"
            :menu-props="{ maxHeight: '400' }"
            @change="userStore.changeVoucherFilter($event)"
            flat
            solo
            outlined
            dense
            hide-details
          ></v-select>
        </div>
      </div>
      <div class="d-flex align-center mt-4">
        <div class="flex-grow-1 pr-4">
          <div class="text-sm font-weight-bold">Applied Filter:</div>
          <div class="d-flex gap-4 mt-1" v-if="userStore.filters.length > 0">
            <v-chip
              color="primary"
              v-for="(filter, index) in userStore.filters"
              :key="index"
              @click:close="userStore.removeFilter(filter)"
              label
              close
              >{{ filter.filterName }}
            </v-chip>
          </div>
          <div class="mt-1" v-else>
            <v-chip color="primary" label>All </v-chip>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <v-row v-if="userStore.slicedUserVoucher">
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
        <div
          v-if="userStore.slicedUserVoucher.length <= 0"
          class="pt-10 font-50"
        >
          Your inventory is empty!
        </div>
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
    await this.userStore.fetchCategories();
    await this.userStore.fetchPartners();
  },
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
      index: 1,
    };
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
  height: max-content;
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
.select {
  max-width: 280px;
}
.search-select {
  max-width: 450px;
}
</style>
