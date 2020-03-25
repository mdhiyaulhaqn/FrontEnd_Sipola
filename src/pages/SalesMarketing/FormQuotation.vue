<template>
  <div>
    <h3 class="judul"><strong>Add Quotation</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <h5 class = "title-form">Add Quotation Form </h5>
            <b-form @submit="onSubmit" v-if="show">
                <div class = "row">
                    <div class = "col-7">
                        <b-form-group>
                            <label for="noQuotation">Quotation No</label>
                            <b-form-input
                                id="noQuotation"
                                v-model="new_quotation.noQuotation"
                                type="text"
                                required
                                placeholder="Quotation Number">
                            </b-form-input>
                        </b-form-group>
                    </div>
             
                    <div class = "col-5">
                        <div style="color:black">
                        <b-form-group>
                            <label for="date">Quotation Date</label>
                            <b-form-input
                                id="date"
                                v-model="new_quotation.date"
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
                        v-model="new_company.nama"
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
                        v-model="new_company.alamat"
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
                        v-model="new_quotation.termsCondition"
                        type="text"
                        required
                        placeholder="Terms and Conditions"
                        >
                    </b-form-textarea>
                </b-form-group>

                <div class = "button-group">
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                    <b-button class = "add-quotation-button" type="submit">Add</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>
    <b-modal title="Quotation Berhasil Tersimpan" v-model="successModal" @ok="redirect()"  centered ok-only>
        Quotation telah berhasil dibuat.
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

            new_quotation : {
                createdBy : "adi",
                date : '',
                noQuotation : '',
                termsCondition : '',
                status : 'Active',
                company : '',
                service : '',
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
            send : {objects : null},
        }
    },

    beforeMount() {
      this.addRow();
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

        onSubmit(evt) {
            evt.preventDefault();
            this.new_quotation.company = this.new_company;
            this.new_quotation.service = this.services;
            this.addQuotation(JSON.stringify(this.new_quotation));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            } 
        },
        
        addQuotation(quot){
            console.log("cihuy")
            axios.post('http://localhost:8080/api/quotation/add', 
            quot, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.new_quotation = res.data.result, this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'detail-quotation',  params: {id:this.new_quotation.id}});
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

</style>
