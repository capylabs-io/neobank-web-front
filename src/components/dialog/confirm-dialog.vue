<template>
  <v-dialog v-model="campaignStore.cfDialog" width="420px">
    <v-card>
      <v-card-title>
        <span class="text-lg font-weight-bold">Confirm Purchase Voucher</span>
      </v-card-title>
      <v-card-text>
        <div>Do you want to purchase this voucher?</div>
      </v-card-text>
      <v-card-actions class="pb-4">
        <v-spacer />
        <v-btn
          class="text-btn"
          color="gray"
          @click="campaignStore.cfDialog = false"
          depressed
        >
          No
        </v-btn>
        <v-btn class="text-btn" color="primary" @click="buy" depressed>
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { campaignStore } from "@/views/redeem/components/campaign/stores/campaignStore";
import { userStore } from "@/stores/userStore";
import { inventoryStore } from "@/views/redeem/components/inventory/stores/inventoryStore";

export default {
  computed: {
    ...mapStores(campaignStore),
    ...mapStores(userStore),
    ...mapStores(inventoryStore),
  },

  methods: {
    async buy() {
      this.campaignStore.cfDialog = false;
      await this.campaignStore.purchaseVoucher();
      await this.userStore.fetchUserMetadata();
      await this.inventoryStore.fetchUserVoucher();
      await this.campaignStore.fetchVoucher();
    },
  },
};
</script>

<style lang="scss" scoped></style>
