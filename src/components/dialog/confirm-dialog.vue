<template>
  <v-dialog v-model="voucherStore.cfDialog" width="420px">
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
          @click="voucherStore.cfDialog = false"
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
import { voucherStore } from "@/stores/voucherStore";
import { userStore } from "@/stores/userStore";
import { inventoryStore } from "@/stores/inventoryStore";

export default {
  computed: {
    ...mapStores(voucherStore),
    ...mapStores(userStore),
    ...mapStores(inventoryStore),
  },

  methods: {
    async buy() {
      this.voucherStore.cfDialog = false;
      await this.voucherStore.purchaseVoucher();
      await this.userStore.fetchUserMetadata();
      await this.inventoryStore.fetchUserVoucher();
      await this.voucherStore.fetchVoucher();
    },
  },
};
</script>

<style lang="scss" scoped></style>
