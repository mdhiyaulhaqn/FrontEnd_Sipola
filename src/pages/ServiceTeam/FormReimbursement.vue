<template>
  <div>
    <h3 class="judul"><strong>Add Reimbursement Report</strong></h3>
    <div class = "row">
        <div class = "col-10 isi-form">
            <card>
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group>
                    <label for="projectName">Project</label>
                    <b-form-input
                        id="projectName"
                        v-model="newReimbursement.projectName"
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

                <!-- <b-row class="attachmentInput">
                    <b-col>
                       <drop class="drop" @drop="handleDrop">drop files</drop>
                       <div>
                           <li v-for="item in files">{{item.name}}</li>
                       </div> -->
                    <!-- <label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label>
                    <input class="box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple /> -->
                    <!-- </b-col>
                </b-row>
                <b-row> -->
                    
                <b-row>
                    <b-col md="12">
                        <b-form-group> 
                        <div class="file is-boxed is-secondary">
                            <label class="file-label">
                            <input class="file-input" type="file" ref="file" v-on:change="handleFilesUpload()"/>
                            <span class="file-cta">
                                <span class="file-icon"><i class="ti-upload"></i></span>
                                <span class="file-label">Drop Your Files Here...</span>
                            </span>
                                <span class="file-name" v-if="file">{{file.name}}</span>
                            </label>
                        </div>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <div class="box-image" v-if="avatar">
                            <img :src="avatar" v-if="avatar" alt="Image" class="image-preview">
                        </div>
                    </b-col>
                </b-row><br>
                <div class = "button-group">
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                    <b-button class = "add-reimbursement-button" type="submit">Add</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>
    <b-modal title="Reimbursement Report Berhasil Tersimpan" v-model="successModal" @ok="redirect()"  centered ok-only>
        Reimbursement telah berhasil dibuat.
    </b-modal>

    <b-modal title="Reimbursement Gagal Tersimpan" v-model="failedModal" centered ok-only>
        Reimbursement gagal dibuat.
    </b-modal>
  </div>
</template>

<script>

import Expense from '@/pages/ServiceTeam/ExpenseReimbursement.vue';
import axios from 'axios';

export default {
    components : {
      Expense,
    },
    data() { 
      return {
            expenses: [],
            file: '',
            id_expense : {id:0},
            timestamp:"",
            files: '',
            avatar: null,
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
                id: 0,
                fileName : '',
                image : '',
                reimbursement : '',
            },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},
            attachment: '',
            statusAttach:'',
            attachments : [],
        }
    },

    beforeMount() {
      this.addRow();
     
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

        onSubmit(evt) {
            evt.preventDefault();
            console.log(this.attachment);
            let attach = Object.assign(this.new_attachment, this.attachment);
            this.attachments.push(attach);
            this.newReimbursement.listAttachment = this.attachments;
            this.newReimbursement.listExpense = this.expenses;
            this.addReimbursement(JSON.stringify(this.newReimbursement));
        },

        addReimbursement(reimburse){
            console.log("add reimburse")
            console.log(reimburse);
            axios.post('http://localhost:8080/api/reimbursement/add', 
            reimburse, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.newReimbursement = res.data.result, this.showMessage(res.data.status)});
        },

        // removeFile(file) {
        //     this.files = this.files.filter(f => {
        //         return f != file;
        //     });
        // },

        redirect(){
            this.$router.push({ name: 'detail-reimbursement',  params: {id:this.newReimbursement.id}});
        },

        hideModal(){
		    this.$refs['modal-hide'].hide();
        },


        handleFilesUpload(){
            this.file = this.$refs.file.files[0];
            let image = this.$refs.file.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                this.avatar = e.target.result;
            }
            console.log(this.file);
            this.uploadFile(this.file);
        },

        uploadFile(attach) {
            let formData = new FormData();
            formData.append('file', this.file);
            axios.post('http://localhost:8080/api/attachment/uploadFile', 
            // FormData)
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {this.attachment = res.data.result});
            console.log('tes');
            console.log(this.attachment);
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

.file-label {
    height: 100px;
    width: 100%;
}

.image-preview {
    height: 100px;
    width: 100px;
    padding: 5px 10px 5px 10px;
}

.box-image{
    border: solid;
    border-color: gray;

}

</style>