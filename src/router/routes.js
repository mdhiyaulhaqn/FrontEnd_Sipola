import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pagesc
import Dashboard from "@/pages/DirekturUtama/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Quotation from "@/pages/SalesMarketing/Quotation.vue";
import SalesOrder from "@/pages/SalesMarketing/SalesOrder.vue";
import FormSalesOrder from "@/pages/SalesMarketing/FormSalesOrder.vue";
import DetailSalesOrder from "@/pages/SalesMarketing/DetailSalesOrder.vue";
import UpdateSalesOrder from "@/pages/SalesMarketing/UpdateSalesOrder.vue";
import FormQuotation from "@/pages/SalesMarketing/FormQuotation.vue";
import UpdateQuotation from "@/pages/SalesMarketing/UpdateQuotation.vue";
import DetailQuotation from "@/pages/SalesMarketing/DetailQuotation.vue";
import Pengeluaran from "@/pages/Finance/Pengeluaran.vue";
import DetailPengeluaran from "@/pages/Finance/DetailPengeluaran.vue";
import FormPengeluaran from "@/pages/Finance/FormPengeluaran.vue";
import Invoice from "@/pages/Finance/Invoice.vue";
import FormInvoice from "@/pages/Finance/FormInvoice.vue";
import UpdateInvoice from "@/pages/Finance/UpdateInvoice.vue";
import DetailInvoice from "@/pages/Finance/DetailInvoice.vue";
import UpdatePengeluaran from "@/pages/Finance/UpdatePengeluaran.vue";
import RingkasanPendapatanPengeluaran from "@/pages/Finance/RingkasanPendapatanPengeluaran.vue";
import ActivityListSchedule from "@/pages/ProjectManager/ActivityListSchedule.vue";
import AddActivityListSchedule from "@/pages/ProjectManager/AddActivityListSchedule.vue";
import DetailActivityListSchedule from "@/pages/ProjectManager/DetailActivityListSchedule.vue";
import UpdateActivityListSchedule from "@/pages/ProjectManager/UpdateActivityListSchedule.vue";
import DailyActivityReport from "@/pages/Supervisor/DailyActivityReport.vue";
import AddDailyActivityReport from "@/pages/Supervisor/AddDailyActivityReport.vue";
import DetailDailyActivityReport from "@/pages/Supervisor/DetailDailyActivityReport.vue";
import UpdateDailyActivityReport from "@/pages/Supervisor/UpdateDailyActivityReport.vue";
import DeliveryOrder from "@/pages/ProjectManager/DeliveryOrder.vue";
import AddDeliveryOrder from "@/pages/ProjectManager/AddDeliveryOrder.vue";
import DetailDeliveryOrder from "@/pages/ProjectManager/DetailDeliveryOrder.vue";
import UpdateDeliveryOrder from "@/pages/ProjectManager/UpdateDeliveryOrder.vue";
import ReimbursementReport from "@/pages/ServiceTeam/ReimbursementReport.vue";
import DetailReimbursement from "@/pages/ServiceTeam/DetailReimbursement.vue";
import FormReimbursement from "@/pages/ServiceTeam/FormReimbursement.vue";
import UpdateReimbursement from "@/pages/ServiceTeam/UpdateReimbursement.vue";
import Login from "@/pages/Login.vue";
import Homepage from "@/pages/Homepage.vue";
import DetailReimbursementRequest from "@/pages/Finance/DetailReimbursementFinance.vue";
import ReimbursementRequest from "@/pages/Finance/ReimbursementRequest.vue";
import PurchaseOrder from "@/pages/Logistic/PurchaseOrder.vue";
import DetailPurchaseOrder from "@/pages/Logistic/DetailPurchaseOrder.vue";
import FormPurchaseOrder from "@/pages/Logistic/FormPurchaseOrder.vue";
import UpdatePurchaseOrder from "@/pages/Logistic/UpdatePurchaseOrder.vue";
import Profile from "@/pages/Profile.vue";
// import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import User from "@/pages/Admin/User.vue";
import AddUser from "@/pages/Admin/AddUser.vue";
import UpdateUser from "@/pages/Admin/UpdateUser.vue";

// import store from "@/store";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "dashboard/:year",
        name: "dashboard-year",
        component: Dashboard
      },
      {
        path: "dashboard/",
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
        path: "quotation/:id",
        name: "detail-quotation",
        component: DetailQuotation
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
        path: "sales-order/:id/update",
        name: "update-sales-order",
        component: UpdateSalesOrder
      },
      {
        path: "delivery-order/add",
        name: "add-delivery-order",
        component: AddDeliveryOrder
      },
      {
        path: "delivery-order",
        name: "delivery-order",
        component: DeliveryOrder
      },
      {
        path: "delivery-order/:id",
        name: "detail-delivery-order",
        component: DetailDeliveryOrder
      },
      {
        path: "delivery-order/:id/update",
        name: "update-delivery-order",
        component: UpdateDeliveryOrder
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
        name: "expense-update",
        component: UpdatePengeluaran
      },
      {
        path: "expense/add",
        name: "expense-add",
        component: FormPengeluaran
      },
      {
        path: "invoice",
        name: "invoice",
        component: Invoice
      },
      {
        path: "invoice/:id",
        name: "detail-invoice",
        component: DetailInvoice
      },
      {
        path: "invoice/sales-order/:id/add",
        name: "invoice-add",
        component: FormInvoice
      },
      {
        path: "invoice/sales-order",
        name: "sales-order-for-invoice",
        component: SalesOrder
      },
      {
        path: "invoice/sales-order/:id",
        name: "detail-sales-order-for-invoice",
        component: DetailSalesOrder
      },
      {
        path: "invoice/:id/update",
        name: "update-invoice",
        component: UpdateInvoice
      },
      {
        path: "activity-list-schedule",
        name: "activity-list-schedule",
        component: ActivityListSchedule
      },
      {
        path: "reimbursement-report",
        name: "reimbursement-report",
        component: ReimbursementReport
      },
      {
        path: "reimbursement-report/:id/detail",
        name: "detail-reimbursement",
        component: DetailReimbursement
      },
      {
        path: "reimbursement-report/add",
        name: "add-reimbursement",
        component: FormReimbursement
      },
      {
        path: "reimbursement-report/:id/update",
        name: "update-reimbursement",
        component: UpdateReimbursement

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
      {
        path: "daily-activity-report",
        name: "daily-activity-report",
        component: DailyActivityReport
      },
      {
        path: "daily-activity-report/add",
        name: "add-daily-activity-report",
        component: AddDailyActivityReport
      },
      {
        path: "daily-activity-report/:id",
        name: "detail-daily-activity-report",
        component: DetailDailyActivityReport
      },
      {
        path: "daily-activity-report/:id/update",
        name: "update-daily-activity-report",
        component: UpdateDailyActivityReport
      },
      {
        path: "income-expense-summary",
        name: "income-expense-summary",
        component: RingkasanPendapatanPengeluaran
      },
      // {
      //   path: "/",
      //   name: "home",
      //   component: Homepage
      // }
      {
        path: "purchase-order",
        name: "purchase-order",
        component: PurchaseOrder
      },
      {
        path: "purchase-order/:id",
        name: "detail-purchase-order",
        component: DetailPurchaseOrder
      },
      {
        path: "purchase-order/add",
        name: "purchase-order-add",
        component: FormPurchaseOrder
      },
      {
        path: "purchase-order/:id/update",
        name: "update-purchase-order",
        component: UpdatePurchaseOrder
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/register',
        component: Register
      },
      {
        path: '/profile',
        name: 'profile',
        // lazy-loaded
        component: () => import('@/pages/Profile.vue')
        // Profile
      },
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/user/add',
        name: 'user-add',
        component: AddUser
      },
      {
        path: '/user/:id/update',
        name: 'user-update',
        component: UpdateUser
      },
      {
        path: "reimbursement-request/:id/detail",
        name: "detail-request",
        component: DetailReimbursementRequest
      },
      {
        path: "reimbursement-request",
        name: "reimbursement-request",
        component: ReimbursementRequest
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
