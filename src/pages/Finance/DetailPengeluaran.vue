<template>
    <div class="row">
        <div class = "container">
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
			<br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="ti-trash"></b-col>
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
      }
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
            .then(res => {this.pengeluaran = res.data})
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
    deletePengeluaran(){
        axios.put('http://localhost:8080/api/pengeluaran/' + this.$route.params.id + '/delete', this.pengeluaran)
        .then(res => {this.showMessage(res.data.status)});
    },
    editPage(){
        console.log("MASUK EDIT")
        this.$router.replace(name= this.pengeluaran.id + '/update')
    }
        
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

.button-confirm-group{
    text-align: right;
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

/* @media (max-width: 684px) { 
    .detail-label{
        text-align: right;
    }
 } */
</style>