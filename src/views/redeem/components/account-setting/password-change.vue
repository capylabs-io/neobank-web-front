<template>
  <v-card flat class="form-detail mt-sm-3 full-width pa-5">
    <v-row>
      <v-col cols="5">
        <div class="d-flex mt-sm-3">
          <div
            class="text-xl text-left"
            :style="{ fontSize: '15px', fontWeight: 700, width: '170px' }"
          >
            Current Password
          </div>
          <v-text-field
            height="36px"
            type="password"
            class="pa-0 ml-10 btn-customize"
            placeholder=""
            solo
            dense
            hide-details
            flat
          />
        </div>

        <div class="d-flex mt-sm-3">
          <div
            class="text-xl text-left"
            :style="{ fontSize: '15px', fontWeight: 700, width: '170px' }"
          >
            New password
          </div>
          <v-text-field
            height="36px"
            type="password"
            class="pa-0 ml-10 btn-customize"
            placeholder=""
            solo
            dense
            hide-details
            flat
          />
        </div>

        <div class="d-flex mt-sm-3">
          <div
            class="text-xl text-left"
            :style="{ fontSize: '15px', fontWeight: 700, width: '170px' }"
          >
            Re-enter new password
          </div>
          <v-text-field
            height="36px"
            type="password"
            class="pa-0 ml-10 btn-customize"
            placeholder=""
            solo
            dense
            hide-details
            flat
          />
        </div>
      </v-col>
    </v-row>
    <v-divider class="mt-sm-3" />
    <v-row class="mt-sm-1">
      <v-col cols="2" v-if="!voucherStore.changePassword">
        <v-btn
          class="text-capitalize full-width"
          :style="{ border: '1px solid #E3E8EF' }"
          color="black"
          variant="text"
          @click="voucherStore.changePassword = true"
          text
        >
          Change password
        </v-btn>
      </v-col>
      <v-col cols="5" v-else class="d-flex">
        <v-btn
          class="text-capitalize"
          :style="{ border: '1px solid #E3E8EF' }"
          color="black"
          variant="text"
          @click="voucherStore.changePassword = false"
          text
        >
          Cancel
        </v-btn>

        <v-btn
          class="ml-4 text-capitalize"
          :style="{ backgroundColor: 'var(--v-blue-base)' }"
          color="white"
          variant="text"
          @click="voucherStore.step = 2"
          text
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
};
</script>

<style lang="scss" scoped>
@keyframes fadeleft {
  0% {
    opacity: 0;
    transform: translatex(-100px);
  }
  100% {
    opacity: 1;
  }
}
.form-detail {
  background-color: white;
  height: max-content !important;
  border: 1px solid #e3e8ef;
}

.v-card {
  border-radius: 12px !important;
}
.user-logo {
  height: 39px;
  width: 100px;
}
.user-image {
  height: 79px;
  width: 64px;
}
.btn-customize {
  width: 300px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e3e8ef;
}
</style>
