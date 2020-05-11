<template>
  <div>
    <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item :to="{name: 'invoice'}">
            Invoice List
        </b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'sales-order-for-invoice'}">
            Sales Order List
        </b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'detail-sales-order-for-invoice'}">
            Detail Sales Order
        </b-breadcrumb-item>
        <b-breadcrumb-item active>
            Add Invoice
        </b-breadcrumb-item>
    </b-breadcrumb>

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
                        <b-form-group class="required">
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
                        <b-form-group class="required">
                            <label for="dateInvoice">Invoice Date</label>
                            <b-form-input
                                id="dateInvoice"
                                v-model="invoice.dateInvoice"
                                type="date"
                                required>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                    
                    <div class = "col-3">
                        <div style="color:black">
                        <b-form-group class="required">
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
                    <div class = "col-7">
                        <b-form-group class="required">
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
                        <b-form-group class="required">
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

                <b-form-group class="required">
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

                <b-form-group class="required">
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

                <b-row class="required">
                    <b-col md="5">
                      <label>Service Order</label>
                    </b-col><br>

                    <b-col md="2">
                    <label>UOM</label> 
                    </b-col><br>

                    <b-col md="2">
                    <label>Qty</label> 
                    </b-col>

                    <b-col md="3">
                    <label>UnitPrice</label> 
                    </b-col><br>
                </b-row>

                <b-row class="service_orders" v-bind:key="item.id_service_orders" v-for="item in sales_order.serviceOrder">
                    <b-col disabled>
                    <ServiceOrder v-bind:service_order="item"/>
                    </b-col>
                </b-row> 

                <div class="row">
                    <div class="col-6">
                        <b-form-group class="required">
                            <label for="paymentTerms">Payment Terms</label>
                            <b-form-input
                                id="paymentTerms"
                                v-model="invoice.paymentTerms"
                                type="text"
                                required
                                placeholder="Payment Terms"
                                pattern="[a-zA-Z0-9\s]+"
                                >
                            </b-form-input>
                        </b-form-group>
                    </div>

                    <div class="col-6">
                        <b-form-group class="required">
                            <label for="termsOfDelivery">Terms of Delivery</label>
                            <b-form-input
                                id="termsOfDelivery"
                                v-model="invoice.termsOfDelivery"
                                type="text"
                                required
                                placeholder="Terms of Delivery"
                                pattern="[a-zA-Z\s]+"
                                >
                            </b-form-input>
                        </b-form-group>
                    </div>
                </div>

                <!-- Add and Cancel Button -->
                <div class = "button-group">
                    <b-button class = "add-invoice-button" type="submit">Add</b-button>
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>

    <b-modal title="Add Success!" v-model="successModal" @ok="redirect()"  centered ok-only>
        Invoice with No. {{invoice.noInvoice}} was successfully added! 
    </b-modal>

    <b-modal title="Failed" v-model="failedModal" centered ok-only>
        Sorry, invoice couldn't be added. 
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
            sales_order: "",
            service_orders: [],
            id_service_orders : {id:0},
            createdAt: "",

            invoice : {
                noInvoice : '',
                dateInvoice : '',
                dueDatePayment: '',
                sales_order : '',
                termsOfDelivery : '',
                paymentTerms: '',
                createdBy : "Yasmin Moedjoko",
                status : 'Active',
                salesOrder :'',
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
        fetchData: function(){
            this.sales_order.poDate = this.sales_order.poDate.substring(0, 10);
        },

        getDetailSalesOrder: function(){    
            axios.get('http://localhost:8080/api/sales-order/' +this.$route.params.id)
            .then(res => {this.sales_order = res.data, this.fetchData()})
            .catch(err => this.sales_order = err.data);
        },

        onSubmit(evt) {
            evt.preventDefault();
            this.invoice.salesOrder = this.sales_order;
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
        
        addinvoice(invoice){
            console.log("masuk pa aji")
            axios.post('http://localhost:8080/api/invoice/add',
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
		    this.$refs['modal-hide'].hide();
		},
    }
}
</script>

<style scoped>

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
    background-color: #109CF1;
    color:white;
    border-color: transparent;
    font-size: 10px;
    margin-left: 10px;
    line-height: 15px;
    width: 120px;
    box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
    text-align: center;
}

.cancel-button{
    color:#109CF1;
    border-color:#109CF1;
    background-color: white;
    border-width: 1px;
    width: 80px;
    line-height: 15px;
    text-align: center;
    font-size: 10px;
}

.button-group{
    margin-top: 30px;
    text-align: center;
}
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
.required label:after {
    content: " *";
    color: red;
}
</style>
