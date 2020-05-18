/*!

 =========================================================
 * Vue Paper Dashboard - v2.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";
import axios from 'axios';
import VueAxios from 'vue-axios';
import "vue-notifyjs/themes/default.css";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import datePicker from 'vue-bootstrap-datetimepicker';
import { ClientTable } from 'vue-tables-2';
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { DataSource, HierarchicalDataSource, GanttDataSource, GanttDependencyDataSource, PivotDataSource, SchedulerDataSource, TreeListDataSource, DataSourceInstaller } from '@progress/kendo-datasource-vue-wrapper';
import { Gantt, GanttColumn, GanttView, GanttInstaller } from '@progress/kendo-gantt-vue-wrapper';
import moment from 'moment';
import VueMoment from 'vue-moment';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueCurrencyFilter from 'vue-currency-filter'
import JSZip from "jszip";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import store from './store';
// import 'bootstrap';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

Vue.use(GanttInstaller, Gantt, GanttColumn, GanttView)
Vue.use(DataSourceInstaller);
Vue.use(ClientTable);
Vue.use( CKEditor );
Vue.use(PaperDashboard);
Vue.use(BootstrapVue);
Vue.use(datePicker);
Vue.use(VueAxios, axios);
Vue.use(moment);
Vue.use(require('vue-moment'));
Vue.use(JSZip);
Vue.use(VueCurrencyFilter,
  {
    symbol : 'Rp',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
  })

/* auth */
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
