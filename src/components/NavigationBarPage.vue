<template>
  <div class="nav-bar d-flex justify-space-between">
    <div
      v-if="isMobile"
      class="d-flex gap-24 DMSans black--text align-center pa-7"
    >
      <div>
        <v-img
          class="nav-logo align-self-center"
          :src="require(`@/assets/home/web-logo.webp`)"
        />
      </div>
      <router-link
        to="/"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-capitalize active">HOME</div>
      </router-link>
      <router-link
        to="/"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-capitalize active">WORLD</div>
      </router-link>
      <router-link
        to="/vn/redeem"
        class="black--text text-decoration-none align-self-center"
      >
        <div class="text-capitalize active">REDEEM</div>
      </router-link>

      <!-- <router-link
        to="/"
        class="white--text text-decoration-none align-self-center"
      >
        <div class="text-none text-uppercase">SME</div>
      </router-link> -->
      <!-- <v-btn text icon>
        <v-icon color="green">mdi-magnify</v-icon>
      </v-btn> -->
    </div>

    <div v-else class="d-flex align-center justify-space-between">
      <div>
        <v-img
          class="nav-logo align-self-center"
          :src="require(`@/assets/home/web-logo.webp`)"
        />
      </div>
      <div>
        <v-menu offset-y class="">
          <template #activator="{ on, attrs }">
            <v-app-bar-nav-icon
              v-bind="attrs"
              v-on="on"
              @click.stop="expansion = !expansion"
            />
          </template>
          <router-link
            to="/"
            class="black--text text-decoration-none align-self-center"
          >
            <div class="text-capitalize active">HOME</div>
          </router-link>
          <router-link
            to="/"
            class="black--text text-decoration-none align-self-center"
          >
            <div class="text-capitalize active">WORLD</div>
          </router-link>
          <router-link
            to="/vn/redeem"
            class="black--text text-decoration-none align-self-center"
          >
            <div class="text-capitalize active">REDEEM</div>
          </router-link>
          <router-link
            to="/vn/login"
            class="black--text text-decoration-none align-self-center"
          >
            <div class="text-capitalize active">LOGIN</div>
          </router-link>
        </v-menu>
      </div>
    </div>

    <!-- <v-menu
      v-else
      offset-y
    >
      <template #activator="{ on, attrs }">
        <div
          class="d-flex pa-3 gap-15 active"
          v-bind="attrs"
          v-on="on"
        >
          <v-btn
            icon
            text
            class="align-self-center"
          >
            <v-icon
              color="black"
              large
            >
              mdi-account
            </v-icon>
          </v-btn>
          <div class="align-self-center">
            {{ userStore.userData.email }}
          </div>
        </div>
      </template>
      <v-list class="d-flex flex-column">
        <v-list-item>
          <router-link
            to="/"
            class="black--text text-decoration-none align-self-center"
          >
            <div class="text-capitalize active">
              WORLD
            </div>
          </router-link>
        </v-list-item>
        <v-list-item>
          <router-link
            to="/vn/redeem"
            class="black--text text-decoration-none align-self-center"
          >
            <div class="text-capitalize active">
              REDEEM
            </div>
          </router-link>
        </v-list-item>
        <v-list-item>
          <router-link
            to="/vn/login"
            class="black--text text-decoration-none align-self-center"
            @click="signout"
          >
            <div class="text-capitalize active">
              LOGOUT
            </div>
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu> -->
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
  },
  created() {},
  methods: {
    isMobile() {
      if (window.innerWidth <= 599) {
        return true;
      } else {
        return false;
      }
    },
    signout() {
      this.userStore.logout;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: white;
  height: 80px;
  font-size: 16px;
  font-weight: bold;
  z-index: 100;
}
.nav-logo {
  height: 38px;
  width: 158px;
}
.gap-24 {
  gap: 24px;
}
.gap-15 {
  gap: 15px;
}
.active:hover {
  color: #2970ff;
}
</style>
