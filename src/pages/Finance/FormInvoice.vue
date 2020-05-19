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
                            <div class = "col-md-6 col-12">
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

                            <div class = "col-md-3 col-12">
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

                            <div class = "col-md-3 col-12">
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
                            <div class = "col-md-7 col-12">
                                <b-form-group class="required">
                                    <label for="noPurchaseOrder">PO No</label>
                                    <b-form-input
                                        id="noPurchaseOrder"
                                        v-model="sales_order.poNumber"
                                        type="text"
                                        required
                                        disabled>
                                    </b-form-input>
                                </b-form-group>
                            </div>

                            <div class = "col-md-5 col-12">
                                <div style="color:black">
                                <b-form-group class="required">
                                    <label for="purchaseOrderDate">PO Date</label>
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

                        <div class="d-none d-md-block d-lg-block">
                            <div class="row">
                                <div class="col-md-5 required">
                                    <label>Service Order</label>
                                </div>
                                <div class="col-md-2 required">
                                    <label>UOM</label>
                                </div>
                                <div class="col-md-2 required">
                                    <label>Qty</label>
                                </div>
                                <div class="col-md-3 required">
                                    <label>UnitPrice</label>
                                </div>
                            </div>
                        </div>

                        <b-row class="service_orders" v-bind:key="item.id_service_orders" v-for="item in sales_order.serviceOrder">
                            <b-col disabled>
                            <ServiceOrder v-bind:service_order="item"/>
                            </b-col>
                        </b-row>

                        <div class="row">
                            <div class="col-md-6 col-12">
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

                            <div class="col-md-6 col-12">
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

        <b-modal id="modal-success" centered v-model="successModal" @ok="redirect()">
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
                        <p id="modal-message">Invoice was successfully added.</p>
                    </b-col>
                    </b-row>
                </div>
            </template>

            <template v-slot:modal-footer="{ ok }">
                <b-col class="button-confirm-group">
                    <!-- <router-link :to="{name: 'purchase-order'}">
                        <b-button class="cancel-button"> Back to Purchase Order List </b-button>
                    </router-link> -->
                    <router-link :to="{name: 'invoice'}">
                        <b-button class="back-button">Back to List</b-button>
                    </router-link>
                    <b-button @click="ok()" id="ok-button" variant="outline-primary">
                        See Details
                    </b-button>
                </b-col>
            </template>
        </b-modal>

        <b-modal title="Failed" v-model="failedModal" centered ok-only>
            Sorry, invoice couldn't be added.
        </b-modal>
    </div>
</template>

<script>

import ServiceOrder from '@/pages/SalesMarketing/ServiceOrder.vue';
import axios from 'axios';
import authHeader from '../../services/auth-header';

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
                createdBy : '',
                status : 'Active',
                salesOrder :'',
            },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},
            url_local_so : 'http://localhost:8080/api/sales-order/',
            url_deploy_so : 'https://sipola-sixab.herokuapp.com/api/sales-order/',
            url_local : 'http://localhost:8080/api/invoice/',
            url_deploy : 'https://sipola-sixab.herokuapp.com/api/invoice/',
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
            console.log("TEST");
            axios.get(this.url_deploy_so + this.$route.params.id, { headers: authHeader() })
            .then(res => {this.sales_order = res.data, this.fetchData()})
            .catch(err => this.sales_order = err.data);
        },
        
        currentUser() {
            return this.$store.state.auth.user;
        },

        onSubmit(evt) {
            evt.preventDefault();
            this.invoice.salesOrder = this.sales_order;
            this.invoice.createdBy = this.currentUser().name;
            this.addinvoice(this.invoice);
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
            axios.post(this.url_deploy + 'add', invoice, { headers: authHeader() })
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
  margin: 11px 0 24px 0;
}
.isi-form{
    margin-left: auto;
    margin-right: auto;
}

.add-invoice-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 12px;
  margin-right: 10px;
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
  font-size: 12px;
}

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
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
#ok-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 12px;
  margin-left: 10px;
  line-height: 15px;
  width: 120px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
  text-align: center;
}
.back-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  border-width: 1px;
  width: 100px;
  line-height: 15px;
  text-align: center;
  font-size: 12px;
}
</style>
