import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFoundPage from "@/pages/NotFoundPage.vue";
import Forbidden from "@/pages/ForbiddenPage.vue";

// Admin pagesc
import Dashboard from "@/pages/DirekturUtama/Dashboard.vue";
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
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta : {
          is_dirut : true
        }
      },
      {
        path: "dashboard/:year",
        name: "dashboard-year",
        component: Dashboard,
        meta : {
          is_dirut : true
        }
      },
      {
        path: "quotation/add",
        name: "add-quotation",
        component: FormQuotation,
        meta : {
          is_sales : true
        }
      },
      {
        path: "sales-order/add",
        name: "add-sales-order",
        component: FormSalesOrder,
        meta : {
          is_sales : true
        }
      },
      {
        path: "quotation/:id/update",
        name: "update-quotation",
        component: UpdateQuotation,
        meta : {
          is_sales : true
        }
      },
      {
        path: "quotation/:id",
        name: "detail-quotation",
        component: DetailQuotation,
        meta : {
          is_sales : true
        }
      },
      {
        path: "quotation",
        name: "quotation",
        component: Quotation,
        meta : {
          is_sales : true
        }
      },
      {
        path: "sales-order",
        name: "sales-order",
        component: SalesOrder,
        meta : {
          is_sales : true
        }
      },
      {
        path: "sales-order/:id",
        name: "detail-sales-order",
        component: DetailSalesOrder,
        meta : {
          is_sales : true
        }
      },
      {
        path: "sales-order/:id/update",
        name: "update-sales-order",
        component: UpdateSalesOrder,
        meta : {
          is_sales : true
        }
      },
      {
        path: "delivery-order/add",
        name: "add-delivery-order",
        component: AddDeliveryOrder,
        meta : {
          is_pm : true
        }
      },
      {
        path: "delivery-order",
        name: "delivery-order",
        component: DeliveryOrder,
        meta : {
          is_pm : true
        }
      },
      {
        path: "delivery-order/:id",
        name: "detail-delivery-order",
        component: DetailDeliveryOrder,
        meta : {
          is_pm : true
        }
      },
      {
        path: "delivery-order/:id/update",
        name: "update-delivery-order",
        component: UpdateDeliveryOrder,
        meta : {
          is_pm : true
        }
      },
      {
        path: "expense",
        name: "expense",
        component: Pengeluaran,
        meta : {
          is_finance : true
        }
      },
      {
        path: "expense/:id",
        name: "expense-detail",
        component: DetailPengeluaran,
        meta : {
          is_finance : true
        }
      },
      {
        path: "expense/add",
        name: "expense-add",
        component: FormPengeluaran,
        meta : {
          is_finance : true
        }
      },
      {
        path: "expense/:id/update",
        name: "expense-update",
        component: UpdatePengeluaran,
        meta : {
          is_finance : true
        }
      },
      {
        path: "invoice",
        name: "invoice",
        component: Invoice,
        meta : {
          is_finance : true
        }
      },
      {
        path: "invoice/sales-order/:id/add",
        name: "invoice-add",
        component: FormInvoice,
        meta : {
          is_finance : true
        }
      },
      {
        path: "invoice/:id",
        name: "detail-invoice",
        component: DetailInvoice,
        meta : {
          is_finance : true
        }
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
        component: UpdateInvoice,
        meta : {
          is_finance : true
        }
      },
      {
        path: "activity-list-schedule",
        name: "activity-list-schedule",
        component: ActivityListSchedule,
        meta : {
          is_pm : true
        }
      },
      {
        path: "reimbursement-report",
        name: "reimbursement-report",
        component: ReimbursementReport,
        meta : {
          is_service_team : true,
          is_finance : true
        }
      },
      {
        path: "reimbursement-report/:id/detail",
        name: "detail-reimbursement",
        component: DetailReimbursement,
        meta : {
          is_service_team : true,
          is_finance : true
        }
      },
      {
        path: "reimbursement-report/add",
        name: "add-reimbursement",
        component: FormReimbursement,
        meta : {
          is_service_team : true,
          is_finance : true
        }
      },
      {
        path: "reimbursement-report/:id/update",
        name: "update-reimbursement",
        component: UpdateReimbursement,
        meta : {
          is_service_team : true,
          is_finance : true
        }

      },
      {
        path: "activity-list-schedule/add",
        name: "add-activity-list-schedule",
        component: AddActivityListSchedule,
        meta : {
          is_pm : true
        }
      },
      {
        path: "activity-list-schedule/:id",
        name: "detail-activity-list-schedule",
        component: DetailActivityListSchedule,
        meta : {
          is_pm : true
        }
      },
      {
        path: "activity-list-schedule/:id/update",
        name: "update-activity-list-schedule",
        component: UpdateActivityListSchedule,
        meta : {
          is_pm : true
        }
      },
      {
        path: "daily-activity-report",
        name: "daily-activity-report",
        component: DailyActivityReport,
        meta : {
          is_supervisor : true
        }
      },
      {
        path: "daily-activity-report/add",
        name: "add-daily-activity-report",
        component: AddDailyActivityReport,
        meta : {
          is_supervisor : true
        }
      },
      {
        path: "daily-activity-report/:id",
        name: "detail-daily-activity-report",
        component: DetailDailyActivityReport,
        meta : {
          is_supervisor : true
        }
      },
      {
        path: "daily-activity-report/:id/update",
        name: "update-daily-activity-report",
        component: UpdateDailyActivityReport,
        meta : {
          is_supervisor : true
        }
      },
      {
        path: "income-expense-summary",
        name: "income-expense-summary",
        component: RingkasanPendapatanPengeluaran,
        meta : {
          is_finance : true
        }
      },
      {
        path: "/home",
        name: "home",
        component: Homepage
      },
      {
        path: "purchase-order",
        name: "purchase-order",
        component: PurchaseOrder,
        meta : {
          is_logistik : true
        }
      },
      {
        path: "purchase-order/add",
        name: "purchase-order-add",
        component: FormPurchaseOrder,
        meta : {
          is_logistik : true
        }
      },
      {
        path: "purchase-order/:id",
        name: "detail-purchase-order",
        component: DetailPurchaseOrder,
        meta : {
          is_logistik : true
        }
      },
      {
        path: "purchase-order/:id/update",
        name: "update-purchase-order",
        component: UpdatePurchaseOrder,
        meta : {
          is_logistik : true
        }
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
      },
      {
        path: '/user',
        name: 'user',
        component: User,
        meta : {
          is_admin : true
        }
      },
      {
        path: '/user/add',
        name: 'user-add',
        component: AddUser,
        meta : {
          is_admin : true
        }
      },
      {
        path: '/user/:username/update',
        name: 'user-update',
        component: UpdateUser,
        meta : {
          is_admin : true
        }
      },
      {
        path: "reimbursement-request/:id/detail",
        name: "detail-request",
        component: DetailReimbursementRequest,
        meta : {
          is_finance : true,
          is_service_team : true,
        }
      },
      {
        path: "reimbursement-request",
        name: "reimbursement-request",
        component: ReimbursementRequest,
        meta : {
          is_finance : true,
          is_service_team : true,
        },
      },
      {
        path: "forbidden",
        name: "noaccess",
        component: Forbidden
      },
      // {
      //   path: "*",
      //   name: "page-not-found",
      //   component: NotFoundPage
      // }
    ]
  },
  {
    path: "*",
    component: DashboardLayout,
    children : [
      {
        path: "*",
        name: "page-not-found",
        component: NotFoundPage
      }
    ]
  }
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
