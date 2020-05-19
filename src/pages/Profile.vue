<template>
    <div>
        <b-breadcrumb id="breadcrumb">
            <b-breadcrumb-item active>
                Profile
            </b-breadcrumb-item>
        </b-breadcrumb>
        <h3 class="judul"><strong>My Profile</strong></h3>
        <div class="row">
          <div class="col-md-10 col-sm-10 col-xs-10 col-12 d-block d-xs-block d-sm-block center">
            <card class="col">
                <div class = "nama-user">{{user.name}}</div>
                <b-row align-h="end">
                    <b-col class="detail-label col-5 col-md-2">Username</b-col>
                    <b-col class="detail-text col-7 col-md-6">: {{user.username}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-5 col-md-2">No. HP</b-col>
                    <b-col class="detail-text col-7 col-md-6">: {{user.noHP}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-5 col-md-2">Alamat</b-col>
                    <b-col class="detail-text col-7 col-md-6">: {{user.alamat}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-5 col-md-2">Email</b-col>
                    <b-col class="detail-text col-7 col-md-6">: {{user.email}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-5 col-md-2">Role</b-col>
                    <b-col class="detail-text col-7 col-md-6">
                      <div v-for="(role, index) in user.roles" :key="index">
                        <span id="role" v-if="role != 'ROLE_USER'">: {{generateRole(role)}}</span>
                      </div>
                    </b-col>
                </b-row>
            </card>
          </div>
        </div>
    </div>


</template>

<script>
import axios from 'axios';
import moment from 'moment';
import authHeader from '../services/auth-header';

export default {
  data() {
    return {
      user : {
          name: '',
          noHP : '',
          alamat: '',
          email: '',
          username: '',
          roles: [],
      },
      successModal: false,
      url_local: "http://localhost:8080/api/user/",
      url_deploy: "https://sipola-sixab.herokuapp.com/api/user/",
    };
  },
  beforeMount(){
      this.getUser();
  },
  methods:{
    currentUser() {
      return this.$store.state.auth.user;
    },
    getUser(){
      this.user = this.currentUser()
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
    },
  }
};
</script>

<style scoped>
.center{
  margin-left: auto;
  margin-right: auto;
}

.container{
    max-width: 983px;
}

#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}

.judul{
  text-align: center;
  color: black;
  margin: 11px 0 24px 0;
}

.nama-user{
    text-align: center;
    color: black;
    font-size:20px;
    margin-bottom: 30px;
    font-weight: bold;
}

.row {
    margin-bottom: 20px;
}

.detail-label{
    /* text-align: right; */
    padding-left: 40px;
    font-weight: bold;
}

</style>