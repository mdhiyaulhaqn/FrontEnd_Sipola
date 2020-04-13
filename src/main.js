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
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

Vue.use(GanttInstaller, Gantt, GanttColumn, GanttView)
Vue.use(DataSourceInstaller);
Vue.use(ClientTable);
Vue.use(PaperDashboard);
Vue.use(BootstrapVue);
Vue.use(datePicker);
Vue.use(VueAxios, axios);
Vue.use(moment);
Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
