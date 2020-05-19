<template>
  <div class="row">
    <div class="col-12">
      <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item :to="{name: 'invoice'}">
          Invoice
        </b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'detail-invoice'}">
          Detail Invoice
        </b-breadcrumb-item>
        <b-breadcrumb-item active>
          Update Invoice
        </b-breadcrumb-item>
      </b-breadcrumb>
    <h3 class="judul">
        <strong>Update Invoice</strong>
    </h3>
    <div class = "row">
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
            <card class="col">
            <h5 class = "title-form">Update Invoice Form</h5>
            <b-form @submit="onModal" v-if="show">
                <div class = "row">
                    <div class = "col-md-6 col-12">
                        <b-form-group class="required">
                            <label class="label" for="noInvoice">Invoice No</label>
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
                        <b-form-group class="required">
                            <label class="label" for="dateInvoice">Invoice Date</label>
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
                        <b-form-group class="required">
                            <label class="label" for="dueDatePayment">Due Date</label>
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

                <div class = "row" style="margin-top: -5px;">
                    <div class = "col-md-7 col-12">
                        <b-form-group class="required">
                            <label class="label" for="noPurchaseOrder">Purchase Order No</label>
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
                        <b-form-group class="required">
                            <label class="label" for="purchaseOrderDate">Purchase Order Date</label>
                            <b-form-input
                                id="purchaseOrderDate"
                                v-model="invoice.salesOrder.poDate"
                                type="date"
                                required
                                disabled>
                            </b-form-input>
                        </b-form-group>
                        </div>
                    </div>
                </div>

                <b-form-group class="required">
                    <label class="label" for="companyName">Company Name</label>
                    <b-form-input
                        id="companyName"
                        v-model="invoice.salesOrder.company.nama"
                        type="text"
                        required
                        disabled
                        >
                    </b-form-input>
                </b-form-group>

                <b-form-group class="required">
                    <label class="label" for="companyAddress">Company Address</label>
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
                    <div class="row" style="margin: 0 -20px 0 -15px;">
                        <div class="col-md-5 col-12 required">
                            <label class="label">Service Order</label>
                        </div>
                        <div class="col-md-2 col-12 required">
                            <label class="label">UOM</label>
                        </div>
                        <div class="col-md-2 col-12 required">
                            <label class="label">Quantity</label>
                        </div>
                        <div class="col-md-3 col-12 required">
                            <label class="label">Unit Price (IDR)</label>
                        </div>
                    </div>
                </div>

                <b-row class="service_orders" v-bind:key="item.id_service_orders" v-for="item in invoice.salesOrder.serviceOrder" style="margin-bottom: 10px;">
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

                <!-- Update and Cancel Button -->
                <div class = "button-group">
                    <b-button class="save-button" type="submit">Save</b-button>
                    <router-link :to="{name: 'detail-invoice'}">
                        <b-button class="cancel-button">Cancel</b-button>
                    </router-link>
                </div>
            </b-form>
            </card>
        </div>
    </div>

    <b-modal id="modal-confirmation" centered v-model="warningModal">
        <template v-slot:modal-title>
            <div class="container">
                <h5 id="modal-title-success">Save Changes?</h5>
            </div>
        </template>
        <template v-slot:default>
            <div class="container">
                <b-row>
                    <b-col class="modal-icon col-2">
                        <img src="@/assets/img/update-confirm-icon.png" alt="" width="50px">
                    </b-col>
                    <b-col class="col-10">
                        <p id="modal-message">Invoice no. {{invoice.noInvoice}} will be changed soon once you click the save button.</p>
                    </b-col>
                </b-row>
            </div>
        </template>
        <template v-slot:modal-footer="{ cancel }">
            <b-col class="button-confirm-group">
                <b-button @click="onSubmit" class="save-button">
                    Save
                </b-button>
                <b-button @click="cancel()" class="cancel-button">
                    Cancel
                </b-button>
            </b-col>
        </template>
    </b-modal>

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
                        <p id="modal-message">Invoice no {{invoice.noInvoice}} was successfully changed.</p>
                    </b-col>
                </b-row>
            </div>
        </template>
        <template v-slot:modal-footer="{ ok }">
            <b-col class="button-confirm-group">
                <router-link :to="{name: 'invoice'}">
                    <b-button class="back-button">Back to List</b-button>
                </router-link>
                <b-button @click="ok()" class="see-button">
                    See Details
                </b-button>
            </b-col>
        </template>
    </b-modal>

    <b-modal title="Failed" v-model="failedModal" centered ok-only>
        Invoice was failed to be changed.
    </b-modal>
  </div>
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
            service_orders: [],
            id_service_orders : {id:0},
            createdAt: "",
            url_local: 'http://localhost:8080/api/invoice/',
            url_deploy : 'https://sipola-sixab.herokuapp.com/api/invoice/',

            invoice : {
              salesOrder: {
                company: {
                  nama: '',
                  alamat: '',
                },
                poNumber: '',
                poDate: '',
              }
            },
            company: {

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
            axios.get(this.url_deploy + this.$route.params.id , { headers: authHeader() })
            .then(res => {this.invoice = res.data, this.fetchData()})
            .catch(err => this.invoice = err.data);
        },

        onSubmit(evt) {
            // this.$refs['modal-confirmation'].hide();
            evt.preventDefault();
            this.updateInvoice(this.invoice);
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
            axios.put(this.url_deploy + this.$route.params.id + '/update', invoice, { headers: authHeader() })
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
.title-form {
  font-weight: 600;
  margin-bottom: 20px;
}
.isi-form{
  margin-left: auto;
  margin-right: auto;
}

.save-button{
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

.see-button{
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

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
}

.label{
  font-weight: 600;
}
#modal-message{
  font-size: 16px;
}
#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
}
#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
}
.button-confirm-group{
  text-align: right;
}
h5{
  margin-bottom: -4px;
}
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
.required label:after {
  content:" *";
  color: red;
}
</style>
