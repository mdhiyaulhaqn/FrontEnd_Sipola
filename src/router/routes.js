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
import FormQuotation from "@/pages/SalesMarketing/FormQuotation.vue";
import UpdateQuotation from "@/pages/SalesMarketing/UpdateQuotation.vue";
import DetailQuotation from "@/pages/SalesMarketing/DetailQuotation.vue";
import Invoice from "@/pages/Finance/Invoice.vue";
import Pengeluaran from "@/pages/Finance/Pengeluaran.vue";
import DetailPengeluaran from "@/pages/Finance/DetailPengeluaran.vue";
import FormPengeluaran from "@/pages/Finance/FormPengeluaran.vue";
import ActivityListSchedule from "@/pages/ProjectManager/ActivityListSchedule.vue"

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/quotation",
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
        path: "quotation/update/:id",
        name: "update-quotation",
        component: UpdateQuotation
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "quotation/detail/:id",
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
<<<<<<< HEAD
        path: "invoice",
        name: "invoice",
        component: Invoice
      }
=======
        path: "expense",
        name: "expense",
        component: Pengeluaran
      },
      {
        path: "expense-detail",
        name: "expense-detail",
        component: DetailPengeluaran
      },
      {
        path: "expense-add",
        name: "expense-add",
        component: FormPengeluaran
      },
      {
        path: "activity-list-schedule",
        name: "activity-list-schedule",
        component: ActivityListSchedule
      },
>>>>>>> 4d562889b460712e6e266eaef37f1b5ad42f44ee
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
