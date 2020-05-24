import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFilm,
  faTv,
  faSearch,
  faTimes,
  faStar,
  faLock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)
library.add(faFilm, faTv, faSearch, faTimes, faStar, faLock);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
