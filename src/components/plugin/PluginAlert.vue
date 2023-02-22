<template>
  <v-snackbar
    :value="alert.show"
    @input="close"
    :color="color"
    :timeout="timeout"
    top
    class="plugin__alert"
  >
    <v-icon class="mr-3 mt-n1">{{ icon }}</v-icon>
    <span class="text-h6" v-html="alert.message"></span>
    <!-- <v-btn icon @click="close">
      <v-icon>mdi-close</v-icon>
    </v-btn> -->
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      alert: this.$alert.alertData,
    };
  },
  computed: {
    icon() {
      return {
        error: "mdi-alert",
        success: "mdi-checkbox-marked-circle",
        warning: "mdi-alert",
      }[this.alert.type];
    },
    color() {
      return {
        error: "error",
        success: "success",
        warning: "yellow darken-2",
      }[this.alert.type];
    },
    timeout() {
      if (this.alert.isLastMessage) return 15000;
      return (
        {
          error: 8000,
        }[this.alert.type] || 5000
      );
    },
  },
  methods: {
    close() {
      this.$alert.close();
    },
  },
};
</script>

<style lang="scss">
.plugin__alert {
  .v-snack__content {
    padding: 16px;
  }
}
</style>
