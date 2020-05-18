<template>
  <div class="wrapper">
    <side-bar v-if="currentUser">
      <template slot="links">
        <div v-if="showAdminBoard">
          <sidebar-link to="/user" name="Manage User"/>
        </div>
        <div v-if="showDirekturBoard">
          <sidebar-link to="/dashboard" name="Dashboard"/>
        </div>
        <div v-if="showProjectManagerBoard">
          <sidebar-link to="/activity-list-schedule" name="Activity List Schedule"/>
          <sidebar-link to="/delivery-order" name="Delivery Order"/>
        </div>
        <div v-if="showSalesMarketingBoard">
          <sidebar-link to="/quotation" name="Quotation"/>
          <sidebar-link to="/sales-order" name="Sales Order"/>
        </div>
        <div v-if="showFinanceBoard">
          <sidebar-link to="/reimbursement-request" name="Reimbursement Request"/>
          <sidebar-link to="/expense" name="Expense"/>
          <sidebar-link to="/invoice" name="Invoice"/>
          <sidebar-link to="/income-expense-summary" name="Expense & Income Summary"/>
        </div>
        <div v-if="showServiceTeamBoard">
          <sidebar-link to="/reimbursement-report" name="Reimbursement Report"/>
        </div>
        <div v-if="showLogistikBoard">
          <sidebar-link to="/purchase-order" name="Purchase Order"/>
        </div>
        <div v-if="showSupervisorBoard">
          <sidebar-link to="/daily-activity-report" name="Daily Activity Report"/>
        </div>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <p>Change Password</p>
          </a>
        </li>
        <li class="nav-item">
          <!-- <a class="nav-link">
            <p>Sign Out</p>
          </a> -->
          <a class="nav-link" href @click.prevent="logOut">
            LogOut
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