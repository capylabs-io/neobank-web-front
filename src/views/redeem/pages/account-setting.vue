<template>
  <div class="right d-flex flex-column align-center">
    <v-card class="card-content mt-3">
      <v-card-title class="">
        <div class="text-lg greyblack--text font-weight-medium text-uppercase">
          Account setting
        </div>
      </v-card-title>
      <v-divider />
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="text-left">
              Name
            </v-list-item-subtitle>
            <v-list-item-content>Hai Long</v-list-item-content>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="text-left">
              BANK ACCOUNT
            </v-list-item-subtitle>
            <v-list-item-content>4932104954890</v-list-item-content>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="d-flex col-gap-15 align-center">
              <div>EMAIL</div>
              <div
                class="cursor-pointer"
                @click="userStore.changePersonalInfoEdit()"
              >
                <!-- <v-icon
                  class="mr-2"
                  color="violet"
                >
                  mdi-square-edit-outline
                </v-icon> -->
              </div>
            </v-list-item-subtitle>
            <v-list-item-content>
              longnguyenhai834@gmail.com
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="d-flex col-gap-15 align-center">
              <div>PHONE</div>
              <div
                class="cursor-pointer"
                @click="userStore.changePersonalInfoEdit()"
              >
                <!-- <v-icon
                  class="mr-2"
                  color="violet"
                >
                  mdi-square-edit-outline
                </v-icon> -->
              </div>
            </v-list-item-subtitle>
            <v-list-item-content>(+84)-456453522</v-list-item-content>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="d-flex col-gap-15 align-center">
              <div>PASSWORD</div>
              <div
                class="cursor-pointer"
                @click="userStore.changePersonalInfoEdit()"
              >
                <!-- <v-icon
                  class="mr-2"
                  color="violet"
                >
                  mdi-square-edit-outline
                </v-icon> -->
              </div>
            </v-list-item-subtitle>
            <v-list-item-content>**********</v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../../stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
  },
};
</script>

<style lang="scss" scoped>
.right {
  min-height: 100%;
  padding: 20px;
  .card-content {
    width: 100%;
    background: #ffffff;
    box-shadow: inset 0px -4px 0px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    animation: fadeleft 1s ease-in-out;
  }
  .border-raidus-top {
    border-radius: 12px 12px 0 0;
  }
  .border-raidus-bottom {
    border-radius: 0 0 12px 12px;
  }
  .text-sub {
    color: rgba(0, 0, 0, 0.6);
  }
}
.col-gap-15 {
  column-gap: 15px;
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
</style>
