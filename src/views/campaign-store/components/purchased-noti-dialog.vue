<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <v-dialog v-model="campaignStore.purchaseCampaignNoti" width="420px">
    <v-card class="pa-6">
      <v-card-title class="pa-0 title--text card-title mb-4">
        Purchased Detail<v-spacer />
      </v-card-title>
      <v-card-text
        class="card-content mx-auto pa-0 mb-5"
        style="max-width: 450px"
      >
      </v-card-text>
      <v-card class="detail-purchased">
        <div class="top-content" style="white-space: pre-line">
          <div class="neutral30-border border-radius-16 overflow-hidden">
            <v-img
              class="noti-image"
              :src="campaignStore.detailCard.thumbnailUrl"
            >
            </v-img>
          </div>
        </div>
        <div class="mt-2 mid-content text-center text-lg font-weight-bold">
          {{ campaignStore.detailCard.title }}
        </div>
        <div class="mt-2 bottom-content">
          <div>
            StartDate: {{ campaignStore.detailCard.startDate | ddmmyyyy }}
          </div>
          <br />
          <div>EndDate: {{ campaignStore.detailCard.endDate | ddmmyyyy }}</div>
          <br />

          <div class="d-flex align-center">
            <div>Category:</div>
            <div class="d-flex align-center ml-1">
              <v-img
                width="23"
                height="23"
                :src="getCategoryIcon"
                cover
                class="mr-2"
              ></v-img>
              {{ getCategoryName }}
            </div>
          </div>

          <br />
          <div class="d-flex align-center">
            <div>Price:</div>
            <div class="d-flex align-center ml-1">
              {{ campaignStore.detailCard.price }}
              <v-img
                class="token-icon ml-2"
                max-height="15px"
                max-width="15px"
                :src="require(`@/assets/redeem/coin.webp`)"
                contain
              />
            </div>
          </div>
        </div>
      </v-card>
      <v-card-actions class="pa-0 mt-4">
        <v-btn
          color="primary"
          class="px-6 btn text-none"
          outlined
          dense
          @click="cancel"
        >
          Continue
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="px-6 btn text-none elevation-0 ml-4"
          dense
          @click="done"
        >
          To Inventory
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { get } from "lodash";
import moment from "moment";
import { mapStores } from "pinia";
import { campaignStore } from "@/views/redeem/components/campaign/stores/campaignStore";
import { userStore } from "@/stores/userStore";
import { inventoryStore } from "@/views/redeem/components/inventory/stores/inventoryStore";

export default {
  computed: {
    ...mapStores(campaignStore),
    ...mapStores(userStore),
    ...mapStores(inventoryStore),
    getCategoryIcon() {
      return get(
        this.campaignStore.detailCard,
        "campaignCategory.iconUrl",
        require("@/assets/views/category/category-icon-example.png")
      );
    },
    getCategoryName() {
      return get(
        this.campaignStore.detailCard,
        "campaignCategory.name",
        "Category Name"
      );
    },
  },
  data() {
    return {
      dialog: this.$dialog.confirmData,
    };
  },
  methods: {
    done() {
      this.campaignStore.purchaseCampaignNoti = false;
      this.$router.push("/inventory");
    },
    async cancel() {
      try {
        await this.campaignStore.fetchVoucher();
        await this.inventoryStore.fetchUserVoucher();
        await this.userStore.fetchUserMetadata();
        await this.campaignStore.checkIncludes();
        this.campaignStore.purchaseCampaignNoti = false;
      } catch (error) {
        this.$alert.error("Error occured! Error: " + error);
      } finally {
        this.$loading.hide();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
.card-content {
  text-align: justify !important;
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 14px !important;
  line-height: 20px;
  color: #3e3e3c !important;
}
.btn {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px !important;
  line-height: 20px;
}
.detail-purchased {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #e3e8ef;
}
.noti-image {
  height: 168px;
}
</style>
