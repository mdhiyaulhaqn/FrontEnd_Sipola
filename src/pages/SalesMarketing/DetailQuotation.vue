<template>
    <div class="row">
        <div class = "col-12">
            <div class="judul">
                <strong>
                    Detail Quotation
                </strong>
            </div> 
            
            <card>
                <b-row>
                    <div class = "col-8 nama-perusahaan">{{quotation.company.nama}}</div>
                    <div class = "col-4">Created by : {{quotation.createdBy}} <br>Created At : {{ quotation.createdAt.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                <b-row>
                    <div class = "col-2">Quotation Number</div>
                    <div class = "col-6">: {{quotation.noQuotation}}</div>
                </b-row>
                <b-row>
                    <div class = "col-2">Quotation Date</div>
                    <div class = "col-6">: {{ quotation.date.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                <b-row>
                    <div class = "col-2">Address</div>
                    <div class = "col-6">: {{quotation.company.alamat}}</div>
                </b-row>
                <b-row>
                    <div class = "col-6"><br>Service</div>
                    <div class = "col-6">
                         <button v-b-modal.modal-download id ="download_button" class="btn btn-primary">
                            Download
                            <span class="ti-download"></span>
                        </button>
                    </div>
                </b-row>
                
                <b-row>
                    <b-col >
                        <div class="tabel-service">
                            <div slot="raw-content" class="table-responsive" style="font-size:12px">
                                <b-table 
                                :items="quotation.service" 
                                :fields="fields">
                                 <template v-slot:cell(id)="row">
                                    {{quotation.service.indexOf(row.item) + 1}}
                                </template>
                                 <template v-slot:cell(Total_Price(IDR))="row">
                                    {{row.item.harga}} * {{row.item.quantity}}
                                </template>
                                </b-table>
                                 <div class = "col-6">: {{quotation.total_harga_semua}}</div>
                            </div>
                        </div>
                    </b-col>
                
                </b-row>

                <b-row>
                    <div class = "col-12"><br>Terms and Condition</div>
                    <div class = "col-12">{{quotation.termsCondition}}
                    </div>
                </b-row>

                <b-row>
                   
                    <div class="col">
                        <br>
                        <button v-b-modal.modal-delete id ="delete_button" class="btn btn-primary">
                            Delete
                        </button>
                         <router-link :to="{name: 'update-quotation'}">
                            <button id ="edit_button" class="btn btn-primary">
                                Edit
                            </button>
                         </router-link>
                    </div>
                </b-row>

            </card>
        </div>

         <b-modal id="modal-download" ref="modal-download" hide-footer centered title="Download Quotation">
			<br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <span class="ti-download"></span>The system is downloading quotation no. {{quotation.noQuotation}}
                </b-row>
                </div>
                <div class = "tombol_okay">
                    <b-row>
                        <b-button id = "edit_button" @click="hideModal" size="md" variant="primary">Okay</b-button>
                    </b-row>
                </div>
        
            </div>
        </b-modal>

         <b-modal id="modal-delete" ref="modal-delete" hide-footer centered title="Delete Expense">
			<br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="ti-trash"></b-col>
                    <b-col cols="9">
                        Tiket Pesawat CGK - Sawangan will be removed from expense list.
                    </b-col>
                </b-row>
                </div>
                <b-row>
                    <b-col class="button-confirm-group">
                         <b-button @click="hideModal" id ="confirm_delete_button" variant="outline-danger">
                            Yes, Delete it
                        </b-button>
                        <b-button @click="hideModal" id ="cancel_delete_button" class="btn btn-danger">
                            No
                        </b-button>
                    </b-col>
                </b-row>
                <!-- <div class = "tombol_okay">
                    <b-row>
                        <b-button class = "button_back" @click="hideModal" size="md" variant="primary">Okay</b-button>
                    </b-row>
                </div> -->
        
            </div>
        </b-modal>

        <b-modal id="modal-delete" ref="modal-delete" hide-footer centered title="Delete Quotation?" ok-only>
            <br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <b-col cols="3" class="ti-trash"></b-col>
                    <b-col cols="9">
                       Quotation no {{quotation.noQuotation}} will be removed from the list.
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
                        <span class="ti-success"></span>Quotation no.{{quotation.noQuotation}} was successfully deleted from list.
                    </b-row>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>

const tableColumns = []
const tableData = [
     {
        'no': 1,
        'scope of work': "Supervisi pemasangan Transformator  6 MVA ITP Citeureup",
        'quantity': "1 Lot",
        'unit price(IDR)' : '200.000.000',
        'total price(IDR)' : '200.000.000',
        },
        {
        'no': 2,
        'scope of work': "Electrical contact surface flexible lamination, braid and adaptor including replacement of spring washer",
        'quantity': "2 Lot",
        'unit price(IDR)' : '100.000.000',
        'total price(IDR)' : '200.000.000',
    }
]

import axios from 'axios';

export default {
    data() {
        return {
            quotation : '',
            successModal : false,
            fields: [
                {key: 'id', label: 'No', sortable: true},
                {key: 'nama', label: 'Scope of Work', sortable: true},
                {key: 'quantity', label: 'Quantity', sortable: true},
                {key: 'harga', label: 'Unit Price(IDR)', sortable: true},
                {key: 'total_harga', label:  'Total_Price(IDR)', sortable: true},
            ]
        };
    },

    beforeMount(){
        this.getDetail();
    },

    methods:{
        onSubmit(evt) {
            evt.preventDefault();
            this.quotation.status = 'Inactive';
            this.deleteQuotation(JSON.stringify(this.quotation));
        },
        
        showMessage(status){
            this.successModal = true;
        },

        computeTotal(){
            var total_harga_semua = 0;
            for (let i = 0; i < this.quotation.service.length; i++) {
                this.quotation.service[i].total_harga = this.quotation.service[i].harga * this.quotation.service[i].quantity;
                total_harga_semua +=  this.quotation.service[i].total_harga;
            }
            this.quotation.total_harga_semua = total_harga_semua;
        },

        getDetail: function(){    
            axios.get('http://localhost:8080/api/quotation/' +this.$route.params.id)
            .then(res => {this.quotation = res.data, this.computeTotal()})
            .catch(err => this.quotation = err.data);
        },

        deleteQuotation(quot){
            axios.put('http://localhost:8080/api/quotation/change-status/' + this.$route.params.id, 
            quot, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'quotation'});
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
</style>