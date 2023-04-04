<template>
  <v-card flat class="form-detail mt-sm-3 full-width pa-5">
    <v-row>
      <v-col cols="5">
        <div class="user-image" v-if="!userStore.userData.avatarUrl">
          <v-img
            :style="{ 'border-radius': '100px' }"
            :src="require(`@/assets/profile-pic.webp`)"
          />
        </div>
        <div class="user-image" v-else>
          <v-img
            :style="{ 'border-radius': '100px' }"
            :src="userStore.userData.avatarUrl"
          />
        </div>
        <v-form @submit.prevent="editAccount" id="check-edit-form" ref="form">
          <div class="d-flex mt-sm-1">
            <div
              class="text-xl text-left"
              :style="{ fontSize: '15px', fontWeight: 700, width: '170px' }"
            >
              Avatar
            </div>
            <v-file-input
              v-if="!voucherStore.profileEdit"
              class="pa-0 ml-10"
              height="36px"
              disabled
              append-outer-icon="mdi-upload"
              prepend-icon=""
              hide-details
              flat
              outlined
            >
            </v-file-input>
            <v-file-input
              v-else
              v-model="userStore.file"
              accept="image/png, image/jpeg, image/bmp,image/webp"
              ref="myfile"
              class="pa-0 ml-10"
              height="36px"
              @change="onFileChanged($event)"
              append-outer-icon="mdi-upload"
              prepend-icon=""
              hide-details
              flat
              outlined
            ></v-file-input>
            <!-- <v-btn
              v-if="voucherStore.profileEdit"
              class="text-capitalize ml-2"
              :style="{ backgroundColor: 'var(--v-blue-base)' }"
              color="white"
              variant="text"
              @click="upload()"
              text
            >
              Save
            </v-btn> -->
          </div>

          <div class="d-flex mt-sm-3">
            <div
              class="text-xl text-left"
              :style="{ fontSize: '15px', fontWeight: 700, width: '170px' }"
            >
              First name
            </div>
            <v-text-field
              v-if="!voucherStore.profileEdit"
              v-model="userStore.userData.userMetadata.firstName"
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
              v-else
              v-model="userStore.userData.userMetadata.firstName"
              height="36px"
              type="text"
              class="pa-0 ml-10"
              placeholder=""
              outlined
              dense
              flat
            />
          </div>
          <div class="d-flex mt-sm-3">
            <div
              class="text-xl text-left"
              :style="{ fontSize: '15px', fontWeight: 700, width: '170px' }"
            >
              Last name
            </div>
            <v-text-field
              v-if="!voucherStore.profileEdit"
              v-model="userStore.userData.userMetadata.lastName"
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
              v-else
              v-model="userStore.userData.userMetadata.lastName"
              height="36px"
              type="text"
              class="pa-0 ml-10"
              placeholder=""
              outlined
              dense
              flat
            />
          </div>

          <div class="d-flex mt-sm-3">
            <div
              class="text-xl text-left"
              :style="{
                fontSize: '15px',
                fontWeight: 700,
                width: '170px',
                height: '40px',
              }"
            >
              Email
            </div>
            <v-text-field
              v-model="userStore.userData.email"
              height="36px"
              type="text"
              class="pa-0 ml-10 btn-customize"
              placeholder=""
              solo
              background-color="secondary"
              readonly
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
              Telephone
            </div>
            <v-text-field
              v-if="!voucherStore.profileEdit"
              v-model="userStore.userData.userMetadata.phoneNumber"
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
              v-else
              v-model="userStore.userData.userMetadata.phoneNumber"
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
      <v-col cols="1" v-if="!voucherStore.profileEdit">
        <v-btn
          class="text-capitalize full-width"
          :style="{ border: '1px solid #E3E8EF' }"
          color="black"
          variant="text"
          @click="voucherStore.profileEdit = true"
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
          @click="voucherStore.profileEdit = false"
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
          form="check-edit-form"
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
  methods: {
    onFileChanged(data) {
      this.userStore.file = data;
      console.log("file", data);
    },

    editAccount() {
      this.userStore.updateAccountSetting();
      this.voucherStore.profileEdit = false;
      // window.location.reload();
    },
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
