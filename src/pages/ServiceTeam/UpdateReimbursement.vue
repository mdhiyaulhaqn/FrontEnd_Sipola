<template>
  <div>
      <b-breadcrumb id="breadcrumb"> 
        <b-breadcrumb-item :to="{name: 'reimbursement-report'}">
            Reimbursement Report
        </b-breadcrumb-item>
        <b-breadcrumb-item :to="{name: 'detail-reimbursement'}">
            Detail Reimbursement Report
        </b-breadcrumb-item>
        <b-breadcrumb-item active>
            Update Reimbursement Report
        </b-breadcrumb-item>
    </b-breadcrumb>
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

                <b-row> 
                    <b-col>
                        <b-form-group>
                        <div class="dropzone">
                        <input type="file" class="input-file" ref="files"
                        @change="selectFile" multiple/>
                        <p v-if="!uploading && !isAnyImage" class="call-to-action"><i class='far fa-arrow-alt-circle-up' style='font-size:36px'></i> 
                        Drag and drop your files here or <label for="file">
                            <button class="buttonFile"><i class='far fa-arrow-alt-circle-up'></i> Select</button></label></p>
                        
                        <div class="col-3" v-bind:key="file" v-for="(file, index) in attachments" >
                            <b-card
                                :img-src="untukPreview+file.image"
                                img-alt="Image"
                                img-top
                                img-width="100px"
                                img-height="100px"
                                tag="article"
                                style="max-width: 200px;"
                                class="mb-2"
                            >
                            <b-card-text>
                                 {{file.fileName}}   
                            </b-card-text>
                            <b-button @click="removeFile(index)"><i class="fas fa-minus-circle" ></i></b-button>
                            </b-card>
                        </div>
                        </div>
                        </b-form-group>
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
            id_expense : {id:0},
            timestamp:"",
            attachments: [],
            untukPreview : 'data:image/jpeg;base64, ',
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
            console.log(this.attachments);
            console.log(this.expenses);
            this.reimbursement.listAttachment = this.attachments;
            this.reimbursement.listExpense = this.expenses;
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

        fetchData : function(){
            let listExpense = this.reimbursement.listExpense;
            for(let i=0; i< listExpense.length ; i++){
                this.new_expense.id_expense++;
                this.new_expense.nama = listExpense[i].nama;
                this.new_expense.nominal = listExpense[i].nominal;
                this.new_expense.tanggal = listExpense[i].tanggal.substring(0,10);

                let expense = Object.assign({}, this.new_expense);
                this.expenses.push(expense);

                this.new_expense.nama = '';
                this.new_expense.nominal = '';
                this.new_expense.tanggal = '';
                this.new_expense.reimbursement = '';
            }

            let listAttachment = this.reimbursement.listAttachment;
            console.log(this.reimbursement.listAttachment);
            for(let i=0; i< listAttachment.length ; i++){
                this.new_attachment.id_attachment++;
                this.new_attachment.fileName = listAttachment[i].fileName;
                this.new_attachment.image = listAttachment[i].image;

                let attachment = Object.assign({}, this.new_attachment);
                this.attachments.push(attachment);
            }
            console.log(this.attachments);
        },

        getDetail: function(){    
            axios.get('http://localhost:8080/api/reimbursement/detail/' +this.$route.params.id)
            .then(res => {this.reimbursement = res.data, this.fetchData()})
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

        removeFile(file) {
            console.log("masuk remove")
            this.attachments.splice(this.attachments.indexOf(file), 1);
        },

        selectFile(){
            const files = this.$refs.files.files;
            this.isAnyImage = true;
            for (let i = 0; i < files.length; i++) {
                // let reader = new FileReader();
                // reader.readAsDataURL(files[i]);
                // reader.onload = e => {
                //     let ava = e.target.result;
                //     this.previewFile.push(ava);
                // }
                this.uploadFile(files[i]);
            }
        },

        uploadFile(attach) {
            let formData = new FormData();
            formData.append('file', attach);
            axios.post('http://localhost:8080/api/attachment/uploadFile',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {this.attachments.push(res.data.result)});
        },

        redirect(){
            this.$router.push({ name: 'detail-reimbursement',  params: {id:this.reimbursement.id}});
        },

        hideModal(){
		    this.$refs['modal-hide'].hide();
        },

    }
}
</script>

<style scoped>

#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}

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

.dropzone {
    min-height: 200px;
    padding: 10px 10px;
    position: relative;
    cursor: pointer;
    outline: 2px dashed black; 
    outline-offset: -10px;
    border: white;
}

.input-file{
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
    background: black;
}

.dropzone:hover {
    background-color: lightgray;
}

.dropzone .call-to-action {
    font-size: 1.2rem;
    text-align: center;
    padding: 70px 0;
}

</style>