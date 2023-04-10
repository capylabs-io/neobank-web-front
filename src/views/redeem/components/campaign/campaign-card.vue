<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="campaign-card pa-3 border-radius-16 cursor-pointer full-height d-flex flex-column"
      :class="{ 'campaign-card-hover': isHovering }"
      @click="showDetail"
      elevation="0"
      v-bind="props"
    >
      <div>
        <div>
          <v-img
            class="campaign-card-img border-radius-8 elevation-1"
            :src="campaign.thumbnailUrl"
            cover
          >
            <div
              class="card-status white--text font-weight-bold text-capitalize elevation-2 px-2"
              :style="'background:' + getStatusColor"
            >
              {{ getStatusTitle }}
            </div>
          </v-img>
        </div>
        <div class="card-title mt-3 d-flex flex-column justify-center">
          <div class="textlg text-center text-capitalize font-weight-bold">
            {{ campaign.title }}
          </div>
        </div>
      </div>

      <div class="flex-grow-1 mt-2">
        <div>
          <div class="d-flex align-center">
            <div class="text-sm neutral70--text">Quantity</div>
            <v-spacer></v-spacer>
            <div class="text-md font-weight-bold">
              {{ campaign.purchasedQuantity || 0 }}/{{
                campaign.totalQuantity || 0
              }}
            </div>
          </div>
          <v-progress-linear
            class="mt-1"
            color="primary40"
            background-color="neutral30"
            height="8"
            :value="progress"
            rounded
          ></v-progress-linear>
        </div>
        <v-row class="mt-1">
          <v-col cols="12" md="6" xs="12">
            <div class="d-flex align-center">
              <v-icon small> mdi-account-outline</v-icon>
              <span class="neutral70--text text-sm ml-1">Publisher</span>
            </div>
            <div class="text-sm font-weight-bold">
              {{ getPublisher }}
            </div>
          </v-col>
          <v-col cols="12" md="6" xs="12">
            <div class="d-flex align-center">
              <span class="neutral70--text text-sm ml-1">Category</span>
            </div>
            <div class="d-flex align-center">
              <v-img
                max-width="16"
                max-height="16"
                :src="getCategoryIcon"
                cover
              ></v-img>
              <div class="text-sm font-weight-bold ml-1">
                {{ getCategoryName }}
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col cols="12" md="6" xs="12">
            <div class="d-flex align-center">
              <v-icon small> mdi-calendar-outline</v-icon>
              <span class="neutral70--text text-sm ml-1">Start date</span>
            </div>
            <div class="text-sm font-weight-bold">
              {{ campaign.startDate | ddmmyyyy }}
            </div>
          </v-col>
          <v-col cols="12" md="6" xs="12">
            <div class="d-flex align-center">
              <v-icon small> mdi-calendar-outline</v-icon>
              <span class="neutral70--text text-sm ml-1">End date</span>
            </div>
            <div class="text-sm font-weight-bold">
              {{ campaign.endDate | ddmmyyyy }}
            </div>
          </v-col>
        </v-row>
      </div>

      <div>
        <v-btn
          class="d-flex align-center mt-6 justify-center mx-auto border-radius-6"
          color="primary"
          :disabled="
            campaign.status == 'expired' ||
            campaign.purchasedQuantity == campaign.totalQuantity ||
            !canPurchase
          "
          @click.stop="buyClicked"
          v-if="!isPurchased"
          depressed
        >
          <v-img
            class="token-icon"
            max-height="15px"
            max-width="15px"
            :src="require(`@/assets/redeem/coin.webp`)"
            contain
          />
          <div
            class="text-capitalize font-weight-bold text-md text-center ml-1"
          >
            {{ campaign.price || 0 }}
          </div>
        </v-btn>
        <div class="text-center mt-6" v-else>
          <v-btn
            class="text-none text-btn success--text border-radius-8"
            color="green10"
            depressed
          >
            <v-icon class="mr-1" color="success">mdi-check</v-icon>
            Purchased
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import CampaignHelper from "@/helpers/campaign-helper";
import { get } from "lodash";
import moment from "moment";
import { userStore } from "@/stores/userStore";
import { campaignStore } from "@/views/redeem/components/campaign/stores/campaignStore";
import { inventoryStore } from "@/views/redeem/components/inventory/stores/inventoryStore";
import { mapStores } from "pinia";

export default {
  props: {
    campaign: {
      type: Object,
      default: null,
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(campaignStore),
    ...mapStores(inventoryStore),
    canPurchase() {
      const currentPrice = get(this.campaign, "price", 0);
      const currentToken = get(
        this.userStore,
        "userData.userMetadata.token",
        0
      );
      return currentToken >= currentPrice;
    },
    progress() {
      if (
        !this.campaign ||
        !this.campaign.totalQuantity ||
        this.campaign.totalQuantity == 0
      )
        return 0;
      return (
        (get(this.campaign, "purchasedQuantity", 0) /
          this.campaign.totalQuantity) *
        100
      );
    },
    getStatusColor() {
      return CampaignHelper.statusColor(this.campaign);
    },
    getStatusTitle() {
      return CampaignHelper.statusTitle(this.campaign.status);
    },
    getPublisher() {
      return get(this.campaign, "partner.brandName", "Partner");
    },
    getCategoryIcon() {
      return get(
        this.campaign,
        "campaignCategory.iconUrl",
        require("@/assets/views/category/category-icon-example.png")
      );
    },
    getCategoryName() {
      return get(this.campaign, "campaignCategory.name", "Category Name");
    },
  },
  methods: {
    showDetail() {
      this.campaignStore.drawerDetail = true;
      this.campaignStore.setDetailStoreCard(this.campaign);
      this.campaignStore.voucherId = this.campaign.id;
    },
    buyClicked() {
      // if (
      //   this.userStore.userData.userMetadata.token >= this.campaign.price &&
      //   this.campaign.purchasedQuantity == this.campaign.totalQuantity
      // ) {
      //   this.campaignStore.checkPurchased(`Campaign Out of Stock`);
      // } else if (
      //   this.userStore.userData.userMetadata.token >= this.campaign.price
      // ) {
      //   this.campaignStore.drawerDetail = true;
      //   this.campaignStore.setDetailStoreCard(this.campaign);
      //   this.campaignStore.voucherId = this.id;
      // } else {
      //   this.campaignStore.checkPurchased(`You dont have enough Token To buy`);
      // }
      this.campaignStore.voucherId = this.campaign.id;
      this.$dialog.confirm({
        title: "Confirm Purchase Voucher",
        topContent:
          "Are you sure you want to purchase this voucher? This action cannot be undone!",
        okText: "Confirm",
        cancelText: "Cancel",
        done: async () => {
          try {
            this.$loading.show();
            // this.campaignStore.voucherId = this.campaignStore.detailCard.id;
            await this.campaignStore.purchaseVoucher();
            await this.inventoryStore.fetchUserVoucher();
            await this.userStore.fetchUserMetadata();
            await this.campaignStore.fetchVoucher();
            this.campaignStore.drawerDetail = false;
            window.location.reload();
          } catch (error) {
            this.$alert.error("Error occured! Error: " + error);
          } finally {
            this.$loading.hide();
          }
        },
      });
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.card-title {
  min-height: 48px !important;
}
.campaign-card {
  border: 1px solid var(--v-neutral30-base);
}
.campaign-card-img {
  height: 168px;
}
.campaign-card-hover {
  border: 1px solid var(--v-primary-base) !important;
}
.card-status {
  position: absolute;
  border-radius: 4px;
  top: 8px;
}
.category-icon {
  width: 14px;
  height: 14px;
}
</style>
