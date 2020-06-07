<template>
<div class="row">
  <div class="col-12">
    <b-breadcrumb id="breadcrumb">
      <b-breadcrumb-item :to="{name: 'user'}">
        User
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Add User
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h3 class="judul"><strong>Add User</strong></h3>
    <div class = "row">
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
            <card class="col">
            <form name="form" @submit.prevent="handleRegister">
                <h5 class = "title-form">Personal Information </h5>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="Name">Name</label>
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
                            <label class="label" for="Role">Role</label>
                            <b-form-select v-model="selectedRole" :options="roles" required>
                                <!-- <input :required="!selected"> -->
                            </b-form-select>
                            <div
                                v-if="submitted && errors.has('role')"
                                class="alert-danger"
                                >{{errors.first('role')}}</div>
                        </b-form-group>
                    </div>
                </b-row>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="Username">Username</label>
                            <b-form-input
                                id="Username"
                                v-model="user.username"
                                type="text"
                                class="form-control"
                                name="username"
                                required
                                placeholder="Username">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </b-row>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="Password">Password</label>
                            <b-form-input
                                id="Password"
                                v-model="user.password"
                                min="6"
                                type="password"
                                class="form-control"
                                name="password"
                                ref="password"
                                :state="checkPassword"
                                aria-describedby="password-help password-feedback"
                                required
                                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"
                                placeholder="Password">
                            </b-form-input>

                            <b-form-invalid-feedback id="password-feedback">
                              {{ invalidFeedbackPassword }}
                            </b-form-invalid-feedback>

                            <b-form-text id="password-help">Password must be alphanumeric and at least 6 characters.</b-form-text>
                        </b-form-group>
                    </div>
                </b-row>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="password_confirmation">Password Confirmation</label>
                            <b-form-input
                                id="password_confirmation"
                                v-model="PasswordConfirmation"
                                type="password"
                                class="form-control"
                                name="password_confirmation"
                                :state="checkPasswordConfirmation"
                                aria-describedby="confirm-password-feedback"
                                 data-vv-as="password"
                                required
                                placeholder="Password Confirmation">
                            </b-form-input>
                            <b-form-invalid-feedback id="confirm-password-feedback">
                              {{ invalidFeedbackPasswordConfirmation }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </div>
                </b-row>
                <div class="alert alert-danger" v-show="errors.any()">
                    <div v-if="errors.has('password')">
                        {{ errors.first('password') }}
                    </div>
                    <div v-if="errors.has('password_confirmation')">
                        {{ errors.first('password_confirmation') }}
                    </div>
                    <div v-else>

                    </div>
                </div>
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
                            <p id="modal-message">User was successfully created.</p>
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
import User from '../../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', [], '', '', ''),
      submitted: false,
      successful: false,
      message: '',
      selectedRole: null,
      PasswordConfirmation: '',
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
      ]
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    checkPassword(){
      if (this.user.password === '') return null
      return this.user.password.length >= 6 && new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$").test(this.user.password)? true : false
    },
    checkPasswordConfirmation(){
      if (this.user.password === '') return null
      if (this.PasswordConfirmation === '') return null
      return this.user.password === this.PasswordConfirmation ? true : false
    },
    invalidFeedbackPassword(){
      if (this.user.password === '') return ''
      if (this.user.password.length < 6) return 'Please enter at least 6 characters.'
      if (!new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$").test(this.user.password)) return 'Please enter a combination of letter and number.'
    },
    invalidFeedbackPasswordConfirmation(){
      if (this.PasswordConfirmation === null) return ''
      else if (this.user.password != this.PasswordConfirmation) return 'Password did not match.'
    },
  },
  mounted() {
    // if (this.loggedIn) {
    //   this.$router.push('/profile');
    // }
  },
  methods: {
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
    // checkPasswordConfirmation(){
    //     return this.user.password == this.passwordConfirmation;
    // },
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
  font-weight: 600;
  margin-bottom: 20px;
}
.isi-form{
  margin-left: auto;
  margin-right: auto;
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

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
}
.label{
    font-weight: 600;
}
#modal-message{
    font-size: 16px;
}
#modal-title-success{
    color: #109CF1;
    font-weight: 1000;
}

.button-confirm-group{
    text-align: right;
}
h5{
    margin-bottom: -4px;
}
#breadcrumb{
    font-size: 12px;
    /* text-decoration: underline; */
    margin: -35px 0 -5px -15px;
    color: #FF3E1D;
    background: none;
}
#termsConditions{
    height: 200px;
}

.button-detail-group{
    float:right;
    margin-top: 20px;
}
.required label:after {
  content:" *";
  color: red;
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
#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  font-size: 12px;
  line-height: 15px;
  border-width: 1px;
}
</style>
