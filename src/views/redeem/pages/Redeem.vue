<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="redeem DMSans">
    <confirmDialog></confirmDialog>
    <inventoryDrawer />
    <detail />
    <div class="redeem-content d-flex">
      <div class="left">
        <left-content />
      </div>
      <div class="right">
        <right-content
          v-if="voucherStore.index == 1"
          :voucher="voucherStore.filterVoucherStore"
          :userVoucher="voucherStore.userVoucherList"
        />
        <inventory-content v-else-if="voucherStore.index == 2" />
        <accountSetting v-else />
      </div>
    </div>
  </div>
</template>

<script>
import leftContent from "@/views/redeem/pages/Redeem-left-content.vue";
import rightContent from "@/views/redeem/pages/Redeem-right-content.vue";
import inventoryContent from "@/views/redeem/pages/Redeem-inventory.vue";
import accountSettingVue from "@/views/redeem/pages/account-setting.vue";
import detailDrawer from "@/views/redeem/components/card-detail-drawer.vue";
import inventoryDrawer from "@/views/redeem/components/inventory-card-drawer.vue";
import confirmDialog from "@/components/dialog/confirm-dialog.vue";

import { mapStores } from "pinia";
import { inventoryStore } from "@/stores/inventoryStore";
import { voucherStore } from "@/stores/voucherStore";
import { userStore } from "@/stores/userStore";

export default {
  components: {
    rightContent: rightContent,
    leftContent: leftContent,
    inventoryContent: inventoryContent,
    detail: detailDrawer,
    inventoryDrawer: inventoryDrawer,
    accountSetting: accountSettingVue,
    confirmDialog: confirmDialog,
  },
  computed: {
    ...mapStores(voucherStore),
    ...mapStores(userStore),
    ...mapStores(inventoryStore),
  },
  async created() {
    if (!this.userStore.jwt) {
      this.$router.push("/login");
    }
    this.change();
    this.voucherStore.bearerToken = JSON.parse(sessionStorage.getItem("user"));
    await this.userStore.fetchUserMetadata();
    await this.inventoryStore.fetchUserVoucher();
    await this.voucherStore.fetchVoucher();
    await this.voucherStore.checkIncludes();
  },
  data() {
    return {
      inventory: true,
    };
  },
  methods: {
    change() {
      this.voucherStore.pageIndex = 2;
    },
  },
};
</script>

<style lang="scss" scoped>
.redeem {
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
}
.redeem-content {
  margin-top: 80px;
  height: calc(100vh - 80px);
}
.left {
  width: 15%;
  background: white;
}
.right {
  width: 85%;
  background: var(--v-secondary-base);
  overflow-y: auto;
}
.column-gap-10 {
  column-gap: 10px;
}
.row-gap-3 {
  row-gap: 3px;
}
.row-gap-6 {
  row-gap: 6px;
}

.gap-30 {
  gap: 30px;
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
.card-icon {
  border-radius: 100px;
}
.drawer-image {
  border-radius: 8px;
  height: 240px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.drawer-icon {
  border-radius: 100px;
  width: 40px;
  height: 40px;
}
.btn-arrow {
  position: absolute;
  background-color: white;
  z-index: 99;
}
.drawer {
  background: white !important;
  height: 100vh;
}
.drawer-btn {
  width: 100%;
  margin-top: 50%;
}
.unpurchased {
  background: #5752e3;
  padding: 4px, 16px, 4px, 16px;
}
</style>
