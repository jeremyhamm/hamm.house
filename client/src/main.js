import Vue from 'vue';
import App from './App.vue';
import router from './routes/router';
import store from './store/store';
import BootstrapVue from 'bootstrap-vue';
import VueDraggable from 'vue-draggable';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faWind, faAngleDoubleDown, faAngleDoubleUp, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.use(BootstrapVue);
Vue.use(VueDraggable);
library.add(faWind, faAngleDoubleDown, faAngleDoubleUp, faArrowRight);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
