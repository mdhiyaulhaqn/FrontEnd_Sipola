<template>
  <div>
       <b-breadcrumb id="breadcrumb">
      <b-breadcrumb-item :to="{name: 'sales-order'}">
        Sales Order
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Add Sales Order
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h3 class="judul"><strong>Add Sales Order</strong></h3>
    <div class = "row">
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
            <card class="col">
            <h5 class = "title-form">Add Sales Order Form</h5>
            <b-form @submit="onSubmit" v-if="show">
                <b-row>
                    <b-col md="6">
                    <b-form-group class="required">
                        <label class="label"  for="noSalesOrder">Sales Order No</label>
                        <b-form-input
                            id="noSalesOrder"
                            v-model="new_sales_order.noSalesOrder"
                            type="text"
                            required
                            placeholder="Sales Order Number">
                        </b-form-input>
                    </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group class="required">
                            <label class="label" for="date">Sales Order Date</label>
                            <b-form-input
                                id="date"
                                v-model="new_sales_order.date"
                                type="date"
                                required>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                 <b-form-group class="required">
                    <label class="label" for="poNumber">Purchase Order Number</label>
                    <b-form-input
                        id="poNumber"
                        v-model="new_sales_order.poNumber"
                        type="text"
                        required
                        placeholder="Sales Order Number">
                    </b-form-input>
                </b-form-group>

                <b-form-group class="required">
                    <label class="label" for="date">Purchase Order Date</label>
                    <b-form-input
                        id="poDate"
                        v-model="new_sales_order.poDate"
                        type="date"
                        required>
                    </b-form-input>
                </b-form-group>

                <b-row>
                    <b-col md="12">
                        <b-form-group class="required">
                            <label class="label" for="companyName" >Company Name</label>
                            <b-form-select v-model="new_sales_order.company" required>
                                <template slot="companyName">
                                    <option :value="null" disabled>-- Choose Company --</option>
                                </template>
                                <option v-for="company in companies" :key="company.id" :value="company">
                                    {{ company.nama }} - {{ company.alamat }}
                                </option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <div class="d-none d-md-block d-lg-block">
                    <div class="row" style="margin: 0 -15px 0 -15px;">
                        <div class="col-md-4 required">
                            <label class="label">Service Order</label>
                        </div>
                        <div class="col-md-2 required">
                            <label class="label">UOM</label>
                        </div>
                        <div class="col-md-2 required">
                            <label class="label">Quantity</label>
                        </div>
                        <div class="col-md-3 required">
                            <label class="label">Unit Price (IDR)</label>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                </div>

                <b-row class="service_orders" v-bind:key="item.id_service_order" v-for="item in service_orders">
                    <b-col>
                    <ServiceOrder v-bind:service_order="item" v-on:del-service-order="deleteRow" style="margin-right: 15px;" />
                    </b-col>
                </b-row>

                <b-row style="margin-top: 7px;">
                    <b-col md="4">
                        <b-button class="btn btn-primary add-button" @click="addRow()" >Add Description <span><img src="@/assets/img/add-circle-blue-icon.png" alt="" width="18px" style="margin-top: -4px;"></span></b-button>
                    </b-col>
                </b-row>


                <b-form-group>
                    <label class="label" for="termsConditions">Terms and Conditions</label>
                    <ckeditor :editor="editor"  v-model="new_sales_order.termsCondition"></ckeditor>
                </b-form-group>

                <div class = "button-group">
                    <b-button class = "save-button" type="submit">Save</b-button>
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>

    <b-modal
        id="modal-success"
        centered
        v-model="successModal"
        @ok="redirect()"
        >
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
                <p id="modal-message">Sales order was successfully added.</p>
                </b-col>
            </b-row>
            </div>
        </template>
        <template v-slot:modal-footer="{ ok }">
            <b-col class="button-confirm-group">
                <b-button @click="cancel()" class="back-button">
                  Back to List
                </b-button>
                <b-button @click="ok()" class="see-button">
                  See Details
                </b-button>
            </b-col>
        </template>
    </b-modal>

    <b-modal title="Sales Order  Gagal Tersimpan" v-model="failedModal" centered ok-only>
        Sales Order gagal dibuat.
    </b-modal>
  </div>
</template>

<script>
import ServiceOrder from '@/pages/SalesMarketing/ServiceOrder.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import authHeader from '../../services/auth-header';
import axios from 'axios';

export default {
    components : {
        ServiceOrder
    },
    data() {
      return {
            editor: ClassicEditor,
            service_orders: [],
            companies : [],
            new_sales_order : {
                createdBy : "",
                poDate : '',
                poNumber : '',
                date : '',
                noSalesOrder : '',
                termsCondition : '',
                company : '',
                status : 'Active',
                serviceOrder : '',
            },
            new_service_order : {
                id_service_order : 0,
                deskripsi : '',
                pricePerUnit : '',
                uom : '',
                quantity : '',
                sales_order : '',
            },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},
            url_local: 'http://localhost:8080/api/sales-order/',
            url_deploy: 'https://sipola-sixab.herokuapp.com/api/sales-order/',
            url_local_company: 'http://localhost:8080/api/company/',
            url_deploy_company: 'https://sipola-sixab.herokuapp.com/api/company/'
        }
    },

    beforeMount() {
        this.getAllCompany();
        this.addRow();
	},

    methods: {
        currentUser() {
            return this.$store.state.auth.user;
        },

        addRow(){
            this.new_service_order.id_service_order++;
            let service = Object.assign({}, this.new_service_order);
            this.service_orders.push(service)
        },

        deleteRow(id_service_order){
            if (this.service_orders.length > 1) {
                this.service_orders = this.service_orders.filter(result => result.id_service_order !== id_service_order);
            }
        },

        onSubmit(evt) {
            evt.preventDefault();
            this.new_sales_order.serviceOrder = this.service_orders;
            this.new_sales_order.createdBy = this.$store.state.auth.user.name;
            this.addSalesOrder(this.new_sales_order);
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            }
        },

        addSalesOrder(sales_order){
            axios.post(this.url_deploy + 'add',  sales_order, { headers: authHeader() })
            .then(res => {this.new_sales_order = res.data.result, this.showMessage(res.data.status)});
        },

        getAllCompany: function(){
            axios.get( this.url_deploy_company + 'all', {headers : authHeader()})
            .then(result => this.companies = result.data.result);
        },

        redirect(){
            this.$router.push({ name: 'detail-sales-order',  params: {id:this.new_sales_order.id}});
        },

        cancel(){
            this.$router.push({ name: 'sales-order'});
        },

        hideModal(){
		    this.$refs['modal-hide'].hide();
		},
    }
}
</script>

<style scoped>
.required label:after {
    content: " *";
    color: red;
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
.add-button{
  width: 100%;
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  border-width: 2px;
  line-height: 20px;
  text-align: center;
  font-size: 13px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.judul{
  text-align: center;
  color: black;
  margin: 11px 0 24px 0;
}
.isi-form{
    margin-left: auto;
    margin-right: auto;
}
.title-form {
  font-weight: 600;
  margin-bottom: 20px;
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
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
</style>
