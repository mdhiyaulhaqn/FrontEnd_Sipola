<template>
  <div>
    <h3 class="judul">
        <strong>Update Invoice</strong>
    </h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <h5 class = "title-form">Update Invoice Form</h5>
            <b-form @submit="onModal" v-if="show">
                <div class = "row">
                    <div class = "col-md-6 col-12">
                        <b-form-group>
                            <label for="noInvoice">Invoice No</label>
                            <b-form-input
                                id="noInvoice"
                                v-model="invoice.noInvoice"
                                type="text"
                                required
                                disabled="">
                            </b-form-input>
                        </b-form-group>
                    </div>
             
                    <div class = "col-md-3 col-12">
                        <div style="color:black">
                        <b-form-group>
                            <label for="dateInvoice">Invoice Date</label>
                            <b-form-input
                                id="dateInvoice"
                                v-model="invoice.dateInvoice"
                                type="date"
                                required
                                disabled>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                    
                    <div class = "col-md-3 col-12">
                        <div style="color:black">
                        <b-form-group>
                            <label for="dueDatePayment">Due Date</label>
                            <b-form-input
                                id="dueDatePayment"
                                v-model="invoice.dueDatePayment"
                                type="date"
                                required>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                </div>

                <div class = "row">
                    <div class = "col-md-7 col-12">
                        <b-form-group>
                            <label for="noPurchaseOrder">Purchase Order No</label>
                            <b-form-input
                                id="noPurchaseOrder"
                                v-model="invoice.salesOrder.poNumber"
                                type="text"
                                required
                                disabled>
                            </b-form-input>
                        </b-form-group>
                    </div>
             
                    <div class = "col-md-5 col-12">
                        <div style="color:black">
                        <b-form-group>
                            <label for="purchaseOrderDate">PurchaseOrder Date</label>
                            <b-form-input
                                id="date"
                                v-model="invoice.salesOrder.poDate"
                                type="date"
                                required
                                disabled>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                </div>

                <b-form-group>
                    <label for="companyName">Company Name</label>
                    <b-form-input
                        id="companyName"
                        v-model="invoice.salesOrder.company.nama"
                        type="text"
                        required
                        disabled
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group>
                    <label for="companyAddress">Company Address</label>
                    <b-form-input
                        id="companyAddress"
                        v-model="invoice.salesOrder.company.alamat"
                        type="text"
                        required
                        disabled
                        >
                    </b-form-input>
                </b-form-group>

                <div class="d-none d-md-block d-lg-block">
                    <div class="row">
                        <div class="col-md-5">
                        <label>Service Order</label>
                        </div><br>

                        <div class="col-md-2">
                        <label>UOM</label> 
                        </div><br>

                        <div class="col-md-2">
                        <label>Qty</label> 
                        </div>

                        <div class="col-md-3">
                        <label>UnitPrice</label> 
                        </div><br>

                    </div>
                </div>

                <b-row class="service_orders" v-bind:key="item.id_service_orders" v-for="item in invoice.salesOrder.serviceOrder">
                    <b-col disabled>
                    <ServiceOrder v-bind:service_order="item"/>
                    </b-col>
                </b-row> 

                <div class="row">
                    <div class="col-6">
                        <b-form-group>
                            <label for="paymentTerms">Payment Terms</label>
                            <b-form-textarea
                                id="paymentTerms"
                                v-model="invoice.paymentTerms"
                                type="text"
                                required
                                placeholder="Payment Terms"
                                >
                            </b-form-textarea>
                        </b-form-group>
                    </div>

                    <div class="col-6">
                        <b-form-group>
                            <label for="termsOfDelivery">Terms of Delivery</label>
                            <b-form-textarea
                                id="termsOfDelivery"
                                v-model="invoice.termsOfDelivery"
                                type="text"
                                required
                                placeholder="Terms of Delivery"
                                >
                            </b-form-textarea>
                        </b-form-group>
                    </div>
                </div>

                <!-- Update and Cancel Button -->
                <div class = "button-group">
                    <router-link :to="{name: 'detail-invoice', params: {id:invoice.id}}">
                        <b-button class="cancel-button"> Cancel </b-button>
                    </router-link>
                    <b-button class="update-invoice-bttn" type="submit"> Update </b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>

    <b-modal id="modal-confirmation" ref="modal-confirmation" v-model="warningModal" hide-footer centered title="Save Changes?" ok-only>
        <br>
        <div class="container">
            <div class="info">
                <b-row> Invoice No. {{invoice.noInvoice}} will be changed soon once you click the save button.</b-row>
            </div>
            <div class="ok-bttn">
                <b-row>
                    <b-button id="cancel_update_button" @click="hideModal" size="md" variant="primary">Cancel</b-button>
                    <b-button id="confirm_update_button" @click="onSubmit" size="md" variant="primary">Save</b-button>
                </b-row>
            </div>
        </div>
    </b-modal>

    <b-modal title="Success!" v-model="successModal" hide-footer centered>
        <br>
        <div class="container">
            <div class="info">
                <b-row>Invoice No. {{invoice.noInvoice}} was successfully changed!</b-row>
            </div>
            <div style="float:right">
                <b-row>
                    <b-button id="cancel_update_button" @click="redirect" size="md" variant="primary">
                        See Details
                    </b-button>
                </b-row>
            </div>
        </div>
    </b-modal>

    <b-modal title="Failed" v-model="failedModal" centered ok-only>
        Invoice was failed to be changed.
    </b-modal>
  </div>
</template>

<script>

import ServiceOrder from '@/pages/Finance/ServiceOrderInvoice.vue';
import axios from 'axios';

export default {
    components : {
      ServiceOrder
    },
    data() { 
      return {
            service_orders: [],
            id_service_orders : {id:0},
            createdAt: "",

            invoice : {

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
        fetchData: function() {
            this.invoice.salesOrder.poDate = this.invoice.salesOrder.poDate.substring(0, 10);
            this.invoice.dateInvoice = this.invoice.dateInvoice.substring(0,10);
            this.invoice.dueDatePayment = this.invoice.dueDatePayment.substring(0,10);
        },

        onModal(evt) {
            this.warningModal = true;
        },

        getDetail: function() {
            axios.get('http://localhost:8080/api/invoice/' +this.$route.params.id)
            .then(res => {this.invoice = res.data, this.fetchData()})
            .catch(err => this.invoice = err.data);
        },

        onSubmit(evt) {
            this.$refs['modal-confirmation'].hide();
            evt.preventDefault();
            this.updateInvoice(JSON.stringify(this.invoice));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            } 
        },
        
        updateInvoice(invoice) {
            console.log("masuk pa aji")
            axios.put('http://localhost:8080/api/invoice/' + this.$route.params.id + '/update',
            invoice, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.invoice = res.data.result, this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'detail-invoice',  params: {id:this.invoice.id}});
        },

        hideModal(){
		    this.$refs['modal-confirmation'].hide();
		},
    }
}
</script>

<style scoped>

.modal-header {
    border:none;
    border-bottom: 0 none;
}

.modal-footer {
    border:none;
    border-top: 0 none;
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

.update-invoice-bttn{
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

.ok-bttn{
    float:right;
}
</style>