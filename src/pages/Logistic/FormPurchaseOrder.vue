<template>
    <div>
        <b-breadcrumb id="breadcrumb">
            <b-breadcrumb-item :to="{name: 'purchase-order'}">
                Purchase Order List
            </b-breadcrumb-item>
            <b-breadcrumb-item active>
                Add Purchase Order
            </b-breadcrumb-item>
        </b-breadcrumb>

        <h3 class="judul">
            <strong>Add Purchase Order</strong>
        </h3>

        <div class="row">
            <div class="col-10 isi-form">
                <card>
                    <h5 class="title-form">Add Purchase Order Form</h5>
                    <b-form @submit="onSubmit" v-if="show">
                        <div class="row">
                            <div class="col-md-7 col-12">
                                <b-form-group class="required">
                                    <label for="noPurchaseOrder">Purchase Order No</label>
                                    <b-form-input
                                        id="noPurchaseOrder"
                                        v-model="purchaseOrder.noPurchaseOrder"
                                        type="text"
                                        required
                                        placeholder="Purchase Order Number"
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-5 col-12">
                                <div style="color:black">
                                    <b-form-group class="required">
                                        <label for="datePurchaseOrder">Purchase Order Date</label>
                                        <b-form-input
                                            id="datePurchaseOrder"
                                            v-model="purchaseOrder.datePurchaseOrder"
                                            type="date"
                                            required
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-7 col-12">
                                <b-form-group class="required">
                                    <label for="noCustRef">Customer Reference No</label>
                                    <b-form-input
                                        id="noCustRef"
                                        v-model="purchaseOrder.noCustRef"
                                        type="text"
                                        required
                                        placeholder="Customer Reference Number"
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-5 col-12">
                                <b-form-group class="required">
                                    <label for="noProject">Project No</label>
                                    <b-form-input
                                        id="noProject"
                                        v-model="purchaseOrder.noProject"
                                        type="text"
                                        required
                                        placeholder="Project Number"
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-7 col-12">
                                <b-form-group class="required">
                                    <label for="companyName">Company Name</label>
                                    <b-form-input
                                        id="companyName"
                                        v-model="company.nama"
                                        type="text"
                                        required
                                        placeholder="Company Name"
                                        pattern="[a-zA-Z0-9-]++"
                                        >
                                    </b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-5 col-12">
                                <b-form-group class="required">
                                    <label for="attnName">Attn Name</label>
                                    <b-form-input
                                        id="attnName"
                                        v-model="purchaseOrder.attnName"
                                        type="text"
                                        required
                                        placeholder="Attn Name"
                                        >
                                    </b-form-input>
                                </b-form-group>
                            </div>
                        </div>

                        <b-form-group class="required">
                            <label for="companyAddress">Company Address</label>
                            <b-form-input
                                id="companyAddress"
                                v-model="company.alamat"
                                type="text"
                                required
                                placeholder="Company Address"
                            ></b-form-input>
                        </b-form-group>

                        <div class="d-none d-md-block d-lg-block">
                            <div class="row">
                                <div class="col-md-5 required">
                                    <label>Item</label>
                                </div>
                                <div class="col-md-2 required">
                                    <label>Quantity</label> 
                                </div>
                                <div class="col-md-2 required">
                                    <label>UOM</label> 
                                </div>
                                <div class="col-md-2 required">
                                    <label>Unit Price (IDR)</label> 
                                </div>
                                <div class="col-md-1">
                                </div>
                                <br>
                            </div>
                        </div>

                        <b-row class="purchasedItems" v-bind:key="item.id_purchased_item" v-for="item in purchasedItems">
                            <b-col>
                                <PurchasedItem v-bind:purchasedItem="item" v-on:delete-item="deleteRow" />
                            </b-col>
                        </b-row>
                            
                        <b-row>
                            <div class="col-sm-6 col-12">
                                <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">
                                    Add Item
                                </button>
                            </div>
                        </b-row>

                        <b-form-group class="required">
                            <label for="paymentNote">Payment Notes</label>
                            <ckeditor :editor="editor" v-model="purchaseOrder.paymentNote" :config="editorConfig"></ckeditor>
                        </b-form-group>

                        <!-- Add & Cancel Button -->
                        <div class = "button-group">
                            <b-button class = "save-button" type="submit">Add</b-button>
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
                        <p id="modal-message">Purchase Order was successfully added.</p>
                    </b-col>
                    </b-row>
                </div>
            </template>

            <template v-slot:modal-footer="{ ok }">
                <b-col class="button-confirm-group">
                    <!-- <router-link :to="{name: 'purchase-order'}">
                        <b-button class="cancel-button"> Back to Purchase Order List </b-button>
                    </router-link> -->
                    <router-link :to="{name: 'purchase-order'}">
                        <b-button class="back-button">Back to List</b-button>
                    </router-link>
                    <b-button @click="ok()" id="ok-button" variant="outline-primary">
                        See Details
                    </b-button>
                </b-col>
            </template>
        </b-modal>

        <b-modal title="Failed" v-model="failedModal" centered ok-only>
            Sorry, purchase order couldn't be added. 
        </b-modal>
    </div>
</template>

<script>
import PurchasedItem from '@/pages/Logistic/PurchasedItem.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default {
    components : {
        PurchasedItem
    },
    
    data(){
        return {
            editor: ClassicEditor,

            purchasedItems: [],
            id_purchased_item : {id:0},

            purchaseOrder : {
                noPurchaseOrder : '',
                datePurchaseOrder : '',
                noCustRef : '',
                noProject : '',
                company : '',
                attnName : '',
                purchasedItems : '',
                paymentNote : '',
                createdBy : 'Amalia',
                status : 'Active',
            },

            new_purchased_item :{
                id_purchased_item : 0,
                name : '',
                quantity: '',
                unitOfMeasurement : '',
                pricePerUnit : '',
                purchaseOrder: '',
            },

            company : {
                nama : '',
                alamat : '',
                purchaseOrder : '',
            },

            show: true,
            successModal: false,
            failedModal: false,
            send : {objects : null}
        }
    },

    beforeMount(){
        this.addRow();
    },

    methods: {
        addRow(){
            this.new_purchased_item.id_purchased_item++;
            let purchasedItem = Object.assign({}, this.new_purchased_item);
            this.purchasedItems.push(purchasedItem)
        },

        deleteRow(id_purchased_item){
            this.purchasedItems = this.purchasedItems.filter(result => result.id_purchased_item !== id_purchased_item);
        },

        onSubmit(evt){
            evt.preventDefault();
            this.purchaseOrder.company = this.company;
            this.purchaseOrder.purchasedItems = this.purchasedItems;
            this.addPurchaseOrder(JSON.stringify(this.purchaseOrder));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            } 
        },

        addPurchaseOrder(purchaseOrder){
            console.log("masuk gaksii")
            axios.post('http://localhost:8080/api/purchase-order/add',
            purchaseOrder,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            .then(res => {this.purchaseOrder = res.data.result, this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({name: 'detail-purchase-order', params: {id:this.purchaseOrder.id}});
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

.ck-editor__editable {
    min-height: 500px;
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

.title-form {
    font-weight: 600;
    margin-bottom: 20px;
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

.button-confirm-group{
    text-align: right;
}

h5{
    margin-bottom: -4px;
}

#paymentNote{
    height: 200px;
}
</style>