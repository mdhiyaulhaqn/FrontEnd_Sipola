<template>
  <div>
      <b-breadcrumb id="breadcrumb">
            <b-breadcrumb-item :to="{name: 'reimbursement-report'}">
                Reimbursement Report
            </b-breadcrumb-item>
            <b-breadcrumb-item active>
                Add Reimbursement Report
            </b-breadcrumb-item>
        </b-breadcrumb>
    <h3 class="judul"><strong>Add Reimbursement Report</strong></h3>
    <div class = "row">
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
          <card class="col">
            <h5 class="title-form">Add Reimbursement Report Form</h5>
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group class="required">
                    <label for="projectName" class="label">Project</label>
                    <b-form-input
                        id="projectName"
                        v-model="newReimbursement.projectName"
                        type="text"
                        required
                        placeholder="Project Description"
                        maxlength="180"
                        >
                    </b-form-input>
                </b-form-group>

                <div class="d-none d-md-block d-lg-block">
                  <div class="row">
                    <div class = "col-md-5 required">
                      <label class="label">Expense Name</label>
                    </div>
                    <div class = "col-md-3 required">
                      <label class="label">Price (IDR)</label>
                    </div>
                    <div class = "col-md-3 required">
                      <label class="label">Date</label>
                    </div>
                    <div class = "col-md-1">
                    </div>
                  </div>
                </div>

                <b-row class="expenses" v-bind:key="item.id_expense" v-for="item in expenses">
                    <b-col>
                        <Expense v-bind:expense="item" v-on:del-expense="deleteRow" />
                    </b-col>
                </b-row>

                 <b-row>
                    <div class="col-md-6 col-12">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">+ Add More Item</button>
                    </div>
                </b-row><br>

                <b-row>
                    <b-col>
                    <label class="label">Attachment</label>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-form-group>
                        <div class="dropzone">
                          <input type="file" class="input-file" ref="files"
                          @change="selectFile" multiple/>
                          <p v-if="attachments.length === 0" class="call-to-action"><i class='fas fa-cloud-upload-alt' style='font-size:36px'></i>
                          Drag and drop your files here or <label for="file">
                              <button class="buttonFile">Select <i class='far fa-arrow-alt-circle-up'></i></button></label></p>

                          <label for="file" class="label">
                              <button class="buttonFile" v-if="attachments.length > 0">Select <i class='far fa-arrow-alt-circle-up'></i></button></label>
                          <div class="row" id="kotakAttachment">
                              <b-col class="col-xs-6 col-sm-6 col-md-3 grup-attachment" v-bind:key="file" v-for="file in attachments" >
                                  <div class="foto" v-if="file.type === 'image/png' || file.type==='image/jpeg' || file.type==='image.jpg'">
                                    <img :src="untukPreview+file.image" alt="Image" class="img-fluid img-thumbnail">
                                    <a class="removeIcon" v-if="!loading" @click="removeFile(file)"><i class="fas fa-minus-circle" style="font-size:24px"></i></a>
                                  </div>
                                  <div class="foto" v-else>
                                    <img src="@/assets/img/document.png" class="img-fluid img-thumbnail">
                                    <a class="removeIcon" v-if="!loading" @click="removeFile(file)"><i class="fas fa-minus-circle" style="font-size:24px"></i></a>
                                  </div>
                                  <h6>{{file.fileName}} </h6>

                              </b-col>
                          </div>
                        </div>
                        </b-form-group>
                    </b-col>
                </b-row>

                <div class ="button-group">
                  <b-button class = "save-button" type="submit">Save</b-button>
                  <b-button class = "cancel-button" type="reset">Cancel</b-button>
                </div>
            </b-form>
            </card>
        </div>
    </div>
    <b-modal
      id="modal-success"
      centered
      v-model="successModal"
      @ok="redirect()"
      >
      <template v-slot:modal-title>
        <div class="container">
          <h5 id="modal-title-success" style="color: #109CF1;">Success!</h5>
        </div>
      </template>
      <template v-slot:default>
        <div class="container">
          <b-row>
            <b-col class="modal-icon col-2">
              <img src="@/assets/img/success-icon.png" alt="" width="50px">
            </b-col>
            <b-col class="col-10">
              <p id="modal-message">Reimbursement report was successfully added.</p>
            </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ ok }">
        <b-col class="button-confirm-group">
          <router-link :to="{name: 'reimbursement-report'}">
            <b-button class="back-button">Back to List</b-button>
          </router-link>
          <b-button @click="ok()" class="see-button">
            See Details
          </b-button>
        </b-col>
      </template>
    </b-modal>

    <b-modal title="Failed" v-model="failedModal" centered ok-only>
        Failed to add reimbursement.
    </b-modal>
  </div>
</template>

<script>

import Expense from '@/pages/ServiceTeam/ExpenseReimbursement.vue';
import axios from 'axios';
import authHeader from '../../services/auth-header';

export default {
    components : {
      Expense,
    },
    data() {
      return {

            // variabel for attachment
            uploading : false,
            file: '',
            files: [],
            avatar: null,
            attachment: '',
            statusAttach:'',
            attachments : [],
            uploadedFile: [],
            progress : 0,
            previewFile : [],
            untukPreview : 'data:image/jpeg;base64, ',
            // batas attachment

            expenses: [],
            id_expense : {id:0},
            timestamp:"",
            newReimbursement : {
                createdBy : '',
                projectName : '',
                totalReimburse : 0,
                statusReimburse : 1,
                status : 'Active',
                keterangan : '',
                listExpense : '',
                listAttachment : '',
            },
            new_expense : {
                id_expense : 0,
                nama : '',
                nominal : '',
                tanggal : '',
                createdBy : '',
                paidBy : '',
                reimbursement : '',
                anyReimbursement : true,
                status : 'Not Approved'
            },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},
            url_local: "http://localhost:8080/api/reimbursement/",
            url_deploy: "https://sipola-sixab.herokuapp.com/api/reimbursement/",
            url_attachment_local: "http://localhost:8080/api/attachment/",
            url_attachment_deploy: "https://sipola-sixab.herokuapp.com/api/attachment/",
      }
    },

    beforeMount() {
      this.addRow();
    },

    methods: {
        currentUser() {
          return this.$store.state.auth.user;
        },

        addRow(){
            this.new_expense.id_expense++;
            let expense = Object.assign({}, this.new_expense);
            this.expenses.push(expense)
        },

        deleteRow(id_expense){
          if (this.expenses.length > 1) {
            this.expenses = this.expenses.filter(result => result.id_expense !== id_expense);
          }
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
            this.newReimbursement.createdBy = this.currentUser().name;
            this.newReimbursement.listAttachment = this.attachments;
            for (let i = 0; i < this.expenses.length; i++){
              this.expenses[i].paidBy = this.currentUser().name;
              this.expenses[i].createdBy = this.currentUser().name;
            }
            this.newReimbursement.listExpense = this.expenses;
            this.addReimbursement(this.newReimbursement);
        },

        addReimbursement(reimburse){
            axios.post(this.url_deploy + 'add',
            reimburse,
                { headers: authHeader()
            })
            .then(res => {this.newReimbursement = res.data.result, this.showMessage(res.data.status)});
        },

        removeFile(file) {
            this.attachments.splice(this.attachments.indexOf(file), 1);
        },

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
            this.uploadFile(this.file);
        },

        selectFile(){
            const files = this.$refs.files.files;
            for (let i = 0; i < files.length; i++) {
              this.uploadFile(files[i]);
            }
        },

        uploadFile(attach) {
            let formData = new FormData();
            formData.append('file', attach);
            this.loading = true;
            axios.post(this.url_attachment_deploy + 'uploadFile',
            formData, {headers: authHeader()}
            )
            .then(res => {this.attachments.push(res.data.result)});
            this.loading = false;
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

.required label::after {
  content: " *";
  color: red;
}

.add-button{
    width:100%;
    background-color: white;
    color : #109cf1;
    border-color: #109cf1;
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
.add-reimbursement-button{
    border-color: white;
    background-color: #109CF1;
    color:white;
}

.file-label {
    height: 100px;
    width: 100%;
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

#kotakAttachment {
    padding: 10px 10px;
}

img {
    max-width: 100px;
    max-height: 100px;
}

.grup-attachment{
    padding: 5px 5px 5px 5px;
}

.foto {
  position: relative;
  width: 100%;
}

.buttonFile {
    background-color: white;
    border: 1px solid gray;
}

</style>
