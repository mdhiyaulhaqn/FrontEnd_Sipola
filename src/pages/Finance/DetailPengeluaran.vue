<template>
    <div>
        <b-breadcrumb id="breadcrumb">
            <b-breadcrumb-item :to="{name: 'expense'}">
                Expense
            </b-breadcrumb-item>
            <b-breadcrumb-item active>
                Detail Expense
            </b-breadcrumb-item>
        </b-breadcrumb>
        <h3 class="judul"><strong>Detail Expense</strong></h3>
        <div class="row">
          <div class="col-md-10 col-sm-10 col-xs-10 col-12 d-block d-xs-block d-sm-block center">
            <card class="col">
                <!-- <div class = "nama-pengeluaran">Tiket Pesawat CGK - Sawangan</div> -->
                <div class = "nama-pengeluaran">{{pengeluaran.nama}}</div>
                <b-row align-h="end">
                    <b-col class="detail-label col-6 col-md-2">Nominal</b-col>
                    <b-col cols="6" class="detail-text">: Rp{{formatPrice(pengeluaran.nominal)}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-6 col-md-2">Expense Date</b-col>
                    <b-col cols="6" class="detail-text">: {{pengeluaran.tanggal | moment("ll")}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-6 col-md-2">Paid by</b-col>
                    <b-col cols="6" class="detail-text">: {{pengeluaran.paidBy}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-6 col-md-2">Created at</b-col>
                    <b-col cols="6" class="detail-text">: {{pengeluaran.createdAt.slice(0, 19) | moment('lll')}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-6 col-md-2">Created by</b-col>
                    <b-col cols="6" class="detail-text">: {{pengeluaran.createdBy}}</b-col>
                </b-row>
                <b-row>
                  <div class = "button-group col-sm-12" v-if="!pengeluaran.anyReimbursement">
                    <b-button v-b-modal.modal-delete id ="delete-button" class="btn btn-primary">
                        Delete
                    </b-button>
                    <b-button id ="edit-button" class="btn btn-primary" @click="editPage">
                        Edit
                    </b-button>
                  </div>
                </b-row>
                <b-row v-if="pengeluaran.anyReimbursement">
                    <b-col class="col-md-12 text-center" style="color:red; font-weight: bold;">*This expense can’t be edited because it’s part of reimbursement.</b-col>
                </b-row>
            </card>
          </div>
        </div>

         <b-modal id="modal-delete" ref="modal-delete" hide-footer centered>
            <template v-slot:modal-title>
                <div class="container">
                    <h5 id="modal-title-delete-confirm">Delete Expense?</h5>
                </div>
            </template>
            <template v-slot:default>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="modal-icon">
                        <img src="@/assets/img/delete-confirm-icon.png" alt="" width="60px">
                    </b-col>
                    <b-col cols="9">
                        <p id="modal-message">{{pengeluaran.nama}} will be removed from the list.</p>
                    </b-col>
                </b-row>
                </div>
                <b-row class="button-confirm-group">
                  <b-button @click="deletePengeluaran()" id ="confirm_delete_button" variant="outline-danger">
                      Yes, delete it
                  </b-button>
                  <b-button @click="hideModal" id ="cancel_delete_button" class="btn btn-danger">
                      Cancel
                  </b-button>
                </b-row>
            </div>
        </template>
        </b-modal>
        <b-modal
            id="modal-success"
            ref="modal-success"
            hide-footer
            centered
            v-model="successModal"
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
                    <p id="modal-message">{{pengeluaran.nama}} expense was successfully deleted from list.</p>
                    </b-col>
                </b-row>

                <b-row class="button-detail-group">
                    <b-button @click="redirect()" id="ok-button">
                        OK
                    </b-button>
                </b-row>
                </div>
            </template>
            <!-- <template v-slot:modal-footer="{ ok }">
                <b-col class="button-confirm-group">
                <b-button @click="ok()" id="ok-button" variant="outline-primary">
                    OK
                </b-button>
                </b-col>
            </template> -->
        </b-modal>

    </div>


</template>

<script>
import axios from 'axios';
import moment from 'moment';
import authHeader from '../../services/auth-header';

export default {
  data() {
    return {
      pengeluaran : {
          nama: '',
          tanggal : '',
          createdAt: [],
      },
      successModal: false,
      url_local: "http://localhost:8080/api/pengeluaran/",
      url_deploy: "https://sipola-sixab.herokuapp.com/api/pengeluaran/",
    };
  },
  beforeMount(){
      this.getDetail();
    //   this.formatTanggal();
  },
  methods:{
    hideModal(){
        this.$refs['modal-delete'].hide();
    },
    getDetail: function(){
            axios.get(this.url_deploy + this.$route.params.id, { headers: authHeader() })
            .then(res => {this.pengeluaran = res.data.result})
            .catch(err => this.pengeluaran = err.data);
    },
    formatTanggal() {
        console.log(this.pengeluaran.nama)
        console.log(this.pengeluaran.tanggal.substring(0,1))
        this.pengeluaran.tanggal = new Date(this.pengeluaran.tanggal)
        console.log("Tangaal  : " + this.pengeluaran.tanggal)
        console.log("Tanggal  : " + this.pengeluaran.tanggal.getMonth())
        // console.log("Tanggal")
        // console.log("FORMAT : " + moment(this.pengeluaran.tanggal)).format('MM/DD/YYYY hh:mm')
        // this.pengeluaran.tanggal = moment(this.pengeluaran.tanggal).format('MM/DD/YYYY hh:mm')
    },
    showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else{
                this.failedModal = true;
            }
        },
    deletePengeluaran(){
        axios.put(this.url_deploy + this.$route.params.id + '/delete', this.pengeluaran, { headers: authHeader() })
        .then(res => {
            this.showMessage(res.data.status)
            console.log(res.data.status)
            this.hideModal()
        });

    },
    editPage(){
        this.$router.replace(name= this.pengeluaran.id + '/update')
    },
    redirect(){
        this.$router.push({ name: 'expense'});
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
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

.nama-pengeluaran{
    text-align: center;
    color: black;
    font-size:20px;
    margin-bottom: 50px;
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

#edit-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  width: 110px;
  margin-left: 10px;
  line-height: 15px;
  font-size: 12px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
}

#delete-button{
  background-color: #FF3E1D;
  border-color: #FF3E1D;
  width: 80px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
}

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
}

.ti-trash{
    font-size: 50px;
    text-align: center;
    color:#ff3e1d;
}

.modal-icon{
    text-align: center;
}

.button-confirm-group{
    float: right;
    margin-top: 20px;
    margin-bottom: -2px;
}

#confirm_delete_button{
  font-size: 12px;
  width: 110px;
  border-color: #ff3e1d;
  border-width: 1px;
  margin-right: 10px;
  line-height: 15px;
}
#cancel_delete_button{
  font-size: 12px;
  background-color: #ff3e1d;
  color:white;
  border-color: white;
  border-width: 1px;
  line-height: 15px;
}

.button-detail-group{
    float:right;
    margin-top: 20px;
    margin-bottom: -2px;
}

#modal-title-delete-confirm{
  color: #FF3E1D;
  font-weight: 1000;
  margin-bottom: -4px;
}

#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
  margin-bottom: -4px;
}
#modal-message{
  font-size: 16px;
}

#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  font-size: 12px;
  line-height: 15px;
  border-width: 1px;
}

.reimburse-alert{
    color: red;
}

</style>
