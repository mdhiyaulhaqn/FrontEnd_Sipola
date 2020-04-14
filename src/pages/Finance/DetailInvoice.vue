<template>
    <div class="row">
        <div class = "col-12">
            <b-breadcrumb id="breadcrumb">
                <b-breadcrumb-item :to="{name: 'invoice'}">
                    Invoice List
                </b-breadcrumb-item>
                <b-breadcrumb-item active>
                    Detail Invoice
                </b-breadcrumb-item>
            </b-breadcrumb>

            <div class="judul">
                <strong>
                    Detail Invoice
                </strong>
            </div> 
            
            <card>
            <div class="container-fluid">
                <b-row>
                    <div class = "company-name">{{ invoice.salesOrder.company.nama }}</div>
                </b-row>
                <b-row>
                    <div class = "col-md-2 col-6">Invoice No</div>
                    <div class = "col-md-6 col-6">: {{ invoice.noInvoice }}</div>
                    <div class = "col-md-2 col-6">Sales Order No</div>
                    <div class = "col-md-2 col-6">: {{ invoice.salesOrder.noSalesOrder }}</div>
                </b-row>
                <b-row>
                    <div class = "col-md-2 col-6">Invoice Date</div>
                    <div class = "col-md-6 col-6">: {{ invoice.dateInvoice.split("T")[0].split("-").reverse().join('-') }}</div>
                    <div class = "col-md-2 col-6">Due Date</div>
                    <div class = "col-md-2 col-6">: {{ invoice.dueDatePayment.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                <b-row>
                    <div class = "col-md-2 col-6">Purchase Order No</div>
                    <div class = "col-md-6 col-6">: {{ invoice.salesOrder.poNumber }}</div>
                    <div class = "col-md-2 col-6">Created By</div>
                    <div class = "col-md-2 col-6">: {{ invoice.createdBy }}</div>
                </b-row>
                  <b-row>
                    <div class = "col-md-2 col-6">Purchase Order Date</div>
                    <div class = "col-md-6 col-6">: {{ invoice.salesOrder.poDate.split("T")[0].split("-").reverse().join('-') }}</div>
                    <div class = "col-md-2 col-6">Created At</div>
                    <div class = "col-md-2 col-6">: {{ invoice.createdAt.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                <b-row>
                    <div class = "col-md-2 col-6">Address</div>
                    <div class = "col-md-6 col-6">: {{invoice.salesOrder.company.alamat}}</div>
                    <div class = "col-md-2 col-6"> Terms Of Delivery
                        <br> Payment Terms
                    </div>
                    <div class = "col-md-2 col-6">: {{invoice.termsOfDelivery}}
                        <br>: {{invoice.paymentTerms}}
                    </div>
                </b-row>
                <br>
                <b-row>
                    <div class = "col-lg-6 col-sm-4 col-12"><br>
                        Service List
                    </div>
                    <div class = "col-lg-6 col-sm-8 col-12">
                         <button  @click="downloadReport" id="download_button" class="btn btn-primary">
                            Download
                            <span class="ti-download"></span>
                        </button>
                    </div>
                </b-row>
                <br>
                <b-row>
                    <b-col >
                        <div class="tabel-service">
                            <div slot="raw-content" class="table-responsive" style="font-size:12px">
                                <b-table 
                                :items="invoice.salesOrder.serviceOrder" 
                                :fields="fields"
                                >
                                    <template v-slot:cell(No)="row">
                                        {{invoice.salesOrder.service.indexOf(row.item) + 1}}
                                    </template>
                                    <template v-slot:cell(Value(IDR))="row">
                                        {{row.item.pricePerUnit}} * {{row.item.quantity}}
                                    </template>

                                    <!-- <template slot="FOOT_Value(IDR)">
                                        <td>Sub-total: {{invoice.sub_total_price}}</td>
                                        <br>
                                        <td>VAT Price: {{invoice.price_vat}}</td>
                                        <br>
                                        <td>Grand-total Price: {{invoice.grand_total_price}}</td>
                                    </template> -->
                                </b-table>
                                
                            </div>
                        </div>
                    </b-col>
                </b-row>
                
                <b-row align-content="right">
                    <div class = "col-md-6 col-6">
                        Sub-total Price
                    </div>
                    <div class = "col-md-6 col-6">
                        : {{this.invoice.sub_total_price}}
                    </div>
                </b-row>
                <b-row align-content="rigt">
                    <div class = "col-md-6 col-6">
                        VAT Price
                    </div>
                    <div class = "col-md-6 col-6">
                        : {{this.invoice.price_vat}}
                    </div>
                </b-row>
                <b-row align-content="right">
                    <div class = "col-md-6 col-6">
                        Grand-total Price
                    </div>
                    <div class = "col-md-6 col-6">
                        : {{this.invoice.grand_total_price}}
                    </div>
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
                 </div>
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

        <b-modal id="modal-download" ref="modal-download" hide-footer centered title="Download Invoice">
			<br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <span class="ti-download"></span>The system is downloading invoice no. {{invoice.noInvoice}}<br><br>
                </b-row>
                </div>
                <div class = "ok-bttn">
                    <b-row>
                        <b-button id = "edit_button" @click="hideModal" size="md" variant="primary">Ok</b-button>
                    </b-row>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>


import axios from 'axios';
import jsPDF from 'jspdf';

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
                {key: 'pricePerUnit', label: 'Unit Price(IDR)', formatter: value =>{
                    return value.toLocaleString('id-ID')
                }},
                {key: 'total_price', label:  'Value(IDR)', formatter: value => {
                    return value.toLocaleString('id-ID')
                }},
            ]
        };
    },
    beforeMount(){
        this.getDetail();

    },
    methods:{
        onSubmit(evt) {
            evt.preventDefault();
            this.deleteInvoice(JSON.stringify(this.invoice));
            this.hideModal();
        },
        
        showMessage(status){
            this.successModal = true;

        },

        computePrice(){
            var sub_total_price = 0;
            for (let i = 0; i < this.invoice.salesOrder.serviceOrder.length; i++){
                this.invoice.salesOrder.serviceOrder[i].id = i+1;
                this.invoice.salesOrder.serviceOrder[i].total_price = this.invoice.salesOrder.serviceOrder[i].pricePerUnit * this.invoice.salesOrder.serviceOrder[i].quantity;
                sub_total_price += this.invoice.salesOrder.serviceOrder[i].total_price;
            }
            this.invoice.sub_total_price = sub_total_price;
            this.invoice.price_vat = 0.1 * this.invoice.sub_total_price;
            this.invoice.grand_total_price = this.invoice.sub_total_price + this.invoice.price_vat;
        },

        getDetail: function(){    
            axios.get('http://localhost:8080/api/invoice/' +this.$route.params.id)
            .then(res => {this.invoice = res.data, this.computePrice()})
            .catch(err => this.invoice = err.data);
        },

        deleteInvoice(invoice){
            axios.put('http://localhost:8080/api/invoice/' + this.$route.params.id + '/delete', 
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
            this.$refs['modal-delete'].hide();
        },

        downloadReport:function(){
            var doc = new jsPDF()
            let noInvoice = this.invoice.noInvoice
            let dateInvoice = this.invoice.dateInvoice
            let dueDatePayment = this.invoice.dueDatePayment
            let noPO = this.invoice.salesOrder.poNumber
            let datePO = this.invoice.salesOrder.poDate
            let noSalesOrder = this.invoice.salesOrder.noSalesOrder
            let companyName = this.invoice.salesOrder.company.nama
            let companyAddr = this.invoice.salesOrder.company.alamat
            let termsOfDelivery = this.invoice.termsOfDelivery
            let paymentTerms = this.invoice.paymentTerms

            doc.save("Invoice.pdf")
            this.$refs['modal-download'].show();
        }
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

#modal-delete{
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

.ok-bttn{
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