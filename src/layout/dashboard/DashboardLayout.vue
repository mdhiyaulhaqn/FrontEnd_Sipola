<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard"/>
        <sidebar-link to="/quotation" name="Quotation"/>
        <sidebar-link to="/sales-order" name="Sales Order"/>
        <sidebar-link to="/delivery-order" name="Delivery Order"/>
        <sidebar-link to="/purchase-order" name="Purchase Order"/>
        <sidebar-link to="/activity-list-schedule" name="Activity List Schedule"/>
        <sidebar-link to="/daily-activity-report" name="Daily Activity Report"/>
        <sidebar-link to="/expense" name="Expense"/>
        <sidebar-link to="/invoice" name="Invoice"/>
        <sidebar-link to="/reimbursement-report" name="Reimbursement Report"/>
        <sidebar-link to="/income-expense-summary" name="Expense & Income Summary"/>
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
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <!-- <content-footer></content-footer> -->
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
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
};
</script>

<style scoped>

</style>