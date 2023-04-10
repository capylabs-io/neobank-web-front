<template>
  <div class="account-setting d-flex flex-column align-center">
    <v-card flat class="form-detail full-width pa-6">
      <div class="user-logo">
        <v-img class :src="require(`@/assets/profile-logo.webp`)" />
      </div>
      <v-form
        @submit.prevent="updateBankAccount"
        id="check-edit-bank-account"
        ref="form"
      >
        <v-row class="mt-3">
          <v-col cols="3">
            <div class="text-left text-md font-weight-700 mt-2">
              Bank account number
            </div>
          </v-col>
          <v-col cols="4">
            <div class="d-flex">
              <v-text-field
                v-model="userStore.userData.userMetadata.bankAccount"
                v-if="!campaignStore.bankAccountEdit"
                background-color="neutral10"
                height="36px"
                type="text"
                class="pa-0"
                solo
                filled
                readonly
                flat
                dense
              />
              <v-text-field
                v-model="userStore.userData.userMetadata.bankAccount"
                v-else
                height="36px"
                type="text"
                class="pa-0"
                outlined
                dense
                flat
              />
            </div>
          </v-col>
        </v-row>
      </v-form>
      <v-divider class="mb-6" />
      <div class="d-flex gap-8">
        <v-btn
          class="text-capitalize text-btn"
          variant="text"
          @click="campaignStore.bankAccountEdit = true"
          v-if="!campaignStore.bankAccountEdit"
          outlined
          depressed
        >
          Edit
        </v-btn>
        <div class="d-flex gap-8" v-else>
          <v-btn
            class="text-capitalize"
            variant="text"
            @click="campaignStore.bankAccountEdit = false"
            outlined
            depressed
          >
            Cancel
          </v-btn>

          <v-btn
            class="text-capitalize"
            type="submit"
            form="check-edit-bank-account"
            color="primary"
            :disabled="!userStore.userData.userMetadata.bankAccount"
            depressed
          >
            Save
          </v-btn>
        </div>
      </div>
    </v-card>
    <informationEdit />
    <passwordChange />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { campaignStore } from "@/views/redeem/components/campaign/stores/campaignStore";
import informationEdit from "@/views/redeem/components/account-setting/information-edit.vue";
import passwordChange from "@/views/redeem/components/account-setting/password-change.vue";
export default {
  components: {
    informationEdit: informationEdit,
    passwordChange: passwordChange,
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(campaignStore),
  },
  methods: {
    updateBankAccount() {
      this.userStore.updateBankAccount();
      this.campaignStore.bankAccountEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
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
