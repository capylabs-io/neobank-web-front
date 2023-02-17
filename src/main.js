import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import i18n from "./i18n";
import VueParallaxJs from 'vue-parallax-js'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { createPinia } from 'pinia'

// const options = {
//   minWidth: 980,   /* minumum window width for parallax to take effect */
//   className: String,  /* this class gets added to all elements
//                       that are being animated, by default none */
//   container: String,  /* element that actually scrolls, by default it's window */
// }
Vue.use(VueParallaxJs)
Vue.config.productionTip = false

const pinia = createPinia();
Vue.use(pinia)
new Vue({
  created() {
    AOS.init()
  },
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
