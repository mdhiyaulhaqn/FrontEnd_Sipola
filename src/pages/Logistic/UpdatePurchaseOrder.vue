<template>
    <div>
        <b-breadcrumb id="breadcrumb">
            <b-breadcrumb-item :to="{name: 'purchase-order'}">
                Purchase Order
            </b-breadcrumb-item>
            <b-breadcrumb-item :to="{name: 'detail-purchase-order'}">
                Detail Purchase Order
            </b-breadcrumb-item>
            <b-breadcrumb-item active>
                Update Purchase Order
            </b-breadcrumb-item>
        </b-breadcrumb>
        <h3 class="judul"><strong>Update Purchase Order</strong></h3>
        <div class="row">
            <div class="col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
                <card class="col">
                    <h5 class="title-form">Update Purchase Order Form</h5>
                    <b-form @submit="onModal" v-if="show">
                        <div class="row">
                            <div class="col-md-7 col-12">
                                <b-form-group class="required">
                                    <label for="noPurchaseOrder" class="label">Purchase Order No</label>
                                        <b-form-input
                                            id="noPurchaseOrder"
                                            v-model="purchaseOrder.noPurchaseOrder"
                                            type="text"
                                            required
                                            disabled
                                        ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-5 col-12">
                                <div style="color:black">
                                    <b-form-group class="required">
                                        <label for="datePurchaseOrder" class="label">Purchase Order Date</label>
                                        <b-form-input
                                            id="datePurchaseOrder"
                                            v-model="purchaseOrder.datePurchaseOrder"
                                            type="date"
                                            required
                                            disabled
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-7 col-12">
                                <b-form-group class="required">
                                    <label for="noCustRef" class="label">Customer Reference No</label>
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
                                    <label for="noProject" class="label">Project No</label>
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
                                    <label for="companyName" class="label">Company Name</label>
                                    <b-form-input
                                        id="companyName"
                                        v-model="company.nama"
                                        type="text"
                                        required
                                        placeholder="Company Name"
                                        pattern=".*[a-zA-Z0-9-].*"
                                        >
                                    </b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-5 col-12">
                                <b-form-group class="required">
                                    <label for="attnName" class="label">Attn Name</label>
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
                            <label for="companyAddress" class="label">Company Address</label>
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
                                <div class="col-md-4 required">
                                    <label class="label">Item</label>
                                </div>
                                <div class="col-md-2 required">
                                    <label class="label">Quantity</label>
                                </div>
                                <div class="col-md-2 required">
                                    <label class="label">UOM</label>
                                </div>
                                <div class="col-md-3 required">
                                    <label class="label">Unit Price (IDR)</label>
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
                            <label for="paymentNote" class="label">Payment Notes</label>
                            <ckeditor :editor="editor" v-model="purchaseOrder.paymentNote"></ckeditor>
                        </b-form-group>

                        <!-- Add & Cancel Button -->
                        <div class = "button-group">
                            <b-button class = "save-button" type="submit">Save</b-button>
                            <router-link :to="{name: 'detail-purchase-order'}">
                                <b-button class = "cancel-button" type="reset">Cancel</b-button>
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
                            <p id="modal-message">Purchase Order no. {{purchaseOrder.noPurchaseOrder}} will be changed soon once you click the save button.</p>
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
                            <p id="modal-message">Purchase order no. {{purchaseOrder.noPurchaseOrder}} was successfully changed.</p>
                        </b-col>
                    </b-row>
                </div>
            </template>

            <template v-slot:modal-footer="{ ok }">
                <b-col class="button-confirm-group">
                    <router-link :to="{name: 'purchase-order'}">
                        <b-button class="back-button">Back to List</b-button>
                    </router-link>
                    <b-button @click="ok()" class="see-button">
                        See Details
                    </b-button>
                </b-col>
            </template>
        </b-modal>

        <b-modal title="Failed!" v-model="failedModal" centered ok-only>
            Purchase Order was failed to change.
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
        return{
            editor: ClassicEditor,

            purchasedItems: [],
            id_purchased_item : {id:0},

            purchaseOrder : {

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
            warningModal: false,
            send : {objects : null},
        }
    },

    beforeMount(){
        this.getDetail();
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

        onModal(evt){
            this.warningModal = true;
        },

        onSubmit(evt){
            evt.preventDefault();
            this.purchaseOrder.purchasedItems = this.purchasedItems;
            this.updatePurchaseOrder(JSON.stringify(this.purchaseOrder));
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
            this.purchaseOrder.datePurchaseOrder = this.purchaseOrder.datePurchaseOrder.substring(0,10);
            let purchased_item = this.purchaseOrder.purchasedItems
            for(let i = 0; i < purchased_item.length; i++){
                this.new_purchased_item.id_purchased_item++;
                this.new_purchased_item.name = purchased_item[i].name;
                this.new_purchased_item.quantity = purchased_item[i].quantity;
                this.new_purchased_item.unitOfMeasurement = purchased_item[i].unitOfMeasurement;
                this.new_purchased_item.pricePerUnit = purchased_item[i].pricePerUnit;

                let purch_item = Object.assign({}, this.new_purchased_item);
                this.purchasedItems.push(purch_item);

                this.new_purchased_item.name = ''
                this.new_purchased_item.quantity = ''
                this.new_purchased_item.unitOfMeasurementom = ''
                this.new_purchased_item.pricePerUnit = ''
                this.new_purchased_item.purchaseOrder = ''
            }
        },

        getDetail: function(){
            axios.get('http://localhost:8080/api/purchase-order/' + this.$route.params.id)
            .then(res => {this.purchaseOrder = res.data, this.fetchData(), this.company = res.data.company})
            .catch(err => this.purchaseOrder = err.data)
        },

        updatePurchaseOrder(purchaseOrder){
            axios.put('http://localhost:8080/api/purchase-order/' + this.$route.params.id + '/update',
            purchaseOrder,
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.purchaseOrder = res.data.result, this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({name: 'detail-purchase-order', params: {id:this.purchaseOrder.id}});
        },

        hideModal(){
            this.$refs['modal-hide'].hide();
        }
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
#paymentNote{
    height: 180px;
}
</style>
