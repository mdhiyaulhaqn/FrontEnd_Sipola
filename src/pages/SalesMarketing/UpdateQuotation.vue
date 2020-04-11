<template>
  <div>
    <h3 class="judul"><strong>Update Quotation</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>sss
            <h5 class = "title-form">Update Quotation Form </h5>
            <b-form @submit="onModal" v-if="show">
                <div class = "row">
                    <div class = "col-7">
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
             
                    <div class = "col-5">
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

                <b-row>
                    <b-col md="6">
                      <label>Scope of Works</label>
                    </b-col><br>

                    <b-col md="2">
                    <label>Quantity</label> 
                    </b-col><br>

                    <b-col md="3">
                    <label>Unit Price</label> 
                    </b-col>
                    <br>

                    <b-col md="1">
                    
                    </b-col>
                </b-row>

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
                <span class="ti-download"></span>Quotation no {{quotation.noQuotation}} will be changed soon once you click the save button.
            </b-row>
            </div>
            <div class = "tombol_okay">
                <b-row>
                    <b-button class = "button_back" @click="hideModal" size="md" variant="primary">Cancel</b-button>
                    <b-button class = "button_ok" @click="onSubmit" size="md" variant="primary">Save</b-button>
                </b-row>
            </div>
    
        </div>
    </b-modal>
    <b-modal title="Quotation Berhasil Terubah" v-model="successModal" @ok="redirect()" centered ok-only>
        Quotation telah berhasil Diubah.
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

            quotation : '',
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
        this.addRow();
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
            evt.preventDefault();
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

        getDetail: function(){
            axios.get('http://localhost:8080/api/quotation/' +this.$route.params.id)
            .then(res => {this.quotation = res.data, this.services = res.data.service})
            .catch(err => this.quotation = err.data);
            console.log(quotation);
        },
        
        updateQuotation(quot){
            console.log("cihuy")
            axios.put('http://localhost:8080/api/quotation/update/' + this.$route.params.id, 
            quot, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.quotation = res.data.result, this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'quotation'});
        },

        // Gajadi dipake soalnya udah dihandle di backend
        // submitCompany() {
        //     console.log("cihuy22");
        //     this.new_company.quotation = this.new_quotation;
        //     this.addCompany(JSON.stringify(this.new_company));
        // },

        // addCompany(company){
        //     console.log("cihuy333")
        //     axios.post('http://localhost:8080/api/company/add', 
        //     company, 
        //         { headers: {
        //             'Content-Type': 'application/json',
        //         }
        //     })
        //     .then(res => {this.new_company = res.data.result, this.submitService()});
        // },

        // submitService() {
        //     console.log("cihuy4444")
        //     for (var i = 0; i < this.services.length; i++) {
        //         this.services[i].quotation = this.new_quotation;
        //     }
        //     this.addServices(JSON.stringify(this.services));
        //     console.log("yuhuhu");
        // },

        // addServices(n_services){
        //     console.log("cihuy55555")
        //     axios.post('http://localhost:8080/api/service/add', 
        //     n_services, 
        //         { headers: {
        //             'Content-Type': 'application/json',
        //         }
        //     })
        //     .then(res => {this.showMessage(res.data.status)});
        // },

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
