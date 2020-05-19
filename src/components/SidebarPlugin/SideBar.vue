<template>
  <div class="sidebar"
       :data-background-color="backgroundColor"
       :data-active-color="activeColor">
    <!--
            Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black | darkblue"
            Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
        -->
    <!-- -->
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo" style="border: none;">
        <a href="#" class="simple-text">
          <div class = "row">

            <div class = "col-3">

            <div class="logo-img">
                <img src="@/assets/img/company-logo.png" alt="">
            </div>
            </div>
            <div class = "col-9">
            <p class = "title">{{title}}</p>
            <p class = "subtitle">{{subtitle}}</p>
            </div>

          </div>

        </a>
      </div>
      <div class="logo">
        <div class = "user-profile" v-if="currentUser.name.split(' ').length > 2">
          <h3 id="name">{{(currentUser.name.split(' ')[0]) + " " + (currentUser.name.split(' ')[1])}}</h3>
          <div v-for="(role,index) in currentUser.roles" :key="index">
            <h4 id="role" v-if="role != 'ROLE_USER'">{{generateRole(role)}}</h4>
          </div>
        </div>
        <div class = "user-profile" v-else>
          <h4 id="name">{{currentUser.name}}</h4>
          <div v-for="(role,index) in currentUser.roles" :key="index">
            <h4 id="role" v-if="role != 'ROLE_USER'">{{generateRole(role)}}</h4>
          </div>
        </div>
      </div>

      <slot>

      </slot>
      <ul class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot name="links">
          <sidebar-link v-for="(link,index) in sidebarLinks"
                        :key="index"
                        :to="link.path"
                        :name="link.name"
                        :icon="link.icon">
          </sidebar-link>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
import MovingArrow from "./MovingArrow.vue";
import SidebarLink from "./SidebarLink";
export default {
  props: {
    title: {
      type: String,
      default: 'SIPOLA'
    },
    subtitle : {
      type: String,
      default: 'Sistem Informasi Pengelolaan Penjualan'
    },
    backgroundColor: {
      type: String,
      default: "darkred",
      validator: value => {
        let acceptedValues = ["white", "black","darkred"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    activeColor: {
      type: String,
      default: "success",
      validator: value => {
        let acceptedValues = [
          "primary",
          "info",
          "success",
          "warning",
          "danger"
        ];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      autoClose: this.autoClose,
      addLink: this.addLink,
      removeLink: this.removeLink
    };
  },
  components: {
    MovingArrow,
    SidebarLink
  },
  computed: {
    /**
     * Styles to animate the arrow near the current active sidebar link
     * @returns {{transform: string}}
     */
    arrowMovePx() {
      return this.linkHeight * this.activeLinkIndex;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      linkHeight: 43,
      activeLinkIndex: 85,
      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false,
      links: []
    };
  },
  methods: {
    findActiveLink() {
      this.links.forEach((link, index) => {
        if (link.isActive()) {
          this.activeLinkIndex = index;
        }
      });
    },
    addLink(link) {
      const index = this.$slots.links.indexOf(link.$vnode);
      this.links.splice(index, 0, link);
    },
    removeLink(link) {
      const index = this.links.indexOf(link);
      if (index > -1) {
        this.links.splice(index, 1);
      }
    },
    generateRole(role){
      if(role == "ROLE_ADMIN"){
        return "Admin";
      } else if(role == "ROLE_DIREKTUR_UTAMA"){
        return "Direktur Utama";
      } else if (role == "ROLE_PROJECT_MANAGER"){
        return "Project Manager";
      } else if (role == "ROLE_SALES_MARKETING"){
        return "Sales Marketing";
      } else if (role == "ROLE_FINANCE"){
        return "Finance";
      } else if (role == "ROLE_SERVICE_TEAM"){
        return "Service Team";
      } else if (role == "ROLE_LOGISTIK"){
        return "Logistik";
      } else if (role == "ROLE_SUPERVISOR"){
        return "Supervisor";
      }
    }
  },
  mounted() {
    this.$watch("$route", this.findActiveLink, {
      immediate: true
    });
  }
};
</script>
<style>
.user-profile{
  color:white;
  text-align: center;
}
#name{
  margin-top: 0px;
  font-weight: bold;
  text-align: center;
}
#role{
  font-weight: 1;
  color:lightgray;
  font-size: 16px;
  margin-top: -5px;
  margin-bottom: 12px;
}
</style>
