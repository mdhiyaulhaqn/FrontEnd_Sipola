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
        <div class = "col-10 isi-form">
            <card>
            <h5 class = "title-form">Add Expense Form </h5>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group>
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

                <b-form-group>
                    <label class="label" for="nominal">Nominal</label>
                    <b-form-input
                        id="companyAddress"
                        v-model="newPengeluaran.nominal"
                        type="number"
                        required
                        placeholder="Nominal"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group>
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

                <b-form-group>
                    <label class="label" for="paidBy">Paid by</label>
                    <b-form-input
                        id="companyName"
                        v-model="newPengeluaran.paidBy"
                        type="text"
                        required
                        placeholder="Paid by"
                        >
                    </b-form-input>
                </b-form-group>

                <div class = "button-group">

                <router-link to="/expense">
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                </router-link>
                <b-button class = "add-pengeluaran-button" type="submit">Save</b-button>

                </div>
                
            </b-form>
            </card>
        </div>
    </div>

    <b-modal id="modal-success" v-model="successModal" hide-footer centered>
        <template v-slot:modal-title>
        <div class="container">
          <h5 id="modal-title-success">Success!</h5>
        </div>
        </template>
        <template v-slot:default>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="modal-icon">
                        <img src="@/assets/img/success-icon.png" alt="" width="60px">
                    </b-col>
                    <b-col cols="9">
                        <p id="modal-success">{{newPengeluaran.nama}} expense was successfully added.</p>
                    </b-col>
                </b-row>
                </div>
                <b-row class="button-detail-group">
                    <b-button @click="toDetailPage" id ="button-see-detail" variant="outline-primary">
                        See Details
                    </b-button>
                </b-row>
            </div>
        </template>
        </b-modal>

    <b-modal title="Pengeluaran Gagal Tersimpan" v-model="failedModal" centered ok-only>
        .
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
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
                paidBy : null
            },

            successModal : false,
            failedModal : false,
            show: true
        }
    },
    
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            axios.post("http://localhost:8080/api/pengeluaran/add", {
                nama: this.newPengeluaran.nama,
                nominal: this.newPengeluaran.nominal,
                tanggal: this.newPengeluaran.tanggal,
                paidBy: this.newPengeluaran.paidBy,
                createdBy: "Suparjo API",
                status: "Active"
            })
            .then((response) => {
                this.newPengeluaran.id = response.data.result.id
                console.log(response.data.status)
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
            console.log(" ID 2 : " + this.newPengeluaran.id)
            this.$router.replace("/expense/" + this.newPengeluaran.id)
        }
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
    font-size:20px;
    margin-bottom: 20px;
}

.title-form{
    font-weight: 900;
}

.isi-form{
    margin-left: auto;
    margin-right: auto;
}

.label{
    font-weight: 700;
}

.button-group{
    text-align: center;
}

.add-pengeluaran-button{
    margin-left: 10px;
    border-color: #109CF1;
    border-width: 1px;
    background-color: #109CF1;
    color:white;
}

.cancel-button{
    color:#109CF1;
    border-color:#109CF1;
    border-width: 1px;
    background-color: white;
}

.modal-icon{
    text-align: center;
}

.button-detail-group{
    float:right;
    margin-top: 50px;
}

#button-see-detail{
    color: #109CF1;
    border-color: #109CF1;
    border-width: 1px;
}

#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
}
#modal-message{
  font-size: 16px;
}
</style>
