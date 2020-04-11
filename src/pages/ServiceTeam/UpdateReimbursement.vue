<template>
  <div>
    <h3 class="judul"><strong>Update Reimbursement Report</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group>
                    <label for="projectName">Project</label>
                    <b-form-input
                        id="projectName"
                        v-model="reimbursement.projectName"
                        type="text"
                        required
                        placeholder="Project Description"
                        >
                    </b-form-input>
                </b-form-group>

                <h5>Expenses</h5>
                <b-row>
                    <b-col md="5">
                      <label>Expense Name</label>
                    </b-col><br>

                    <b-col md="3">
                    <label>Price</label> 
                    </b-col>
                    <br>

                    <b-col md="3">
                    <label>Date</label>
                    </b-col><br>

                    <b-col md="1">
                    </b-col>
                </b-row>

                <b-row class="expenses" v-bind:key="item.id_expense" v-for="item in expenses">
                    <b-col>
                    <Expense v-bind:expense="item" v-on:del-expense="deleteRow" />
                    </b-col>
                </b-row> 

                 <b-row>
                    <b-col md="12">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">+ Add More Item</button>
                    </b-col>
                </b-row><br>
                
                <b-row>
                    <b-col>
                    <label>Attachment</label>
                    </b-col>
                </b-row>
                
                <div class = "button-group">
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                    <b-button class = "save-reimbursement-button" type="submit">Save</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>
    <b-modal title="Reimbursement Report Berhasil Tersimpan" v-model="successModal" @ok="redirect()"  centered ok-only>
        Reimbursement Report Has Been Updated.
    </b-modal>

    <b-modal title="Reimbursement Gagal Tersimpan" v-model="failedModal" centered ok-only>
        Failed to Save Reimbursement Report.
    </b-modal>
  </div>
</template>

<script>

import Expense from '@/pages/ServiceTeam/ExpenseReimbursement.vue';
import axios from 'axios';

export default {
    components : {
      Expense
    },
    data() { 
      return {
            expenses: [],
            file: [],
            id_expense : {id:0},
            timestamp:"",
            files: '',
            reimbursement: '',
            newReimbursement : {
                createdBy : "adi",
                projectName : '',
                totalReimburse : 0,
                statusReimburse : 'On Progress',
                status : 'Active',
                listExpense : '',
                listAttachment : '',
            },
            new_expense : {
                id_expense : 0,
                nama : '',
                nominal : '',
                tanggal : '',
                createdBy : 'Adi',
                paidBy : 'Adi',
                reimbursement : '',
                status : 'Active'
            },
            new_attachment : {
                id_attachment : 0,
                fileName : '',
                image : '',
                reimbursement : '',
            },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},
        }
    },

    beforeMount() {
      this.addRow();
      this.getDetail();
	},
    
    methods: {
        addRow(){
            this.new_expense.id_expense++;
            let expense = Object.assign({}, this.new_expense);
            this.expenses.push(expense)
        },

        deleteRow(id_expense){
            this.expenses = this.expenses.filter(result => result.id_expense !== id_expense);
        },

        onSubmit(evt) {
            evt.preventDefault();
            this.updateReimbursement(JSON.stringify(this.reimbursement));
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            } else {
                this.failedModal = true;
            }
        },

        getDetail: function(){    
            axios.get('http://localhost:8080/api/reimbursement/detail/' +this.$route.params.id)
            .then(res => {this.reimbursement = res.data, this.expenses = res.data.listExpense})
            .catch(err => this.reimbursement = err.data);
        },

        updateReimbursement(reimburse){
            console.log("add reimburse")
            axios.put('http://localhost:8080/api/reimbursement/update/' + this.$route.params.id, 
            reimburse, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.reimbursement = res.data.result, this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'detail-reimbursement',  params: {id:this.newReimbursement.id}});
        },

        hideModal(){
		    this.$refs['modal-hide'].hide();
        },

    }
}
</script>

<style scoped>

.add-button{
    width:360px;
    background-color: white;
    color : #109cf1;
    border-color: #109cf1;
}

.judul{
    text-align: center;
    color: black;
    font-size:20px;
    margin-bottom: 20px;
}
.isi-form{
    margin-left: auto;
    margin-right: auto;
}

.add-reimbursement-button{
    border-color: white;
    background-color: #109CF1;
    color:white;
}

.cancel-button{
    color:#109CF1;
    border-color:#109CF1;
    background-color: white;
}

.button-group{
    float:right;
}

</style>