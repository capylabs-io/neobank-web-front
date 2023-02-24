<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="redeem d-flex DMSans">
    <inventoryDrawer></inventoryDrawer>
    <detail></detail>
    <left-content></left-content>
    <right-content
      v-if="userStore.index == 1"
      :voucher="userStore.voucherData"
    ></right-content>
    <inventory-content v-else-if="userStore.index == 2"></inventory-content>
    <accountSetting v-else></accountSetting>
  </div>
</template>

<script>
import leftContent from "@/views/redeem/pages/Redeem-left-content.vue";
import rightContent from "@/views/redeem/pages/Redeem-right-content.vue";
import inventoryContent from "@/views/redeem/pages/Redeem-inventory.vue";
import accountSettingVue from "@/views/redeem/pages/account-setting.vue";
import detailDrawer from "@/views/redeem/components/card-detail-drawer.vue";
import inventoryDrawer from "@/views/redeem/components/inventory-card-drawer.vue";

import { mapStores } from "pinia";
import { userStore } from "../../stores/userStore";

export default {
  components: {
    rightContent: rightContent,
    leftContent: leftContent,
    inventoryContent: inventoryContent,
    detail: detailDrawer,
    inventoryDrawer: inventoryDrawer,
    accountSetting: accountSettingVue,
  },
  mounted: {},
  computed: {
    ...mapStores(userStore),
  },
  created() {
    this.change();
    this.userStore.fetchVoucher();
    console.log("data", this.userStore.voucherData);
    console.log("pagination", this.userStore.pagination);
  },
  data() {
    return {
      inventory: true,
    };
  },
  methods: {
    change() {
      this.userStore.pageIndex = 2;
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  width: 15%;
  background: #f5f5f5;
  height: 100vh;
}
.left-first {
  height: 26%;
  background: white;
}
.left-second {
  height: 9%;
  background: white;
}
.left-third {
  height: 65%;
  background: white;
}
.right {
  width: 95%;
  background: #f5f5f5;
  padding: 30px 100px;
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
