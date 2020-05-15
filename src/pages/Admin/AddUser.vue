<template>
  <div>
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
        <div class = "col-10 isi-form">
            <card>
            <form name="form" @submit.prevent="handleRegister">
                
                <h5 class = "title-form">Personal Information </h5>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group>
                            <label for="Name">Name</label>
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
                        <b-form-group>
                            <label for="Address">Address</label>
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
                        <b-form-group>
                            <label for="Phone Number">Phone Number</label>
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
                        <b-form-group>
                            <label for="Email">Email</label>
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
                        <b-form-group>
                            <label for="Role">Role</label>
                            <b-form-select v-model="selectedRole" :options="roles"></b-form-select>
                            <div
                                v-if="submitted && errors.has('role')"
                                class="alert-danger"
                                >{{errors.first('role')}}</div>
                        </b-form-group>
                    </div>  
                </b-row>
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group>
                            <label for="Username">Username</label>
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
                        <b-form-group>
                            <label for="Password">Password</label>
                            <b-form-input
                                id="Password"
                                v-model="user.password"
                                min="6"
                                type="password"
                                class="form-control"
                                name="password"
                                required
                                placeholder="Password">
                            </b-form-input>
                        </b-form-group>
                    </div>  
                </b-row>
                <!-- <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group>
                            <label for="PasswordConfirmation">Password Confirmation</label>
                            <b-form-input
                                id="PasswordConfirmation"
                                type="password"
                                required
                                placeholder="Password Confirmation">
                            </b-form-input>
                        </b-form-group>
                    </div>  
                </b-row> -->
                <div class = "button-group">
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                    <b-button class = "save-button" type="submit">Add</b-button>
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
    <b-modal
        id="modal-success"
        centered
        v-model="successful"
        @ok="redirect()"
        >
        <template v-slot:modal-title>
        <div class="container">
            <h5 id="modal-title-success">Success!</h5>
        </div>
        </template>
        <template v-slot:default>
        <div class="container">
            <b-row>
            <b-col class="modal-icon col-2">
                <img src="@/assets/img/success-icon.png" alt="" width="50px">
            </b-col>
            <b-col class="col-10">
                <p id="modal-message">User was successfully added.</p>
            </b-col>
            </b-row>
        </div>
        </template>
        <template v-slot:modal-footer="{ ok }">
        <b-col class="button-confirm-group">
            <b-button @click="ok()" id="ok-button" variant="outline-primary">
                Ok
            </b-button>
        </b-col>
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
    }
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
    margin: 5px 0 24px 0;
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

.save-button{
    background-color: #109CF1;
    color:white;
    border-color: transparent;
    font-size: 10px;
    margin-left: 10px;
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
    font-size: 10px;
}

.button-group{
    margin-top: 30px;
    text-align: center;
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
#ok-button{
    color:#109CF1;
    border-color:#109CF1;
    background-color: white;
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

</style>
