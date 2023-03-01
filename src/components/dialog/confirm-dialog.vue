<template>
  <v-dialog v-model="userStore.cfDialog" width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Do you want to purchase this voucher?</span>
      </v-card-title>
      <v-card-text />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="green-darken-1"
          variant="text"
          @click="userStore.cfDialog = false"
        >
          No
        </v-btn>
        <v-btn color="green-darken-1" variant="text" @click="buy"> Yes </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    buy() {
      this.userStore.cfDialog = false;
      this.userStore.purchaseVoucher();
      this.$router.push("/vn/redeem");
    },
  },
};
</script>

<style lang="scss" scoped></style>
