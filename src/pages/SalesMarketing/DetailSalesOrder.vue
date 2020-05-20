<template>
    <div class="row">
        <div class = "col-12">
           <b-breadcrumb id="breadcrumb" v-if="currentUser().roles.includes('ROLE_SALES_MARKETING')">
                <b-breadcrumb-item :to="{name: 'sales-order'}">
                Sales Order
                </b-breadcrumb-item>
                <b-breadcrumb-item active>
                Detail Sales Order
                </b-breadcrumb-item>
            </b-breadcrumb>
            <b-breadcrumb id="breadcrumb" v-if="currentUser().roles.includes('ROLE_FINANCE')">
                <b-breadcrumb-item :to="{name: 'invoice'}">
                    Invoice
                </b-breadcrumb-item>
                <b-breadcrumb-item :to="{name: 'sales-order-for-invoice'}">
                    Sales Order
                </b-breadcrumb-item>
                <b-breadcrumb-item active>
                    Detail Sales Order
                </b-breadcrumb-item>
            </b-breadcrumb>
            <h3 class="judul"><strong>Detail Sales Order</strong></h3>
            <div ref="content">
            <div class = "row">
            <div class="col-md-12 col-sm-12 col-xs-12 col-12 d-block d-xs-block d-sm-block center">
            <card class="col">
              <h5 class="text-center">Sales Order</h5>
                <div class="container-fluid">
                    <b-row>
                        <div class = "col-lg-7 col-sm-7 col-xs-6 nama-perusahaan">{{company.nama}}</div>
                        <div class = "col-lg-5 col-sm-5 col-xs-6">
                            <div class ="row">
                                <div class = "col-lg-5 col-sm-5 col-5">Created by</div>
                                <div class = "col-lg-7 col-sm-7 col-7">: {{sales_order.createdBy}} </div>
                                <div class = "col-lg-5 col-sm-5 col-5">Created at</div>
                                <div class = "col-lg-7 col-sm-7 col-7">: {{sales_order.createdAt.slice(0, 19) | moment('lll') }}</div>
                            </div>
                        </div>
                    </b-row>
                    <b-row>
                        <div class = "col-lg-3 col-sm-4 col-5">Sales Order Number</div>
                        <div class = "col-lg-6 col-sm-8 col-7">: {{sales_order.noSalesOrder}}</div>
                    </b-row>
                    <b-row>
                        <div class = "col-lg-3 col-sm-4 col-5">Sales Order Date</div>
                        <div class = "col-lg-6 col-sm-8 col-7">: {{ sales_order.date | moment('ll') }}</div>
                    </b-row>
                    <b-row>
                        <div class = "col-lg-3 col-sm-4 col-5">Address</div>
                        <div class = "col-lg-6 col-sm-8 col-7">: {{company.alamat}}</div>
                    </b-row>
                    <b-row>
                        <div class = "col-lg-6 col-sm-4 col-12"><br>Service Order</div>
                    </b-row>

                    <b-row>
                        <b-col >
                            <div class="tabel-service">
                                <div slot="raw-content" class="table-responsive" style="font-size:12px">
                                    <b-table
                                    :items="sales_order.serviceOrder"
                                    :fields="fields">
                                    <template v-slot:cell(nomer)="row">
                                        {{sales_order.serviceOrder.indexOf(row.item) + 1}}
                                    </template>
                                    </b-table>
                                </div>
                            </div>
                        </b-col>
                    </b-row>

                    <b-row>
                        <div class = "col-3">Total</div>
                        <div class = "col-9"> : {{sales_order.total_harga_semua}}
                        </div>
                    </b-row>


                    <b-row>
                        <div class = "col-12"><br>Terms and Condition</div>
                        <div class = "col-12" id="terms-condition" v-html=sales_order.termsCondition>
                        </div>
                    </b-row>

                    <b-row v-if="currentUser().roles.includes('ROLE_SALES_MARKETING')">
                        <div class = "button-group col-sm-12">
                            <b-button v-b-modal.modal-delete id="delete-button" class="btn btn-primary">Delete</b-button>
                            <router-link :to="{name: 'update-sales-order'}">
                                <b-button id="edit-button" class="btn btn-primary">Edit</b-button>
                            </router-link>
                        </div>
                    </b-row>

                    <b-row v-if="currentUser().roles.includes('ROLE_FINANCE')">
                        <div class = "button-group col-sm-12">
                            <router-link :to="{name: 'invoice-add'}">
                                <b-button id="generate-button" class="btn btn-primary">Generate Invoice</b-button>
                            </router-link>
                        </div>
                    </b-row>
                </div>
            </card>
            </div>
            </div>
            </div>
        </div>

         <b-modal
            id="modal-delete"
            ref="modal-delete"
            centered
            >
            <template v-slot:modal-title>
                <div class="container">
                <h5 id="modal-title-delete">Delete Sales Order?</h5>
                </div>
            </template>
            <template v-slot:default>
                <div class="container">
                <b-row>
                    <b-col class="modal-icon col-2">
                        <img src="@/assets/img/delete-confirm-icon.png" alt="" width="50px">
                    </b-col>
                    <b-col class="col-10">
                        <p id="modal-message"> Sales order no {{sales_order.noSalesOrder}} will be removed from the list.</p>
                    </b-col>
                </b-row>
                </div>
            </template>
            <template v-slot:modal-footer="{ cancel }">
                <b-col class="button-confirm-group">
                <b-button @click="onSubmit" id ="confirm_delete_button" variant="outline-danger">
                    Yes, delete it
                </b-button>
                <b-button @click="cancel()" id ="cancel_delete_button" class="btn btn-danger">
                    Cancel
                </b-button>
                </b-col>
            </template>
        </b-modal>

        <b-modal
            id="modal-success"
            ref="modal-success"
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
                    <p id="modal-message">Sales order no. {{sales_order.noSalesOrder}} was successfully deleted from list.</p>
                    </b-col>
                </b-row>
                </div>
            </template>
            <template v-slot:modal-footer="{ ok }">
                <b-col class="button-confirm-group">
                <b-button @click="ok()" id="ok-button">
                    OK
                </b-button>
                </b-col>
            </template>
        </b-modal>
    </div>
</template>

<script>


import axios from 'axios';
import authHeader from '../../services/auth-header';

export default {
    data() {
        return {
            sales_order : {
              createdAt: []
            },
            successModal : false,
            fields: [
                {key: 'nomer', label: 'No'},
                {key: 'deskripsi', label: 'Description', sortable: true},
                {key: 'uom', label: 'UOM', sortable: true},
                {key: 'quantity', label: 'Quantity', sortable: true},
                {key: 'harga_satuan', label: 'Unit Price (IDR)', formatter: value => {
                    return value.toLocaleString('de-DE')}},
                {key: 'total_harga', label:  'Total Price (IDR)', formatter: value => {
                    return value.toLocaleString('de-DE')}},
            ],
            company:{
              id: '',
              nama: '',
              alamat: ''
            },
            url_local: 'http://localhost:8080/api/sales-order/',
            url_deploy: 'https://sipola-sixab.herokuapp.com/api/sales-order/'
        };
    },
    beforeMount(){
        this.getDetail();

    },
    methods:{
        onSubmit(evt) {
            evt.preventDefault();
            this.sales_order.status = 'Inactive';
            this.deleteSalesOrder(this.sales_order);
        },

        showMessage(status){
            this.successModal = true;

        },

        fetchData(){
            var total_harga_semua = 0;
            for (let i = 0; i < this.sales_order.serviceOrder.length; i++) {
                this.sales_order.serviceOrder[i].nomer = i+1;
                this.sales_order.serviceOrder[i].total_harga = this.sales_order.serviceOrder[i].pricePerUnit * this.sales_order.serviceOrder[i].quantity;
                total_harga_semua +=  this.sales_order.serviceOrder[i].total_harga;
            }
            this.sales_order.total_harga_semua = total_harga_semua;

            for (let i = 0; i < this.sales_order.serviceOrder.length; i++) {
                this.sales_order.serviceOrder[i].harga_satuan = 'Rp ' + this.sales_order.serviceOrder[i].pricePerUnit.toLocaleString('de-DE') + ',00';
                this.sales_order.serviceOrder[i].total_harga =  'Rp ' +this.sales_order.serviceOrder[i].total_harga.toLocaleString('de-DE') + ',00';
            }

            this.sales_order.total_harga_semua = 'Rp ' +  total_harga_semua.toLocaleString('de-DE')  + ',00';


        },

        getDetail: function(){
            axios.get(this.url_deploy +this.$route.params.id, { headers: authHeader() })
            .then(res => {this.sales_order = res.data, this.fetchData(), this.company = res.data.company})
            .catch(err => this.sales_order = err.data);
        },

        deleteSalesOrder(salesOrder){
            axios.put(this.url_deploy + 'change-status/' + this.$route.params.id,
            salesOrder,
                { headers:
                   authHeader()

            })
            .then(res => {this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'sales-order'});
        },

        hideModal(){
            this.$refs['modal-download'].hide();
        },

        currentUser() {
            return this.$store.state.auth.user;
        },
  }
};
</script>

<style scoped>

.judul{
  text-align: center;
  color: black;
  margin: 11px 0 24px 0;
}
#generate-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  line-height: 15px;
  font-size: 12px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
  text-align: center;
}

#edit-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  width: 110px;
  margin-left: 10px;
  line-height: 15px;
  font-size: 12px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
}

#delete-button{
  background-color: #FF3E1D;
  border-color: #FF3E1D;
  width: 80px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
}

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
}

.nama-perusahaan{
    color: black;
    font-size:20px;
    margin-bottom: 20px;
}
.tabel-service{
    font-size:15px;
}
#download_button{
    font-size: 10px;
    float:right;
    background-color: green;
    color:white;
    border-color: white;
}

#modal-download{
    color:black;
}

.ti-download{
    margin-left:10px;
    margin-right: 10px;
}

.fa-warning{
    margin-left:10px;
    margin-right: 10px;
}

.modal-header{
    background-color: #FF3E1D;
}


h5{
  font-weight: bold;
}

.ti-trash{
    font-size: 50px;
    text-align: center;
    color:#ff3e1d;
}

.button-confirm-group{
  text-align: right;
}
#confirm_delete_button{
  font-size: 12px;
  width: 110px;
  border-color: #ff3e1d;
  border-width: 1px;
  margin-right: 10px;
  line-height: 15px;
}
#cancel_delete_button{
  font-size: 12px;
  background-color: #ff3e1d;
  color:white;
  border-color: white;
  border-width: 1px;
  line-height: 15px;
}
#modal-message{
  font-size: 16px;
}
#modal-title-delete{
  color:#FF3E1D;
  font-weight: 1000;
}
#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
  margin-bottom: -4px;
}
#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  font-size: 12px;
  line-height: 15px;
  border-width: 1px;
}
#modal-message{
    font-size: 16px;
}
#modal-title-delete{
    color:#FF3E1D;
    font-weight: 1000;
    margin-bottom: -4px;
}
#modal-title-download{
    color: #109CF1;
    font-weight: 1000;
    margin-bottom: -4px;
}
#modal-title-success{
    color: #109CF1;
    font-weight: 1000;
    margin-bottom: -4px;
}
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
</style>
