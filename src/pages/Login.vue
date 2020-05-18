<template>
<div class = "row">
<div class = "col-md-6">
  <div class = "logo-luar">
        <img class="logo-sipola" src="@/assets/img/sipola-icon.png" alt="">
        <div class = "logo-text">
          PT SIXAB TEHNIK INDUSTRI
        </div>
    </div>
</div>
  <div class="col-md-6">
    <div class="card card-container">
       <img class = "profile-img-card" src="@/assets/img/user-icon.png" alt="" width="30px" style="margin-top:5px">
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">
            <div class = "text-form">Username</div>

            </label>
          <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="username"
          />
          <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >Username is required!</div>
        </div>
        <div class="form-group">
          <label for="password">
            <div class = "text-form">Password</div>

            </label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>


.logo-luar{
  padding-top: 10%;
  padding-left:15%;
}
.logo-sipola{
  width:60%;
  height:60%;
}
.logo-text{
  font-size: 30px;
  font-weight:bold;
  padding-left:9%;
  color:#BD2640;
}

label {
  display: block;
  margin-top: 10px;
  color:white;
}

.text-form{
  color: white;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #bd2640;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>