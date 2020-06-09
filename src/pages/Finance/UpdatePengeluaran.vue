<template>
  <div>
        <b-breadcrumb id="breadcrumb">
            <b-breadcrumb-item :to="{name: 'expense'}">
                Expense
            </b-breadcrumb-item>
            <b-breadcrumb-item :to="{name: 'expense-detail'}">
                Detail Expense
            </b-breadcrumb-item>
            <b-breadcrumb-item active>
                Update Expense
            </b-breadcrumb-item>
        </b-breadcrumb>
    <h3 class="judul"><strong>Update Expense</strong></h3>
    <div class = "row">
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
            <card class="col">
            <h5 class = "title-form">Update Expense Form</h5>
            <b-form @reset="onReset" @submit="onConfirmation" v-if="show">
                <b-form-group class="required">
                    <label class="label" for="nama">Expense Name</label>
                    <b-form-input
                        id="companyName"
                        v-model="pengeluaran.nama"
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
                        v-model="pengeluaran.nominal"
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
                        v-model="pengeluaran.tanggal"
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
                        v-model="pengeluaran.paidBy"
                        type="text"
                        required
                        list="list-name-responsible"
                        placeholder="Paid by"
                        pattern="[a-zA-Z0-9\s]+"
                        >
                    </b-form-input>
                    <b-form-datalist id="list-name-responsible" :options="userName"></b-form-datalist>
                </b-form-group>
                <div class = "button-group">
                  <b-button class = "save-button" type="submit">Save</b-button>
                  <router-link :to="{name: 'expense-detail'}">
                    <b-button class="cancel-button" type="reset">Cancel</b-button>
                  </router-link>
                </div>
            </b-form>
            </card>
        </div>
    </div>

    <b-modal id="modal-confirm" v-model="confirmationModal" centered>
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
                        <p id="modal-message">{{pengeluaran.nama}} expense will be changed soon once you click the save button.</p>
                    </b-col>
                </b-row>
                </div>
            </div>
        </template>
        <template v-slot:modal-footer>
          <b-row class="button-confirm-group">
            <b-button @click="updatePengeluaran()" type="submit" class="save-button" v-b-modal.modal-success>
                Save
            </b-button>
            <b-button @click="hideModal" class="cancel-button">
                Cancel
            </b-button>
          </b-row>
        </template>
        </b-modal>
        <b-modal id="modal-success" v-model="successModal" @ok="toDetailPage()" centered title="Success!">
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
                            <p id="modal-message">{{pengeluaran.nama}} expense was successfully changed.</p>
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

            pengeluaran: {
                id: null,
                nama : null,
                nominal : null,
                tanggal : null,
                paidBy : null
            },
            userName: [],
            successModal: false,
            confirmationModal: false,
            show: true,
            url_local: "http://localhost:8080/api/pengeluaran/",
            url_deploy: "https://sipola-sixab.herokuapp.com/api/pengeluaran/",
            url_deploy_users: 'https://sipola-sixab.herokuapp.com/api/user/'
        }
    },

    beforeMount(){
        this.getDetail();
        this.getAllUser();
    },

    methods: {
        onConfirmation(evt) {
          this.confirmationModal = true;
        },
        hideModal(){
            this.confirmationModal = false;
        },
        getDetail: function(){
            axios.get(this.url_deploy + this.$route.params.id, { headers: authHeader() })
            .then(res => {
                this.pengeluaran = res.data.result
                this.pengeluaran.tanggal = res.data.result.tanggal.substring(0,10)
                })
            .catch(err => this.pengeluaran = err.data);
        },
        updatePengeluaran(){
            axios.put(this.url_deploy + this.$route.params.id + '/update', this.pengeluaran, { headers: authHeader() })
            // .then(res => {this.showMessage(res.data.status), this.hideModal();});
            // axios.put("http://localhost:8080/api/pengeluaran/add", {
            //     nama: this.newPengeluaran.nama,
            //     nominal: this.newPengeluaran.nominal,
            //     tanggal: this.newPengeluaran.tanggal,
            //     paidBy: this.newPengeluaran.paidBy,
            //     createdBy: "Suparjo API",
            //     status: "Active"
            // })
            .then((response) => {
                this.pengeluaran.id = response.data.result.id
                this.hideModal()
            })
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
            console.log(" ID 2 : " + this.pengeluaran.id)
            this.$router.replace("/expense/" + this.pengeluaran.id)
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

.button-confirm-group{
  text-align: right;
}

.modal-icon{
    text-align: center;
}

.button-detail-group{
    float:right;
    margin-top: 20px;
    margin-bottom: -2px;
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
