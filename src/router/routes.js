import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import Quotation from "@/pages/SalesMarketing/Quotation.vue";
import SalesOrder from "@/pages/SalesMarketing/SalesOrder.vue";
import FormSalesOrder from "@/pages/SalesMarketing/FormSalesOrder.vue";
import DetailSalesOrder from "@/pages/SalesMarketing/DetailSalesOrder.vue";
import FormQuotation from "@/pages/SalesMarketing/FormQuotation.vue";
import UpdateQuotation from "@/pages/SalesMarketing/UpdateQuotation.vue";
import DetailQuotation from "@/pages/SalesMarketing/DetailQuotation.vue";
import Pengeluaran from "@/pages/Finance/Pengeluaran.vue";
import DetailPengeluaran from "@/pages/Finance/DetailPengeluaran.vue";
import FormPengeluaran from "@/pages/Finance/FormPengeluaran.vue";
import ActivityListSchedule from "@/pages/ProjectManager/ActivityListSchedule.vue";
import AddActivityListSchedule from "@/pages/ProjectManager/AddActivityListSchedule.vue";
import DetailActivityListSchedule from "@/pages/ProjectManager/DetailActivityListSchedule.vue";
import UpdateActivityListSchedule from "@/pages/ProjectManager/UpdateActivityListSchedule.vue";
import UpdatePengeluaran from "@/pages/Finance/UpdatePengeluaran.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "quotation/add",
        name: "add-quotation",
        component: FormQuotation
      },
      {
        path: "sales-order/add",
        name: "add-sales-order",
        component: FormSalesOrder
      },
      {
        path: "quotation/:id/update",
        name: "update-quotation",
        component: UpdateQuotation
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "quotation/:id",
        name: "detail-quotation",
        component: DetailQuotation
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "quotation",
        name: "quotation",
        component: Quotation
      },
      {
        path: "sales-order",
        name: "sales-order",
        component: SalesOrder
      },
      {
        path: "sales-order/:id",
        name: "detail-sales-order",
        component: DetailSalesOrder
      },
      {
        path: "expense",
        name: "expense",
        component: Pengeluaran
      },
      {
        path: "expense/:id",
        name: "expense-detail",
        component: DetailPengeluaran
      },
      {
        path: "expense/:id/update",
        name: "expense-detail",
        component: UpdatePengeluaran
      },
      {
        path: "expense/add",
        name: "add-expense",
        component: FormPengeluaran
      },
      {
        path: "activity-list-schedule",
        name: "activity-list-schedule",
        component: ActivityListSchedule
      },
      {
        path: "activity-list-schedule/add",
        name: "add-activity-list-schedule",
        component: AddActivityListSchedule
      },
      {
        path: "activity-list-schedule/:id",
        name: "detail-activity-list-schedule",
        component: DetailActivityListSchedule
      },
      {
        path: "activity-list-schedule/:id/update",
        name: "update-activity-list-schedule",
        component: UpdateActivityListSchedule
      },
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
