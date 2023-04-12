<template>
    <div class="wrapper full-height d-flex">
      <div class="container mx-auto pa-10">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import { mapStores } from "pinia";
  import { inventoryStore } from "@/views/redeem/components/inventory/stores/inventoryStore";
  import { campaignStore } from "@/views/redeem/components/campaign/stores/campaignStore";
  import { userStore } from "@/stores/userStore";
  
  export default {
    computed: {
      ...mapStores(userStore),
      ...mapStores(campaignStore),
      ...mapStores(inventoryStore),
    },
    components: {
    },
    async created() {
      this.campaignStore.pageIndex = 2;
    },
  };
  </script>
  
  <style scoped>
  .wrapper {
    background: var(--v-neutral10-base) !important;
  }
  .container {
    max-width: 1400px;
    animation: fadeleft 1s ease-in-out;
  }
  </style>
  