<template>
  <div>
    <b-breadcrumb id="breadcrumb">
      <b-breadcrumb-item :to="{name: 'delivery-order'}">
        Delivery Order
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Add Delivery Order
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h3 class="judul"><strong>Add Delivery Order</strong></h3>
    <div class = "row">
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
            <card class="col">
            <h5 class = "title-form">Add Delivery Form </h5>
            <b-form @submit="onSubmit" v-if="show">
                <b-row>
                    <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="deliveryOrderNo">Delivery Order No</label>
                            <b-form-input
                                id="deliveryOrderNo"
                                v-model="new_delivery_order.noDeliveryOrder"
                                type="text"
                                required
                                placeholder="Delivery Order Number">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </b-row>
                <b-row>
                     <div class = "col-md-12 col-12">
                        <b-form-group class="required">
                            <label class="label" for="poNumber">Purchase Order No</label>
                            <b-form-input
                                id="poNumber"
                                v-model="new_delivery_order.poNumber"
                                type="text"
                                required
                                placeholder="Purchase Order Number">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </b-row>


             <b-row>
                     <div class = "col-md-6 col-12">
                        <b-form-group>
                            <label class="label" for="qcPassed">QC Passed / Delivery</label>
                            <b-form-input
                                id="qcPassed"
                                v-model="new_delivery_order.qcPassed"
                                type="text"
                                placeholder="QC Passed / Delivery">
                            </b-form-input>
                        </b-form-group>
                    </div>

                     <div class = "col-md-6 col-12">
                        <div style="color:black">
                            <b-form-group>
                                <label class="label" for="shipBy">Ship By</label>
                                <b-form-input
                                    id="shipBy"
                                    v-model="new_delivery_order.shipBy"
                                    type="text"
                                    placeholder="Ship By">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </div>
             </b-row>

                  <b-row>
                    <b-col md="12">
                        <b-form-group class="required">
                            <label class="label" for="companyName" >Company</label>
                            <b-form-select v-model="new_delivery_order.company" required>
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
                    <div class="row">
                        <div class = "col-md-6 required">
                            <label class="label" >Description</label>
                        </div>
                        <div class = "col-md-2 required">
                            <label class="label" >Quantity</label>
                        </div>
                        <div class = "col-md-3">
                            <label class="label" >Project / Service No</label>
                        </div>
                        <div class = "col-md-1">
                        </div>
                        <br>
                    </div>
                </div>

                <b-row class="products" v-bind:key="item.id_product" v-for="item in products">
                    <b-col>
                        <Product v-bind:product="item" v-on:del-product="deleteRow" />
                    </b-col>
                </b-row>

                <b-row>
                    <div class ="col-md-6 col-12">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">+ Add Description</button>
                    </div>
                </b-row>


                <b-form-group class="required">
                    <label class="label" for="termsConditions">Terms and Conditions</label>
                    <ckeditor :editor="editor"  v-model="new_delivery_order.termsCondition"></ckeditor>

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
                <p id="modal-message">Delivery order was successfully added.</p>
            </b-col>
            </b-row>
        </div>
        </template>
        <template v-slot:modal-footer="{ ok }">
        <b-col class="button-confirm-group">
            <b-button @click="redirect()" class="back-button">
                Back to List
            </b-button>
            <b-button @click="ok()" class="see-button">
                See Details
            </b-button>
        </b-col>
        </template>
    </b-modal>

  </div>
</template>

<script>

import Product from '@/pages/ProjectManager/Product.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default {
    components : {
      Product
    },
    data() {
      return {
           editor: ClassicEditor,

            products: [],
            companies : [],
            timestamp:"",

            new_delivery_order : {
                createdBy : "adi",
                noDeliveryOrder : '',
                termsCondition : '',
                poNumber : '',
                qcPassed : '',
                shipBy : '',
                status : 'Active',
                company : '',
                product : '',
            },
            new_product : {
                id_product : 0,
                nama : '',
                quantity : '',
                project_No : '',
            },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},
        }
    },

    beforeMount() {
        this.getAllCompany();
        this.addRow();
	},

    methods: {
        addRow(){
            this.new_product.id_product++;
            let product = Object.assign({}, this.new_product);
            this.products.push(product)
        },

        deleteRow(id_product){
            this.products = this.products.filter(result => result.id_product !== id_product);
        },

        onSubmit(evt) {
            evt.preventDefault();
            this.new_delivery_order.product = this.products;
            this.addDeliveryOrder(JSON.stringify(this.new_delivery_order));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            }
        },

        addDeliveryOrder(quot){
            axios.post('http://localhost:8080/api/delivery-order/add',
            quot,
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.new_delivery_order = res.data.result, this.showMessage(res.data.status)});
        },

        getAllCompany: function(){
            axios.get('http://localhost:8080/api/company/all')
            .then(result => this.companies = result.data.result);
        },


        redirect(){
            this.$router.push({ name: 'detail-delivery-order',  params: {id:this.new_delivery_order.id}});
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

.ck-editor__editable {
    min-height: 500px;
}

.add-button{
    width: 100%;
    background-color: white;
    color : #109cf1;
    border-color: #109cf1;
    margin-top: 0px;
    margin-bottom: 10px;
}
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
#termsConditions{
    height: 200px;
}

</style>
