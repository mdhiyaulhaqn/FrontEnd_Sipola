<template>
  <div>
    <h3 class="judul"><strong>Update Quotation</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>sss
            <h5 class = "title-form">Update Quotation Form </h5>
            <b-form @submit="onModal" v-if="show">
                <div class = "row">
                    <div class = "col-md-7 col-12">
                        <b-form-group>
                            <label for="noQuotation">Quotation No</label>
                            <b-form-input
                                id="noQuotation"
                                v-model="quotation.noQuotation"
                                type="text"
                                required
                                placeholder="Quotation Number"
                                disabled>
                            </b-form-input>
                        </b-form-group>
                    </div>
             
                    <div class = "col-md-5 col-12">
                        <div style="color:black">
                        <b-form-group>
                            <label for="date">Quotation Date</label>
                            <b-form-input
                                id="date"
                                v-model="quotation.date"
                                type="date"
                                required>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                </div>

                <b-form-group>
                    <label for="companyName">Company Name</label>
                    <b-form-input
                        id="companyName"
                        v-model="quotation.company.nama"
                        type="text"
                        required
                        placeholder="Company Name"
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group>
                    <label for="companyAddress">Company Address</label>
                    <b-form-input
                        id="companyAddress"
                        v-model="quotation.company.alamat"
                        type="text"
                        required
                        placeholder="Company Address"
                        >
                    </b-form-input>
                </b-form-group>

                 <div class="d-none d-md-block d-lg-block">
                    <div class="row">
                        <div class = "col-md-6">
                            <label>Scope of Works</label>
                        </div>
                        <div class = "col-md-2">
                            <label>Quantity</label> 
                        </div>
                        <div class = "col-md-3">
                            <label>Unit Price</label> 
                        </div>
                        <div class = "col-md-1">
                        </div>
                        <br>
                    </div>
                </div>

                <b-row class="services" v-bind:key="item.id_service" v-for="item in services">
                    <b-col>
                    <Service v-bind:service="item" v-on:del-service="deleteRow" />
                    </b-col>
                </b-row> 
                    
                <b-row>
                    <b-col md="12">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">+ Add Scope of Works</button>
                    </b-col>
                </b-row> 

                
                <b-form-group>
                    <label for="termsConditions">Terms and Conditions</label>
                    <b-form-textarea
                        id="termsConditions"
                        v-model="quotation.termsCondition"
                        type="text"
                        required
                        placeholder="Terms and Conditions"
                        >
                    </b-form-textarea>
                </b-form-group>

                <div class = "button-group">
                    <router-link :to="{name: 'detail-quotation', params: {id:quotation.id}}">
                    <b-button class = "cancel-button">Cancel</b-button>
                    </router-link >
                    <b-button class = "add-quotation-button" type="submit">Update</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>

    <b-modal id="modal-hide" ref="modal-download" v-model="warningModal" hide-footer centered title="Save Changes?" ok-only>
        <br>
        <div class = "container">
            <div class = "info">
            <b-row>
                Quotation no {{quotation.noQuotation}} will be changed soon once you click the save button.
            </b-row>
            </div>
            <div class = "tombol_okay">
                <b-row>
                    <b-button id="cancel_update_button" @click="hideModal" size="md" variant="primary">Cancel</b-button>
                    <b-button id="confirm_update_button" @click="onSubmit" size="md" variant="primary">Save</b-button>
                </b-row>
            </div>
    
        </div>
    </b-modal>

    <b-modal title="Success!" v-model="successModal" hide-footer centered>
         <br>
        <div class = "container">
            <div class = "info">
            <b-row>
                 Quotation no {{quotation.noQuotation}} was successfully changed.
            </b-row>
            </div>
            <div style="float:right">
                <b-row>
                    <b-button id="cancel_update_button" @click="redirect" size="md" variant="primary">See Details</b-button>
                </b-row>
            </div>
    
        </div>
       
    </b-modal>

    <b-modal title="Quotation Gagal Tersimpan" v-model="failedModal" centered ok-only>
        Quotation gagal dibuat.
    </b-modal>
  </div>
</template>

<script>

import Service from '@/pages/SalesMarketing/Service.vue';
import axios from 'axios';

export default {
    components : {
      Service
    },
    
    data() { 
      return {
            services: [],
            id_services : {id:0},
            timestamp:"",

            quotation : {
                
            },
            new_service : {
                id_service : 0,
                nama : '',
                harga : '',
                quantity : '',
                quotation : '',
            },
            new_company : {
                nama : '',
                alamat : '',
                quotation : '',
            },
            show: true,
            successModal : false,
            failedModal : false,
            warningModal : false,
            send : {objects : null},
        }
    },

    beforeMount() {
        this.getDetail();
	},
    
    methods: {
        addRow(){
            this.new_service.id_service++;
            let service = Object.assign({}, this.new_service);
            this.services.push(service)
        },

        deleteRow(id_service){
            this.services = this.services.filter(result => result.id_service !== id_service);
        },

        onModal(evt) {
            this.warningModal = true;
        },

        onSubmit(evt) {
            this.$refs['modal-download'].hide();

            evt.preventDefault();
            
            this.quotation.service = this.services;
            
            this.updateQuotation(JSON.stringify(this.quotation));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            } 
        },
        
        fetchService : function(){
            let service_quot = this.quotation.service
            for(let i=0; i< service_quot.length ; i++){
                this.new_service.id_service++;
                this.new_service.nama = service_quot[i].nama;
                this.new_service.harga = service_quot[i].harga;
                this.new_service.quantity = service_quot[i].quantity;

                let service = Object.assign({}, this.new_service);
                this.services.push(service);

                this.new_service.nama = ''
                this.new_service.harga = ''
                this.new_service.quantity = ''
                this.new_service.quotation = ''
            }
        },

        getDetail: function(){
            axios.get('http://localhost:8080/api/quotation/' +this.$route.params.id)
            .then(res => {this.quotation = res.data, this.fetchService()})
            .catch(err => this.quotation = err.data);
        },
        
        updateQuotation(quot){
            console.log("cihuy")
            console.log(this.quotation.service)
            axios.put('http://localhost:8080/api/quotation/update/' + this.$route.params.id, 
            quot, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.quotation = res.data.result, this.showMessage(res.data.status)});
        },

       redirect(){
            this.$router.push({ name: 'detail-quotation',  params: {id:this.quotation.id}});
        },

        hideModal(){
		  	this.$refs['modal-hide'].hide();
		},
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
.isi-form{
    margin-left: auto;
    margin-right: auto;
}

#cancel_update_button{
    font-size: 10px;
    border-color: #109CF1;
    color:#109CF1;
    background-color: white;
    border-width: 1px;
    margin-right: 10px;
}

#confirm_update_button{
    font-size: 10px;
    background-color: #109CF1;
    color:white;
    border-color: white;
}

.add-quotation-button{
    border-color: white;
    background-color: #109CF1;
    color:white;
}

.cancel-button{
    color:#109CF1;
    border-color:#109CF1;
    background-color: white;
}

.button-group{
    float:right;
}

.ti-download{
    margin-left:10px;
    margin-right: 10px;
}

.button_ok{
    background-color: #109CF1;
    color:white;
    border-color: white;
    float:right;
    margin-top: 40px;
}

.button_back{
    background-color: white;
    color:#109CF1;
    float:right;
    margin-top: 40px;
}

.tombol_okay{
    float:right;
}
</style>
