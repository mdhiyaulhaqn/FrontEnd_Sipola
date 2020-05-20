<template>
<div class="row">
  <div class="col-12">
    <b-breadcrumb id="breadcrumb">
      <b-breadcrumb-item :to="{name: 'user'}">
        User
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Update User
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h3 class="judul"><strong>Update User</strong></h3>
    <div class = "row">
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
            <card class="col">
            <form name="form" @submit.prevent="onConfirmation">
                <h5 class = "title-form">Personal Information</h5>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="name">Name</label>
                            <b-form-input
                                id="Name"
                                v-model="user.name"
                                type="text"
                                class="form-control"
                                name="name"
                                required
                                placeholder="Name">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </b-row>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="Address">Address</label>
                            <b-form-input
                                id="Address"
                                v-model="user.alamat"
                                type="text"
                                class="form-control"
                                name="alamat"
                                required
                                placeholder="Address">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </b-row>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="Phone Number">Phone Number</label>
                            <b-form-input
                                id="Phone Number"
                                v-model="user.noHP"
                                type="number"
                                class="form-control"
                                name="noHP"
                                required
                                placeholder="Phone Number">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </b-row>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="Email">Email</label>
                            <b-form-input
                                id="Email"
                                v-model="user.email"
                                type="email"
                                class="form-control"
                                name="email"
                                required
                                placeholder="Email">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </b-row>
                <h5 class = "title-form">Account Information </h5>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="roles">Role</label>
                            <b-form-select v-model="selectedRole" :options="roles" required></b-form-select>
                            <div
                                v-if="submitted && errors.has('role')"
                                class="alert-danger"
                                >{{errors.first('role')}}</div>
                        </b-form-group>
                    </div>
                </b-row>
                <div class = "button-group">
                    <b-button class = "save-button" type="submit">Save</b-button>
                    <b-button class = "cancel-button" type="reset" v-on:click="redirect()">Cancel</b-button>
                </div>
            </form>

            <!-- <div
                v-if="message && !successful"
                class="alert"
                :class="alert-danger"
            >{{message}}
            </div> -->

             <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
            >{{message}}
             </div>
            </card>
        </div>
    </div>
    </div>
    <b-modal id="modal-confirm" v-model="confirmationModal" hide-footer centered>
        <template v-slot:modal-title>
                <div class="container">
                    <h5 id="modal-title-success">Save Changes?</h5>
                </div>
        </template>
        <template v-slot:default>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="2" class="modal-icon">
                        <img src="@/assets/img/update-confirm-icon.png" alt="" width="60px">
                    </b-col>
                    <b-col cols="10">
                        <p id="modal-message">User {{ user.username }} will be changed soon once you click the save button.</p>
                    </b-col>
                </b-row>
                </div>
                <b-row class="button-confirm-group">
                  <b-button @click="updateUser()" type="submit" class="save-button" v-b-modal.modal-success>
                      Save
                  </b-button>
                  <b-button @click="hideModal" class="cancel-button">
                      Cancel
                  </b-button>
                </b-row>
            </div>
        </template>
        </b-modal>
        <b-modal id="modal-success" v-model="successful" hide-footer centered title="Success!">
            <template v-slot:modal-title>
                <div class="container">
                    <h5 id="modal-title-success">Success!</h5>
                </div>
            </template>
            <template v-slot:default>
                <div class = "container">
                    <div class = "info">
                    <b-row>
                        <b-col cols="2" class="modal-icon">
                            <img src="@/assets/img/success-icon.png" alt="" width="60px">
                        </b-col>
                        <b-col cols="10">
                            <p id="modal-message">User {{ user.username }} was successfully changed.</p>
                        </b-col>
                    </b-row>
                    </div>
                    <b-row class="button-detail-group">
                        <router-link :to="{name: 'user'}">
                          <b-button id="ok-button">OK</b-button>
                        </router-link>
                        <!-- <b-button @click="toDetailPage" class="see-button">
                            See Details
                        </b-button> -->
                    </b-row>
                </div>
            </template>
        </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import User from '../../models/user';
import Role from '../../models/role';
import authHeader from '../../services/auth-header';
export default {
  name: 'Register',
  data() {
    return {
      user: {
            name: null,
            noHP : null,
            alamat : null,
            email : null,
            username : null,
            roles: []
        },
        role: new Role('',''),
        submitted: false,
        successful: false,
        message: '',
        selectedRole: null,
        confirmationModal: false,
        roles: [
            { value: null, text: '-- Choose Role --'},
            { value: 'admin', text: 'Admin'},
            { value: 'direktur_utama', text: 'Direktur Utama'},
            { value: 'project_manager', text: 'Project Manager'},
            { value: 'sales_marketing', text: 'Sales Marketing'},
            { value: 'finance', text: 'Finance'},
            { value: 'service_team', text: 'Service Team'},
            { value: 'logistik', text: 'Logistik'},
            { value: 'supervisor', text: 'Supervisor'},
        ],
        url_local: "http://localhost:8080/api/user/",
        url_deploy: "https://sipola-sixab.herokuapp.com/api/user/",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  beforeMount(){
        this.getDetail();
    },
  methods: {
    getDetail: function(){
        axios.get(this.url_deploy +this.$route.params.username, { headers: authHeader() })
        .then(res => {
            this.user = res.data.result;
            this.user.roles.forEach((role) => {
                if(role != "ROLE_USER"){
                    this.selectedRole = role.name.substring(5).toLowerCase();
                }
            });
            })
        .catch(err => this.user = err.data);
    },
    onConfirmation(evt) {
        this.confirmationModal = true;
    },
    hideModal(){
        this.confirmationModal = false;
    },
    updateUser(){
        let roleId = this.getRoleId(this.selectedRole);
        this.selectedRole = "ROLE_" + this.selectedRole.toUpperCase();

        this.role = new Role(roleId, this.selectedRole)
        this.user.roles.push(this.role);
        axios.put(this.url_deploy + this.$route.params.username + '/update', this.user, { headers: authHeader() })
        .then((response) => {
            this.user.username = response.data.result.username
            this.hideModal()
        })
    },
    handleRegister() {
      this.user.role.push(this.selectedRole);
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        // isValid = isValid && checkPasswordConfirmation();
        if (isValid) {
          console.log("Masuk Register Valid");
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
    getRoleId(roleStr){
        switch(roleStr){
            case "admin":
                return 2;
            case "direktur_utama":
                return 3;
            case "project_manager":
                return 4;
            case "sales_marketing":
                return 5;
            case "finance":
                return 6;
            case "service_team":
                return 7;
            case "role_logistik":
                return 8;
            case "supervisor":
                return 9;
            default:
                return 1;
        }
    },
    redirect(){
        this.$router.push({ name: 'user' });
    },
  }
};
</script>

<style scoped>
.add-button{
    width: 100%;
    background-color: white;
    color : #109cf1;
    border-color: #109cf1;
    margin-top: 0px;
    margin-bottom: 10px;
}
.judul{
  text-align: center;
  color: black;
  margin: 11px 0 24px 0;
}
.title-form {
    text-align: center;
    font-weight: 600;
    margin-bottom: 20px;
}
.isi-form{
    margin-left: auto;
    margin-right: auto;
}

.label{
    font-weight: 600;
}

h5{
    margin-bottom: -4px;
}
#breadcrumb{
    font-size: 12px;
    text-decoration: underline;
    margin: -35px 0 -5px -15px;
    color: #FF3E1D;
    background: none;
}
#termsConditions{
    height: 200px;
}
#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  font-size: 12px;
  line-height: 15px;
  border-width: 1px;
}
.save-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 12px;
  margin-right: 10px;
  line-height: 15px;
  width: 120px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
  text-align: center;
}

.cancel-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  border-width: 1px;
  width: 80px;
  line-height: 15px;
  text-align: center;
  font-size: 12px;
}

.see-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 12px;
  margin-left: 10px;
  line-height: 13px;
  width: 120px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
  text-align: center;
}

.back-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  border-width: 1px;
  width: 100px;
  line-height: 15px;
  text-align: center;
  font-size: 12px;
}

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
}

.button-confirm-group{
    float: right;
    margin-top: 20px;
}
.button-detail-group{
    float:right;
    margin-top: 20px;
}

.modal-icon{
    text-align: center;
}

#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
}

#modal-message{
  font-size: 16px;
}
.required label:after {
  content:" *";
  color: red;
}


</style>
