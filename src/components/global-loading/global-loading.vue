<template>
  <v-overlay z-index="998" v-if="loadingController.numberRequests > 0">
    <v-progress-circular indeterminate size="32"></v-progress-circular>
  </v-overlay>
</template>
<script>
import { loadingController } from "./global-loading-controller";
export default {
  name: "LoadingController",
  data() {
    return {
      loadingController: loadingController(),
    };
  },
};
</script>
