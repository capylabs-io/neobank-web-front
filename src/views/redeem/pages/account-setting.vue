<template>
  <div class="account-setting d-flex flex-column align-center mx-auto pa-6">
    <v-card flat class="form-detail full-width pa-5">
      <v-row>
        <v-col cols="5">
          <div class="user-logo">
            <v-img class :src="require(`@/assets/profile-logo.webp`)" />
          </div>
          <v-form
            @submit.prevent="updateBankAccount"
            id="check-edit-bank-account"
            ref="form"
          >
            <div class="d-flex mt-sm-3">
              <div
                class="text-left text-md font-weight-700"
                :style="{ width: '185px' }"
              >
                Bank account number
              </div>
              <v-text-field
                v-model="userStore.userData.userMetadata.bankAccount"
                v-if="!voucherStore.bankAccountEdit"
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
              <v-text-field
                v-model="userStore.userData.userMetadata.bankAccount"
                v-else
                height="36px"
                type="text"
                class="pa-0 ml-10"
                placeholder=""
                outlined
                dense
                flat
              />
            </div>
          </v-form>
        </v-col>
      </v-row>
      <v-divider class="mt-sm-3" />
      <v-row class="mt-sm-1">
        <v-col cols="1" v-if="!voucherStore.bankAccountEdit">
          <v-btn
            class="text-capitalize full-width"
            :style="{ border: '1px solid #E3E8EF' }"
            color="black"
            variant="text"
            @click="voucherStore.bankAccountEdit = true"
            text
          >
            Edit
          </v-btn>
        </v-col>
        <v-col cols="5" v-else class="d-flex">
          <v-btn
            class="text-capitalize"
            :style="{ border: '1px solid #E3E8EF' }"
            color="black"
            variant="text"
            @click="voucherStore.bankAccountEdit = false"
            text
          >
            Cancel
          </v-btn>

          <v-btn
            class="ml-4 text-capitalize"
            :style="{ backgroundColor: 'var(--v-blue-base)' }"
            color="white"
            variant="text"
            type="submit"
            form="check-edit-bank-account"
            text
          >
            Save
          </v-btn>
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
  methods: {
    updateBankAccount() {
      this.userStore.updateBankAccount();
      this.voucherStore.bankAccountEdit = false;
    },
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
