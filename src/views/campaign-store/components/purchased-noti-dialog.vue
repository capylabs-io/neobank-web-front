<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <v-dialog v-model="campaignStore.purchaseCampaignNoti" width="420px">
    <v-card class="border-radius-16 pa-6">
      <v-card-title class="pa-0 title--text card-title mb-4">
        Purchased Detail<v-spacer />
      </v-card-title>
      <v-card-text
        class="card-content mx-auto pa-0 mb-5"
        style="max-width: 450px"
      >
      </v-card-text>
      <v-card class="detail-purchased border-radius-8 pa-4">
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
        <v-row no-gutters class="mt-3">
          <v-col cols="4">
            <div class="font-weight-bold">Start Date:</div>
          </v-col>
          <v-col cols="8">
            <div>{{ campaignStore.detailCard.startDate | ddmmyyyy }}</div>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="4"><div class="font-weight-bold">End Date:</div> </v-col>
          <v-col cols="8"
            ><div>
              {{ campaignStore.detailCard.endDate | ddmmyyyy }}
            </div></v-col
          >
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="4">
            <div class="font-weight-bold">Category:</div>
          </v-col>
          <v-col cols="8">
            <div class="d-flex align-center">
              <v-img
                max-width="15px"
                max-height="15px"
                :src="getCategoryIcon"
                cover
                class="mr-2"
              ></v-img>
              {{ getCategoryName }}
            </div></v-col
          >
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col cols="4"> <div class="font-weight-bold">Price:</div> </v-col>
          <v-col cols="8">
            <div class="d-flex align-center">
              {{ campaignStore.detailCard.price }}
              <v-img
                class="ml-2 token-icon"
                max-height="15px"
                max-width="15px"
                :src="require(`@/assets/redeem/coin.webp`)"
                contain
              /></div
          ></v-col>
        </v-row>
      </v-card>
      <v-card-actions class="pa-0 mt-6">
        <v-btn
          color="primary"
          class="px-4 btn text-none border-radius-8"
          outlined
          dense
          @click="cancel"
        >
          Continue
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="px-4 btn text-none elevation-0 ml-4 border-radius-8"
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
import { userStore } from "@/stores/userStore";
import { campaignStore } from "@/views/campaign-store/stores/campaignStore";

export default {
  computed: {
    ...mapStores(campaignStore),
    ...mapStores(userStore),
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
        await this.userStore.fetchUserVoucher();
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
