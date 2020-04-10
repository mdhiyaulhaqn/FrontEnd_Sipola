<template>
  <div>
    <h3 class="judul"><strong>Update Expense</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <h5 class = "title-form">Update Expense Form </h5>
            <b-form @reset="onReset" v-if="show">
                <b-form-group>
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

                <b-form-group>
                    <label class="label" for="nominal">Nominal</label>
                    <b-form-input
                        id="companyAddress"
                        v-model="pengeluaran.nominal"
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
                        v-model="pengeluaran.tanggal"
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
                        v-model="pengeluaran.paidBy"
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
                <b-button class = "update-pengeluaran-button" v-b-modal.modal-confirm>Save</b-button>

                </div>
                
            </b-form>
            </card>
        </div>
    </div>

    <b-modal id="modal-confirm" ref="modal-confirm" hide-footer centered title="Update Expense">
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="modal-icon">
                        <img src="@/assets/img/update-confirm-icon.png" alt="" width="60px">
                    </b-col>
                    <b-col cols="9">
                        Expense will be changed soon once you click the save button
                    </b-col>
                </b-row>
                </div>
                <b-row>
                    <b-col class="button-confirm-group">
                        <b-button @click="hideModal" id ="cancel_update_button" class="cancel-button"> 
                            Cancel
                        </b-button>
                        <b-button @click="updatePengeluaran()" type="submit" id ="confirm_delete_button" class="update-pengeluaran-button" v-b-modal.modal-success>
                            Save
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

    <b-modal id="modal-success" ref="modal-success" hide-footer centered title="Success!">
			<br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="modal-icon">
                        <img src="@/assets/img/success-icon.png" alt="" width="60px">
                    </b-col>
                    <b-col cols="9">
                        {{this.pengeluaran.nama}} expense was successfully updated.
                    </b-col>
                </b-row>
                </div>
                <b-row class="button-detail-group">
                    <b-row class="button-detail-group">
                        <b-button @click="toDetailPage" id ="sad" variant="outline-primary">
                            See Details
                        </b-button>
                    </b-row>
                </b-row>
            </div>
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
            pengeluaran: '',
            pengeluaran: {
                id: null,
                nama : null,
                nominal : null,
                tanggal : null,
                paidBy : null
            },
            
            show: true
        }
    },

    beforeMount(){
        this.getDetail();
    },
    
    methods: {
        hideModal(){
            this.$refs['modal-confirm'].hide();
        },
        getDetail: function(){    
            axios.get('http://localhost:8080/api/pengeluaran/' +this.$route.params.id)
            .then(res => {this.pengeluaran = res.data})
            .catch(err => this.pengeluaran = err.data);
        },
        updatePengeluaran(){
            axios.put('http://localhost:8080/api/pengeluaran/' + this.$route.params.id + '/update', this.pengeluaran)
            // .then(res => {this.showMessage(res.data.status)});
            // axios.put("http://localhost:8080/api/pengeluaran/add", {
            //     nama: this.newPengeluaran.nama,
            //     nominal: this.newPengeluaran.nominal,
            //     tanggal: this.newPengeluaran.tanggal,
            //     paidBy: this.newPengeluaran.paidBy,
            //     createdBy: "Suparjo API",
            //     status: "Active"
            // })
            .then((response) => {
                console.log("Object : " + response.data)
                this.pengeluaran.id = response.data.id
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
        }
    }
}
</script>

<style scoped>

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

.update-pengeluaran-button{
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

.button-confirm-group{
    text-align: right;
    margin-top: 50px;
}

.ti-angle-down{
    font-size: 50px;
    text-align: center;
    color:#109CF1;
}

.button-detail-group{
    float:right;
}


</style>
