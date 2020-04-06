<template>
    <div class="row">
        <div class = "col-12">
            <div class="judul">
                <strong>
                    Detail Reimbursement Report
                </strong>
            </div> 
            
            <card>
                <b-row>
                    <div class = "col-8">Reimbursement Report</div>
                </b-row>
                <b-row>
                    <div class = "col-2">Created by</div>
                    <div class = "col-6">: {{reimbursement.createdBy}}</div>
                </b-row>
                <b-row>
                    <div class = "col-2">Created At</div>
                    <div class = "col-6">:  {{ reimbursement.createdAt.split("T")[0].split("-").reverse().join('-') }}</div>
                </b-row>
                <b-row>
                    <div class = "col-2">ID Report</div>
                    <div class = "col-6">: {{reimbursement.id}}</div>
                </b-row>
                <b-row>
                    <div class = "col-2">Project Description</div>
                    <div class = "col-6">: {{ reimbursement.projectName}}</div>
                </b-row>
                <b-row>
                    <div class = "col-2">Total</div>
                    <div class = "col-6">: {{reimbursement.totalReimburse}}</div>
                </b-row>
                <b-row>
                    <div class = "col-6"><br>Expense</div>
                    <div class="col-6">
                        <button v-b-modal.modal-send id ="download_button" class="btn btn-primary">
                            Send to Finance
                            <span class="ti-download"></span>
                        </button>
                    </div>
                </b-row>
                
                <b-row>
                    <b-col >
                        <div class="tabel-expense">
                            <div slot="raw-content" class="table-responsive" style="font-size:12px">
                                <b-table 
                                :items="reimbursement.listExpense" 
                                :fields="fields">
                                 <template v-slot:cell(id)="row">
                                    {{reimbursement.listExpense.indexOf(row.item) + 1}}
                                </template>
                                 <template v-slot:cell(tanggal)="row">
                                    {{ row.item.createdAt.split("T")[0].split("-").reverse().join('-') }}
                                </template>
                                </b-table>
                                
                            </div>
                        </div>
                    </b-col>
                
                </b-row>

                <b-row>
                    <div class = "col-12"><br>Attachment</div>
                    <div class = "col-12">{{reimbursement.listAttachment}}
                    </div>
                </b-row>

                <b-row>
                   
                    <div class="col">
                        <br>
                        <button v-b-modal.modal-delete id ="delete_button" class="btn btn-primary">
                            Delete
                        </button>
                         <router-link :to="{name: 'update-reimbursement'}">
                            <button id ="edit_button" class="btn btn-primary">
                                Edit
                            </button>
                         </router-link>
                    </div>
                </b-row>

            </card>
        </div>

         <b-modal id="modal-send" ref="modal-send" hide-footer centered title="Send Reimburse">
			<br>
            <div class = "container">
                <div class = "info">
                <b-row>
                    <span class="ti-send"></span>Reimbursement Report for project {{reimbursement.projectName}} will be sent to finance
                </b-row>
                </div>
                <div class = "tombol_okay">
                    <b-row>
                        <b-button class = "button_oke" @click="sentFinance" size="md" variant="primary">Yes, Send It</b-button>
                        <b-button class = "button_back" @click="hideModalSend" size="md" >No</b-button>
                    </b-row>
                </div>
        
            </div>
        </b-modal>

        <b-modal id="modal-delete" ref="modal-delete" hide-footer centered title="Delete Reimbursement?" ok-only>
            <br>
            <div class = "container">
                <div class = "info">
                <b-row>
                <i class="fas fa-trash-alt"></i>Reimbursement Report for project {{reimbursement.projectName}} will be removed from the list.
                </b-row>
                </div>
                <div class = "tombol_okay">
                    <b-row>
                        <b-button class = "button_oke" @click="onSubmit" size="md" variant="primary">Yes, Delete It</b-button>
                        <b-button class = "button_back" @click="hideModal" size="md" >No</b-button>
                    </b-row>
                </div>
            </div>
        </b-modal>
        <b-modal title="Success!" v-model="successModal" @ok="redirect()" centered ok-only>
          <br>
            <div class = "container">
                <div class = "info">
                    <b-row>
                        <span class="ti-success"></span>Reimbursement Report for project {{reimbursement.projectName}} was successfully deleted from list.
                    </b-row>
                </div>
            </div>
        </b-modal>
        <b-modal title="Success!" v-model="successModalSend" @ok="redirect()" centered ok-only>
          <br>
            <div class = "container">
                <div class = "info">
                    <b-row>
                        <span class="ti-success"></span>Reimbursement Report for project {{reimbursement.projectName}} was sent to finance.
                    </b-row>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>

const tableColumns = []
// const tableData = [
//      {
//         'no': 1,
//         'scope of work': "Supervisi pemasangan Transformator  6 MVA ITP Citeureup",
//         'quantity': "1 Lot",
//         'unit price(IDR)' : '200.000.000',
//         'total price(IDR)' : '200.000.000',
//         },
//         {
//         'no': 2,
//         'scope of work': "Electrical contact surface flexible lamination, braid and adaptor including replacement of spring washer",
//         'quantity': "2 Lot",
//         'unit price(IDR)' : '100.000.000',
//         'total price(IDR)' : '200.000.000',
//     }
// ]

import axios from 'axios';

export default {
    data() {
        return {
            reimbursement : '',
            successModal : false,
            successModalSend : false,
            fields: [
                {key: 'id', label: 'No', sortable: true},
                {key: 'nama', label: 'Expense Item', sortable: true},
                {key: 'tanggal', label: 'Date', sortable: true},
                {key: 'nominal', label: 'Price(IDR)', sortable: true},
                // {key: 'harga * quantity', label:  'Total_Price(IDR)', sortable: true},
            ]
        };
    },
    beforeMount(){
        this.getDetail();

    },
    methods:{
        onSubmit(evt) {
            evt.preventDefault();
            this.deleteReimbursement(JSON.stringify(this.reimbursement));
        },
        
        showMessage(status){
            this.successModal = true;
        },

        getDetail: function(){    
            axios.get('http://localhost:8080/api/reimbursement/detail/' +this.$route.params.id)
            .then(res => {this.reimbursement = res.data})
            .catch(err => this.reimbursement = err.data);
        },

        deleteReimbursement(reimburse){

            axios.delete('http://localhost:8080/api/reimbursement/delete/' + this.$route.params.id, 
            reimburse, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'reimbursement-report'});
        },

        hideModal(){
            this.$refs['modal-delete'].hide();
        },

        sentFinance(evt) {
            evt.preventDefault();
            this.sendReimbursement();
        },

        hideModalSend(){
            this.$refs['modal-send'].hide();
        },

        sendReimbursement(reimburse){
            axios.put('http://localhost:8080/api/reimbursement/send/' + this.$route.params.id)
            .then(res => {this.showMessageSendModal(res.data.status)});
        },
        showMessageSendModal(status){
            this.successModalSend = true;
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
</style>