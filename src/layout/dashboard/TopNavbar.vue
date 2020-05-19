<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid" style="margin-bottom: 4px;">
      <a class="navbar-brand" href="javascript:history.go(-1)">
        <img src="@/assets/img/back-icon.png" alt="" width="30px">
      </a>

      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto" style="text-align:right">
          <li class="nav-item" id="user-info">
            <span>
            <p class="nav-link">
              {{currentUser.username}}<br>
              <a href="/profile">Profile</a> |
              <a href @click.prevent="logOut">Sign Out</a>
            </p>
            </span>
          </li>
          <li class="nav-item" id="user-logo-nav">
            <span>
              <p class="nav-link">
                <br>
                <img src="@/assets/img/user-icon.png" alt="" width="30px" style="margin-top:5px">
              </p>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style>
i{
  color: black;
  font-size: 20px;
}
#user-logo{
  font-size: 30px;
}
#user-logo-nav{
  margin-top: -20px;
}
#user-info{
  margin-right: -20px;
  margin-bottom: -3px;
}
/* The navigation bar */
</style>
