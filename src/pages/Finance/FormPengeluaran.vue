<template>
  <div>
    <b-breadcrumb id="breadcrumb">
      <b-breadcrumb-item :to="{name: 'expense'}">
        Expense
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Add Expense
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h3 class="judul"><strong>Add Expense</strong></h3>
    <div class = "row">
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
          <card class="col">
            <h5 class = "title-form">Add Expense Form</h5>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group class="required">
                    <label class="label" for="nama">Expense Name</label>
                    <b-form-input
                        id="companyName"
                        v-model="newPengeluaran.nama"
                        type="text"
                        required
                        placeholder="Expense Name"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group class="required">
                    <label class="label" for="nominal">Nominal</label>
                    <b-form-input
                        id="companyAddress"
                        v-model="newPengeluaran.nominal"
                        type="number"
                        required
                        placeholder="0"
                        min=0
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group class="required">
                    <label class="label" for="tanggal">Date</label>
                    <b-form-input
                        id="companyName"
                        v-model="newPengeluaran.tanggal"
                        type="date"
                        required
                        placeholder="Date"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group class="required">
                    <label class="label" for="paidBy">Paid by</label>
                    <b-form-input
                        id="companyName"
                        v-model="newPengeluaran.paidBy"
                        type="text"
                        required
                        list="list-name-responsible"
                        placeholder="Paid by"
                        pattern="[a-zA-Z\s]+"
                        >
                    </b-form-input>
                    <b-form-datalist id="list-name-responsible" :options="userName"></b-form-datalist>
                </b-form-group>

                <div class = "button-group">
                  <b-button class = "save-button" type="submit">Save</b-button>
                  <b-button class = "cancel-button" type="reset">Cancel</b-button>
                </div>
              </b-form>
            </card>
        </div>
    </div>

    <b-modal id="modal-success" v-model="successModal" @ok="toDetailPage()" centered>
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
                        <p id="modal-success">Expense was successfully added.</p>
                    </b-col>
                </b-row>
              </div>
            </div>
        </template>
        <template v-slot:modal-footer="{ ok }">
          <b-col class="button-confirm-group">
            <router-link :to="{name: 'expense'}">
              <b-button class="back-button">Back to List</b-button>
            </router-link>
            <b-button @click="ok()" class="see-button">
              See Details
            </b-button>
          </b-col>
        </template>
        </b-modal>

    <b-modal title="Pengeluaran Gagal Tersimpan" v-model="failedModal" centered ok-only>
        .
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import authHeader from '../../services/auth-header';

  export default {
    components : {

    },
    data() {
      return {
            services: [],
            id_services : {id:0},

            newPengeluaran: {
                id: null,
                nama : null,
                nominal : null,
                tanggal : null,
                paidBy : null,
                anyReimbursement : false,
            },

            userName: [],

            successModal : false,
            failedModal : false,
            show: true,
            url_local: "http://localhost:8080/api/pengeluaran/",
            url_deploy: "https://sipola-sixab.herokuapp.com/api/pengeluaran/",
            url_deploy_users: 'https://sipola-sixab.herokuapp.com/api/user/'
        }
    },

    beforeMount() {
      this.getAllUser();
    },

    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            axios.post(this.url_deploy + "add", {
                nama: this.newPengeluaran.nama,
                nominal: this.newPengeluaran.nominal,
                tanggal: this.newPengeluaran.tanggal,
                paidBy: this.newPengeluaran.paidBy,
                createdBy: this.currentUser().name,
                status: "Active",
                anyReimbursement: this.newPengeluaran.anyReimbursement,
            }, { headers: authHeader() })
            .then((response) => {
                this.newPengeluaran.id = response.data.result.id
                this.showMessage(response.data.status)
            })
        },
        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else{
                this.failedModal = true;
            }
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.nama = ''
            this.form.nominal = ''
            this.form.tanggal = null
            this.form.paidBy = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
        toDetailPage(){
            this.$router.replace("/expense/" + this.newPengeluaran.id)
        },
        currentUser() {
          return this.$store.state.auth.user;
        },
        getAllUser: function(){
          axios.get(this.url_deploy_users + 'all', { headers: authHeader() })
          .then(response => {this.users = response.data.result, this.getUserName();});
        },
        getUserName(){
          this.users.map((user) => {
            this.userName.push(user.name);
          });
        },
    }
}
</script>

<style scoped>
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}

.add-button{
    width:360px;
    background-color: white;
    color : #109cf1;
    border-color: #109cf1;
}

.judul{
  text-align: center;
  color: black;
  margin: 11px 0 24px 0;
}

.title-form{
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

.modal-icon{
    text-align: center;
}
.button-confirm-group{
  text-align: right;
}
.button-detail-group{
    float:right;
    margin-top: 50px;
}

#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
  margin-bottom: -4px;
}

#modal-message{
  font-size: 16px;
}
.required label:after {
  content:" *";
  color: red;
}
</style>
