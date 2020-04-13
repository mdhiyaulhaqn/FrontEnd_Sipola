<template>
    <div class="row">
        <div class = "container">
            <b-breadcrumb id="breadcrumb">
                <b-breadcrumb-item :to="{name: 'expense'}">
                    Expense
                </b-breadcrumb-item>
                <b-breadcrumb-item active>
                    Expense Detail
                </b-breadcrumb-item>
            </b-breadcrumb>
            <div class="judul">
                <strong class="judul">
                    Expense Detail
                </strong>
            </div>   
            <card>
                <!-- <div class = "nama-pengeluaran">Tiket Pesawat CGK - Sawangan</div> -->
                <div class = "nama-pengeluaran">{{pengeluaran.nama}}</div>
                <b-row align-h="end">
                    <b-col class="detail-label col-5 col-md-2">Nominal</b-col>
                    <b-col cols="6" class="detail-text">: {{pengeluaran.nominal}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-5 col-md-2">Date</b-col>
                    <b-col cols="6" class="detail-text">: {{pengeluaran.tanggal.split("T")[0].split("-").reverse().join('-')}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-5 col-md-2">Paid by</b-col>
                    <b-col cols="6" class="detail-text">: {{pengeluaran.paidBy}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-5 col-md-2">Created date</b-col>
                    <b-col cols="6" class="detail-text">: {{pengeluaran.createdAt.split("T")[0].split("-").reverse().join('-')}}</b-col>
                </b-row>
                <b-row align-h="end">
                    <b-col class="detail-label col-5 col-md-2">Created by</b-col>
                    <b-col cols="6" class="detail-text">: {{pengeluaran.createdBy}}</b-col>
                </b-row>
                <b-row class="button-group">
                    <b-col>
                        <br>
                        <button v-b-modal.modal-delete id ="delete_button" class="btn btn-primary">
                            Delete
                        </button>
                        <button id ="edit_button" class="btn btn-primary" @click="editPage">
                            Edit
                        </button>
                    </b-col>
                </b-row>

            </card>
        </div>

         <b-modal id="modal-delete" ref="modal-delete" hide-footer centered title="Delete Expense">
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="modal-icon">
                        <img src="@/assets/img/delete-confirm-icon.png" alt="" width="60px">
                    </b-col>
                    <b-col cols="9">
                        Tiket Pesawat CGK - Sawangan will be removed from expense list.
                    </b-col>
                </b-row>
                </div>
                <b-row>
                    <b-col class="button-confirm-group">
                         <b-button @click="deletePengeluaran()" id ="confirm_delete_button" variant="outline-danger">
                            Yes, Delete it
                        </b-button>
                        <b-button @click="hideModal" id ="cancel_delete_button" class="btn btn-danger">
                            No
                        </b-button>
                    </b-col>
                </b-row>
                <!-- <div class = "tombol_okay">
                    <b-row>
                        <b-button class = "button_back" @click="hideModal" size="md" variant="primary">Okay</b-button>
                    </b-row>
                </div> -->
        
            </div>
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
                    <p id="modal-message">{{pengeluaran.nama}} was successfully deleted from expense list.</p>
                    </b-col>
                </b-row>
                </div>
                <b-row class="button-detail-group">
                    <b-button @click="redirect()" id="ok-button" variant="outline-primary">
                        OK
                    </b-button>
                </b-row>
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

export default {
  data() {
    return {
      pengeluaran : {
          nama: '',
          tanggal : ''
      },
      successModal: false,
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
            axios.get('http://localhost:8080/api/pengeluaran/' +this.$route.params.id)
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
        axios.put('http://localhost:8080/api/pengeluaran/' + this.$route.params.id + '/delete', this.pengeluaran)
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
        
  }
};
</script>

<style scoped>
body {
    font-family: 'Muli', sans-serif;
    background: #fafafa;
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
    font-size:20px;
    margin-bottom: 20px;
    font-weight: 10000;
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

.button-group{
    text-align: center;
}

button{
    border-radius: 8px;
}

#delete_button{
    font-size: 10px;
    width: 56;
    background-color: #ff3e1d;
    color:white;
    border-color: white;
}
#edit_button{
    font-size: 10px;
    width: 130px;
    background-color: #109CF1;
    color:white;
    border-color: white;
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
    text-align: right;
    margin-top: 50px;
}

#confirm_delete_button{
    font-size: 10px;
    width: 130px;
    border-color: #ff3e1d;
    border-width: 1px;
    margin-right: 10px;
}

#cancel_delete_button{
    font-size: 10px;
    background-color: #ff3e1d;
    color:white;
    border-color: white;
    border-width: 1px;
}

.button_back{
    background-color: #109CF1;
    color:white;
    border-color: white;
    /* float:right; */
    /* margin-top: 40px; */
}

.button-detail-group{
    float:right;
    margin-top: 50px;
    margin-right: 10px;
}

#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
}
#modal-message{
  font-size: 16px;
}

#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  border-width: 1px;
  background-color: white;
}

</style>