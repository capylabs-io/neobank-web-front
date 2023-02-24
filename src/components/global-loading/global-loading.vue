<template>
  <v-overlay
    v-if="loadingController.numberRequests > 0"
    z-index="998"
  >
    <v-progress-circular
      indeterminate
      size="32"
    />
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
