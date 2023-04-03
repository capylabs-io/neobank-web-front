<template>
  <div class="account-setting d-flex flex-column align-center mx-auto pa-6">
    <v-card flat class="form-detail full-width pa-5">
      <v-row>
        <v-col cols="5">
          <div class="user-logo">
            <v-img class :src="require(`@/assets/profile-logo.webp`)" />
          </div>
          <div class="d-flex mt-sm-3">
            <div
              class="text-xl text-left"
              :style="{ fontSize: '15px', fontWeight: 700, width: '170px' }"
            >
              Bank account number
            </div>
            <v-text-field
              v-model="userStore.userData.userMetadata.bankAccount"
              height="36px"
              type="text"
              class="pa-0 ml-10 btn-customize"
              placeholder=""
              solo
              readonly
              dense
              hide-details
              flat
            />
          </div>
        </v-col>
      </v-row>
    </v-card>
    <informationEdit />
    <passwordChange />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../../stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
import informationEdit from "@/views/redeem/components/account-setting/information-edit.vue";
import passwordChange from "@/views/redeem/components/account-setting/password-change.vue";
export default {
  components: {
    informationEdit: informationEdit,
    passwordChange: passwordChange,
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
};
</script>

<style lang="scss" scoped>
.account-setting {
  max-width: 1400px;
}
.card-content {
  width: 100%;
  background: #ffffff;
  box-shadow: inset 0px -4px 0px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  animation: fadeleft 1s ease-in-out;
}

.text-sub {
  color: rgba(0, 0, 0, 0.6);
}

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
