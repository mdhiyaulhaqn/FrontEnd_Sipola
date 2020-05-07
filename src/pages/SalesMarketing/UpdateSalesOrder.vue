<template>
  <div>
      <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item :to="{name: 'sales-order'}">
          Sales Order
        </b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'detail-sales-order'}">
          Detail Sales Order
        </b-breadcrumb-item>
        <b-breadcrumb-item active>
         Update Sales Order
        </b-breadcrumb-item>
      </b-breadcrumb>
    <h3 class="judul"><strong>Update Sales Order</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <h5 class = "title-form">Update Sales Order Form </h5>
            <b-form @submit="onModal" v-if="show">
                 <b-row>
                    <b-col md="6">
                    <b-form-group>
                        <label for="noSalesOrder">Sales Order No</label>
                        <b-form-input
                            id="noSalesOrder"
                            v-model="sales_order.noSalesOrder"
                            type="text"
                            required
                            placeholder="Sales Order Number">
                        </b-form-input>
                    </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group>
                            <label for="date">Sales Order Date</label>
                            <b-form-input
                                id="date"
                                v-model="sales_order.date"
                                type="date"
                                required>   
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                 <b-form-group>
                    <label for="poNumber">Purchase Order Number</label>
                    <b-form-input
                        id="poNumber"
                        v-model="sales_order.poNumber"
                        type="text"
                        required
                        placeholder="Sales Order Number">
                    </b-form-input>
                </b-form-group>
                
                <b-form-group>
                    <label for="date">Purchase Order Date</label>
                    <b-form-input
                        id="poDate"
                        v-model="sales_order.poDate"
                        type="date"
                        required>
                    </b-form-input>
                </b-form-group>

                 <b-row>
                    <b-col md="12">
                        <b-form-group>
                            <label for="companyName" >Company Name</label>
                            <b-form-select v-model="sales_order.company" required>
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
                    <b-row>
                        <b-col md="5">
                        <label>Description</label>
                        </b-col><br>

                        <b-col md="2">
                        <label>Qty</label> 
                        </b-col><br>

                        <b-col md="2">
                        <label>UOM</label> 
                        </b-col>
                        <br>

                        <b-col md="2">
                        <label>Unit Price</label> 
                        </b-col>
                        <br>

                        <b-col md="1">
                        
                        </b-col>
                    </b-row>
                </div>

                <b-row class="service_orders" v-bind:key="item.id_service_order" v-for="item in service_orders">
                    <b-col>
                    <ServiceOrder v-bind:service_order="item" v-on:del-service-order="deleteRow" />
                    </b-col>
                </b-row> 
                    
                <b-row>
                    <b-col md="5">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">+ Add Description</button>
                    </b-col>
                </b-row> 

                
                <b-form-group>
                    <label for="termsConditions">Terms and Conditions</label>
                    <ckeditor :editor="editor"  v-model="sales_order.termsCondition" :config="editorConfig"></ckeditor>
                </b-form-group>


                <div class = "button-group">
                    <router-link :to="{name: 'detail-sales-order', params: {id:sales_order.id}}">
                        <b-button class = "cancel-button">Cancel</b-button>
                    </router-link >
                    <b-button class = "save-button" type="submit">Update</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>

     <b-modal
        id="modal-confirmation"
        centered
        v-model="warningModal"
        >
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
                <p id="modal-message">Sales Order no {{sales_order.noSalesOrder}} will be changed soon once you click the save button.</p>
            </b-col>
            </b-row>
        </div>
        </template>
        <template v-slot:modal-footer="{ cancel }">
        <b-col class="button-confirm-group">
            <b-button @click="cancel()" class="cancel-button">
            Cancel
            </b-button>
            <b-button @click="onSubmit" class="save-button">
            Save
            </b-button>
        </b-col>
        </template>
    </b-modal>

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
                <p id="modal-message">Sales Order no {{sales_order.noSalesOrder}} was successfully changed.</p>
                </b-col>
            </b-row>
            </div>
        </template>
        <template v-slot:modal-footer="{ ok }">
            <b-col class="button-confirm-group">
            <b-button @click="ok()" id="ok-button" variant="outline-primary">
                See Details
            </b-button>
            </b-col>
        </template>
    </b-modal>
  </div>
</template>

<script>

import ServiceOrder from '@/pages/SalesMarketing/ServiceOrder.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default {
    components : {
      ServiceOrder
    },
    
    data() { 
      return {
            editor: ClassicEditor,
            service_orders: [],
            timestamp:"",

            sales_order : {
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
            warningModal : false,
            send : {objects : null},
        }
    },

    beforeMount() {
        this.getAllCompany();
        this.getDetail();
	},
    
    methods: {
        addRow(){
            this.new_service_order.id_service_order++;
            let service = Object.assign({}, this.new_service_order);
            this.service_orders.push(service)
        },

        deleteRow(id_service_order){
            this.service_orders = this.service_orders.filter(result => result.id_service_order !== id_service_order);
        },

        onModal(evt) {
            this.warningModal = true;
        },

        onSubmit(evt) {

            evt.preventDefault();
            
            this.sales_order.serviceOrder = this.service_orders;
            
            this.updateSalesOrder(JSON.stringify(this.sales_order));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            } 
        },
        
        fetchData : function(){
            this.sales_order.poDate = this.sales_order.poDate.substring(0,10);
            let service_quot = this.sales_order.serviceOrder;
            for(let i=0; i< service_quot.length ; i++){
                this.new_service_order.id_service_order++;
                this.new_service_order.deskripsi = service_quot[i].deskripsi;
                this.new_service_order.pricePerUnit = service_quot[i].pricePerUnit;
                this.new_service_order.quantity = service_quot[i].quantity;
                this.new_service_order.uom = service_quot[i].uom;

                let service = Object.assign({}, this.new_service_order);
                this.service_orders.push(service);

                this.new_service_order.deskripsi = ''
                this.new_service_order.pricePerUnit = ''
                this.new_service_order.quantity = ''
                this.new_service_order.uom = ''
                this.new_service_order.sales_order = ''
            }
        },

        getDetail: function(){
            axios.get('http://localhost:8080/api/sales-order/' +this.$route.params.id)
            .then(res => {this.sales_order = res.data, this.fetchData()})
            .catch(err => this.sales_order = err.data);
        },
        
        updateSalesOrder(quot){
            console.log(this.sales_order.service_order)
            axios.put('http://localhost:8080/api/sales-order/update/' + this.$route.params.id, 
            quot, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.sales_order = res.data.result, this.showMessage(res.data.status)});
        },

        getAllCompany: function(){
            axios.get('http://localhost:8080/api/company/all')
            .then(result => this.companies = result.data.result);
        },

       redirect(){
            this.$router.push({ name: 'detail-sales-order',  params: {id:this.sales_order.id}});
        },

        hideModal(){
		  	this.$refs['modal-hide'].hide();
		},
    }
}
</script>

<style scoped>
.add-button{
  width: 100%;
  background-color: white;
  color : #109cf1;
  border-color: #109cf1;
  margin-bottom: 10px;
}
.judul{
  text-align: center;
  color: black;
  margin: 5px 0 24px 0;
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
  font-size: 10px;
  margin-left: 10px;
  line-height: 15px;
  width: 110px;
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
#termsConditions{
    height: 180px;
}
</style>
