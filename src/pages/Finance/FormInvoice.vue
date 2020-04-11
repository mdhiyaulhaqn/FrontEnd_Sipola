<template>
  <div>
    <h3 class="judul">
        <strong>Add Invoice</strong>
    </h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <h5 class = "title-form">Add Invoice Form - Sales Order {{sales_order.noSalesOrder}} </h5>
            <b-form @submit="onSubmit" v-if="show">
                <div class = "row">
                    <div class = "col-6">
                        <b-form-group>
                            <label for="noInvoice">Invoice No</label>
                            <b-form-input
                                id="noInvoice"
                                v-model="invoice.noInvoice"
                                type="text"
                                required
                                placeholder="Invoice Number">
                            </b-form-input>
                        </b-form-group>
                    </div>
             
                    <div class = "col-3">
                        <div style="color:black">
                        <b-form-group>
                            <label for="invoiceDate">Invoice Date</label>
                            <b-form-input
                                id="invoiceDate"
                                v-model="invoice.invoiceDate"
                                type="date"
                                required>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                    
                    <div class = "col-3">
                        <div style="color:black">
                        <b-form-group>
                            <label for="dueDate">Due Date</label>
                            <b-form-input
                                id="dueDate"
                                v-model="invoice.dueDate"
                                type="date"
                                required>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                </div>

                <div class = "row">
                    <div class = "col-7">
                        <b-form-group>
                            <label for="noPurchaseOrder">Purchase Order No</label>
                            <b-form-input
                                id="noPurchaseOrder"
                                v-model="sales_order.poNumber"
                                type="text"
                                required
                                disabled>
                            </b-form-input>
                        </b-form-group>
                    </div>
             
                    <div class = "col-5">
                        <div style="color:black">
                        <b-form-group>
                            <label for="purchaseOrderDate">PurchaseOrder Date</label>
                            <b-form-input
                                id="date"
                                v-model="sales_order.poDate"
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
                        v-model="sales_order.company.nama"
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
                        v-model="sales_order.company.alamat"
                        type="text"
                        required
                        disabled
                        >
                    </b-form-input>
                </b-form-group>

                <b-row>
                    <b-col md="6">
                      <label>Scope of Works</label>
                    </b-col><br>

                    <b-col md="3">
                    <label>Quantity</label> 
                    </b-col><br>

                    <b-col md="3">
                    <label>Unit Price</label> 
                    </b-col>
                    <br>
                </b-row>

                <b-row class="services" v-bind:key="item.id_service" v-for="item in services">
                    <b-col>
                    <Service v-bind:service="item" v-on:del-service="deleteRow" />
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

                <!-- Add and Cancel Button -->
                <div class = "button-group">
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                    <b-button class = "add-quotation-button" type="submit">Add</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>

    <b-modal title="Add Success!" v-model="successModal" @ok="redirect()"  centered ok-only>
        Invoice with {{invoice.noInvoice}} was successfully added!
    </b-modal>

    <b-modal title="Failed" v-model="failedModal" centered ok-only>
        Sorry, invoice couldn't be added.
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
            sales_order: "",
            services: [],
            id_services : {id:0},
            timestamp:"",

            invoice : {
                createdBy : "Yasmin Moedjoko",
                dateInvoice : '',
                dueDate: '',
                noinvoice : '',
                termsOfDelivery : '',
                paymentTerms: '',
                status : 'Active',
                sales_order : '',
            },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},
        }
    },

    beforeMount() {
      this.getDetailSalesOrder();
	},
    
    methods: {
        getDetailSalesOrder: function(){    
            axios.get('http://localhost:8080/api/sales-order/' +this.$route.params.id)
            .then(res => {this.sales_order = res.data})
            .catch(err => this.sales_order = err.data);
        },

        onSubmit(evt) {
            evt.preventDefault();
            this.addinvoice(JSON.stringify(this.invoice));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            } 
        },
        
        addinvoice(quot){
            console.log("cihuy")
            axios.post('http://localhost:8080/api/invoice/add', 
            quot, 
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

.add-invoice-button{
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
