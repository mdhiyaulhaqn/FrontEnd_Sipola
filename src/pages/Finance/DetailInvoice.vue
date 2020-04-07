<template>
    <div class="row">
        <div class = "col-12">
            <div class="judul">
                <strong>
                    Detail Invoice
                </strong>
            </div> 
            
            <card>
                <b-row>
                    <div class = "company-name">{{ invoice.salesOrder.company.nama }}</div>
                </b-row>
                <b-row>
                    <div class = "col-3">Invoice No</div>
                    <div class = "col-6">: {{ invoice.noInvoice }}</div>
                    <div class = "col-3">Sales Order No: {{ invoice.salesOrder.noSalesOrder }}</div>
                </b-row>
                <b-row>
                    <div class = "col-3">Invoice Date</div>
                    <div class = "col-6">: {{ invoice.dateInvoice.split("T")[0].split("-").reverse().join('-') }}</div>
                    <div class = "col-3">Due Date: {{ invoice.dueDate.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                  <b-row>
                    <div class = "col-3">Purchase Order No</div>
                    <div class = "col-6">: {{ invoice.noPurchaseOrder }}</div>
                    <div class = "col-3">Created By: {{ invoice.createdBy }}</div>
                </b-row>
                  <b-row>
                    <div class = "col-3">Purchase Order Date</div>
                    <div class = "col-6">: {{ invoice.datePurchaseOrder.split("T")[0].split("-").reverse().join('-') }}</div>
                    <div class = "col-3">Created At: {{ invoice.createdAt.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                <b-row>
                    <div class = "col-3">Address</div>
                    <div class = "col-6">: {{invoice.company.alamat}}</div>
                    <div class = "col-3"> Terms Of Delivery: {{invoice.termsOfDelivery}}
                        <br> Payment Terms: {{invoice.paymentTerms}}
                    </div>
                </b-row>
                <br>
                
                <b-row>
                    <b-col >
                        <div class="tabel-service">
                            Service List
                            <div slot="raw-content" class="table-responsive" style="font-size:12px">
                                <b-table 
                                :items="invoice.salesOrder.serviceOrder" 
                                :fields="fields">
                                 <template v-slot:cell(no)="row">
                                    {{invoice.salesOrder.service.indexOf(row.item) + 1}}
                                </template>
                                </b-table>
                                
                                <b-row>
                                    <div class = "col-3"></div>
                                    <div class = "col-6">Sub-total</div>
                                    <div class = "col-3">: Sub-total</div>
                                </b-row>
                                <b-row>
                                    <div class = "col-3"></div>
                                    <div class = "col-6">VAT</div>
                                    <div class = "col-3">: VATprice</div>
                                </b-row>
                                <b-row>
                                    <div class = "col-3"></div>
                                    <div class = "col-6" style="bold">Grand total</div>
                                    <div class = "col-3">: GrandTotal</div>
                                </b-row>
                            </div>
                        </div>
                    </b-col>
                </b-row>

                <b-row>
                    <div class="col">
                        <br>
                        <button v-b-modal.modal-delete id ="delete_button" class="btn btn-primary">
                            Delete
                        </button>
                         <router-link :to="{name: 'update-invoice'}">
                            <button id ="edit_button" class="btn btn-primary">
                                Edit
                            </button>
                         </router-link>
                    </div>
                </b-row>

            </card>
        </div>

        <b-modal id="modal-delete" ref="modal-delete" hide-footer centered title="Delete Invoice?" ok-only>
            <br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="ti-trash"></b-col>
                    <b-col cols="9">
                       Invoice no {{invoice.noInvoice}} will be removed from the list.
                    </b-col>
                </b-row>
                </div>
                <b-row>
                    <b-col class="button-confirm-group">
                         <b-button @click="onSubmit" id ="confirm_delete_button" variant="outline-danger">
                            Yes, Delete it
                        </b-button>
                        <b-button @click="hideModal" id ="cancel_delete_button" class="btn btn-danger">
                            No
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </b-modal>

        <b-modal title="Success!" v-model="successModal" @ok="redirect()" centered ok-only>
          <br>
            <div class = "container">
                <div class = "info">
                    <b-row>
                        <span class="ti-success"></span>Invoice no.{{invoice.noInvoice}} was successfully deleted from list.
                    </b-row>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>


import axios from 'axios';

export default {
    data() {
        return {
            invoice : '',
            successModal : false,
            fields: [
                {key: 'id', label: 'No', sortable: true},
                {key: 'deskripsi', label: 'Description', sortable: true},
                {key: 'uom', label: 'UOM', sortable: true},
                {key: 'quantity', label: 'Quantity', sortable: true},
                {key: 'pricePerUnit', label: 'Unit Price(IDR)', sortable: true},
                {key: 'total_price', label:  'Value(IDR)', sortable: true},
            ]
        };
    },
    beforeMount(){
        this.getDetail();

    },
    methods:{
        onSubmit(evt) {
            evt.preventDefault();
            this.invoice.status = 'Inactive';
            this.deleteInvoice(JSON.stringify(this.invoice));
        },
        
        showMessage(status){
            this.successModal = true;

        },

        getDetail: function(){    
            axios.get('http://localhost:8080/api/invoice/' +this.$route.params.id)
            .then(res => {this.invoice = res.data})
            .catch(err => this.invoice = err.data);
        },

        deleteInvoice(invoice){
            axios.put('http://localhost:8080/api/invoice/delete-status/' + this.$route.params.id, 
            invoice, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'invoice'});
        },

        hideModal(){
            this.$refs['modal-download'].hide();
    },
  }
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
.company-name{
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
</style>