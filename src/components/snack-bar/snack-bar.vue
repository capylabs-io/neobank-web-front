<template>
  <v-snackbar
    :value="snackBarController.show"
    @input="snackBarController.close()"
    :color="snackBarController.color"
    :timeout="snackBarController.timeout"
    min-width="375px"
    top
    class="plugin__alert"
  >
    <div class="message-text d-flex align-center">
      <v-icon class="mr-3">{{ snackBarController.icon }}</v-icon>
      <div v-html="snackBarController.message"></div>
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn icon text v-bind="attrs" @click="snackBarController.close()"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </template>
  </v-snackbar>
</template>

<script>
import { snackBarController } from "./snack-bar-controller";
export default {
  name: "SnackBar",
  data() {
    return {
      snackBarController: snackBarController(),
    };
  },
};
</script>

<style scoped>
.message-text {
  font-style: normal;
  font-weight: 700 !important;
  font-size: 18px !important;
  line-height: 130%;
}
</style>
