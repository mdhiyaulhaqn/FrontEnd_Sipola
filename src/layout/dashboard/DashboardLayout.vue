<template>
  <div class="wrapper">
    <side-bar v-if="currentUser">
      <template slot="links">
        <div v-if="showAdminBoard">
          <sidebar-link to="/user" name="Manage User" icon="ti ti-id-badge"/>
        </div>
        <div v-if="showDirekturBoard">
          <sidebar-link to="/dashboard" name="Dashboard" icon="ti ti-bar-chart"/>
        </div>
        <div v-if="showProjectManagerBoard">
          <sidebar-link to="/activity-list-schedule" name="Activity List Schedule" icon="ti ti-clipboard"/>
          <sidebar-link to="/delivery-order" name="Delivery Order" icon="ti ti-package"/>
        </div>
        <div v-if="showSalesMarketingBoard">
          <sidebar-link to="/quotation" name="Quotation" icon="ti ti-write"/>
          <sidebar-link to="/sales-order" name="Sales Order" icon="ti ti-notepad"/>
        </div>
        <div v-if="showFinanceBoard">
          <sidebar-link to="/reimbursement-request" name="Reimbursement Request" icon="ti ti-archive"/>
          <sidebar-link to="/expense" name="Expense" icon="ti ti-agenda"/>
          <sidebar-link to="/invoice" name="Invoice" icon="ti ti-envelope"/>
          <sidebar-link to="/income-expense-summary" name="Expense & Income Summary" icon="ti ti-stats-up"/>
        </div>
        <div v-if="showServiceTeamBoard">
          <sidebar-link to="/reimbursement-report" name="Reimbursement Report" icon="ti ti-file"/>
        </div>
        <div v-if="showLogistikBoard">
          <sidebar-link to="/purchase-order" name="Purchase Order" icon="ti ti-check-box"/>
        </div>
        <div v-if="showSupervisorBoard">
          <sidebar-link to="/daily-activity-report" name="Daily Activity Report" icon="ti ti-book"/>
        </div>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link" href="/profile">
            <i class="ti ti-user"></i>
            <p>Profile</p>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <i class="ti ti-shift-right"></i>
            <p>Sign Out</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div v-if="currentUser">
      <div class="main-panel">
        <top-navbar></top-navbar>

        <dashboard-content @click.native="toggleSidebar">

        </dashboard-content>

        <!-- <content-footer></content-footer> -->
      </div>
    </div>
    <div v-else>
      <div class = "panel-belom-login">
        <dashboard-content @click.native="toggleSidebar">

          </dashboard-content>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
    showDirekturBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_DIREKTUR_UTAMA');
      }
      return false;
    },
    showProjectManagerBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_PROJECT_MANAGER');
      }
      return false;
    },
    showSalesMarketingBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_SALES_MARKETING');
      }
      return false;
    },
    showFinanceBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_FINANCE');
      }
      return false;
    },
    showServiceTeamBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_SERVICE_TEAM');
      }
      return false;
    },
    showLogistikBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_LOGISTIK');
      }
      return false;
    },
    showSupervisorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_SUPERVISOR');
      }
      return false;
    },
  },
};
</script>

<style scoped>
.wrapper{
  background-color: #F7F8FC;
}
</style>
