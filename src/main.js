import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import i18n from "./i18n";
import VueParallaxJs from "vue-parallax-js";
import AOS from "aos";
import "aos/dist/aos.css";
import { createPinia, PiniaVuePlugin } from "pinia";
import { markRaw } from "vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import alert from "@/plugins/alert";
import loading from "@/plugins/loading";
import PluginHelper from "@/helpers/PluginHelper";
import utils from "@/plugins/utils";
import dialog from "@/plugins/dialog";
import { rules } from "@/plugins/rules";
import moment from "moment";
import { vueFilterRegister } from "@/plugins/filter";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
Vue.use(VueParallaxJs);
Vue.config.productionTip = false;
Vue.use(PiniaVuePlugin);
Vue.use(
  PluginHelper.create({
    $utils: utils,
    $rules: rules,
    $dialog: dialog,
    $alert: alert,
    $loading: loading,
    $baseUrl: process.env.VUE_APP_API_ENDPOINT,
    $moment: moment,
  })
);

vueFilterRegister();

Vue.use(pinia);
new Vue({
  created() {
    AOS.init();
  },
  vuetify,
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
