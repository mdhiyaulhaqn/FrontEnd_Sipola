<template>
    <div class="row">
        <div class = "col-12">
            <b-breadcrumb id="breadcrumb">
                <b-breadcrumb-item :to="{name: 'invoice'}">
                    Invoice List
                </b-breadcrumb-item>
                <b-breadcrumb-item :to="{name: 'sales-order-for-invoice'}">
                    Sales Order List
                </b-breadcrumb-item>
                <b-breadcrumb-item active>
                    Detail Sales Order
                </b-breadcrumb-item>
            </b-breadcrumb>

            <div class="judul">
                <strong>
                    Detail Sales Order
                </strong>
            </div> 
            
            <card>
                <b-row>
                    <div class = "col-8 nama-perusahaan">{{sales_order.company.nama}}</div>
                    <div class = "col-4">Created by : {{sales_order.createdBy}} <br>Created At : {{ sales_order.createdAt.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                <b-row>
                    <div class = "col-3">Sales Order No</div>
                    <div class = "col-6">: {{sales_order.noSalesOrder}}</div>
                </b-row>
                <b-row>
                    <div class = "col-3">Sales Order Date</div>
                    <div class = "col-6">: {{ sales_order.date.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                  <b-row>
                    <div class = "col-3">Purchase Order No</div>
                    <div class = "col-6">: {{ sales_order.poNumber }}</div>
                </b-row>
                  <b-row>
                    <div class = "col-3">Purchase Order Date</div>
                    <div class = "col-6">: {{ sales_order.poDate.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                <b-row>
                    <div class = "col-3">Address</div>
                    <div class = "col-6">: {{sales_order.company.alamat}}</div>
                </b-row>
                <br>
                
                <b-row>
                    <b-col >
                        <div class="tabel-service">
                            Service List
                            <div slot="raw-content" class="table-responsive" style="font-size:12px">
                                <b-table 
                                :items="sales_order.serviceOrder" 
                                :fields="fields">
                                 <template v-slot:cell(no)="row">
                                    {{sales_order.service.indexOf(row.item) + 1}}
                                </template>
                                </b-table>
                                
                            </div>
                        </div>
                    </b-col>
                
                </b-row>

                <b-row>
                    <div class = "col-12"><br>Terms and Condition</div>
                    <div class = "col-12">{{sales_order.termsCondition}}
                    </div>
                </b-row>

                <b-row>
                   
                    <div class="col">
                        <br>
                         <router-link :to="{name: 'invoice-add', params: {id: sales_order.id}}">
                            <button id ="generate_button" class="btn btn-primary">
                                Generate Invoice
                            </button>
                         </router-link>
                    </div>
                </b-row>

            </card>
        </div>
    </div>
</template>

<script>


import axios from 'axios';

export default {
    data() {
        return {
            sales_order : '',
            successModal : false,
            fields: [
                {key: 'id', label: 'No', sortable: true},
                {key: 'deskripsi', label: 'Description', sortable: true},
                {key: 'uom', label: 'UOM', sortable: true},
                {key: 'quantity', label: 'Quantity', sortable: true},
                {key: 'pricePerUnit', label: 'Unit Price(IDR)', sortable: true},
                {key: 'total_price', label:  'Total_Price(IDR)', sortable: true},
            ]
        };
    },
    beforeMount(){
        this.getDetail();

    },
    methods:{
        getDetail: function(){    
            axios.get('http://localhost:8080/api/sales-order/' +this.$route.params.id)
            .then(res => {this.sales_order = res.data})
            .catch(err => this.sales_order = err.data);
        },
    },
};
</script>

<style scoped>
body {
    font-family: 'Muli', sans-serif;
    background: #fafafa;
}

.judul{
    text-align: center;
    color: black;
    font-size:20px;
    margin-bottom: 20px;
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

.button_back{
    background-color: #FF3E1D;
    color:white;
    border-color: white;
    float:right;
    margin-top: 40px;
}

.button_oke{
    background-color:white;
    color:#FF3E1D;
    border-color: #FF3E1D;
    float:right;
    margin-top: 40px;
}

.tombol_okay{
    float:right;
}

#manage-button{
    margin-left: auto;
    margin-right: auto;
}

#delete_button{
    font-size: 10px;
    background-color: #ff3e1d;
    color:white;
    border-color: white;
}
#edit_button{
    font-size: 10px;
    background-color: #109CF1;
    color:white;
    border-color: white;
}
.button-group{
    text-align: center;
}

button{
    border-radius: 8px;
}

#delete_button{
    font-size: 10px;
    width: 56;
    background-color: #ff3e1d;
    color:white;
    border-color: white;
}
#edit_button{
    font-size: 10px;
    width: 130px;
    background-color: #109CF1;
    color:white;
    border-color: white;
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
    font-size: 10px;
    width: 130px;
    border-color: #ff3e1d;
    border-width: 1px;
    margin-right: 10px;
}

#cancel_delete_button{
    font-size: 10px;
    background-color: #ff3e1d;
    color:white;
    border-color: white;
    border-width: 1px;
}
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
</style>