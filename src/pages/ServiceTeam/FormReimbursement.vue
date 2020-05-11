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
                        maxlength="180"
                        >
                    </b-form-input>
                </b-form-group>

                <div class="d-none d-md-block d-lg-block">
                  <div class="row">
                    <div class = "col-md-5">
                      <label class="label">Expense Name</label>
                    </div>
                    <div class = "col-md-3">
                      <label class="label">Price</label>
                    </div>
                    <div class = "col-md-3">
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
                    <label>Attachment</label>
                    </b-col>
                </b-row>

                <b-row> 
                    <b-col>
                        <b-form-group>
                        <div class="dropzone">
                        <input type="file" class="input-file" ref="files" accept="image/*"
                        @change="selectFile" multiple/>
                        <p v-if="attachments.length === 0" class="call-to-action"><i class='fas fa-cloud-upload-alt' style='font-size:36px'></i> 
                        Drag and drop your images here or <label for="file">
                            <button class="buttonFile">Select <i class='far fa-arrow-alt-circle-up'></i></button></label></p>
                        
                        <div id="kotakAttachment">
                             <b-col class="col-xs-12 col-sm-12 col-md-3 grup-attachment" v-bind:key="file" v-for="file in attachments" >
                                <div class="foto">
                                 <img :src="untukPreview+file.image" alt="Image" class="image">
                                 <a class="removeIcon" @click="removeFile(file)"><i class="fas fa-minus-circle" style="font-size:36px"></i></a>
                                </div>
                                 <p>{{file.fileName}} </p>
                                 
                            </b-col>
                        </div>
                        </div>
                        </b-form-group>
                    </b-col>
                </b-row>

                <div class ="button-group">
                    <b-button class = "cancel-button" type="reset">Cancel</b-button>
                    <b-button class = "save-button" type="submit">Save</b-button>
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
              <p id="modal-message">Reimbursement Report was successfully added.</p>
            </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ ok }">
        <b-col class="button-confirm-group">
          <b-button @click="ok()" id="ok-button" variant="outline-primary">
            See Details
          </b-button>
        </b-col>
      </template>
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
                createdBy : "Ringgi Cahyo",
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
                createdBy : 'Ringgi Cahyo',
                paidBy : 'Ringgi Cahyo',
                reimbursement : '',
                status : 'Inactive'
            },
            show: true,
            successModal : false,
            failedModal : false,
            send : {objects : null},
            
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

        removeFile(file) {
            console.log("masuk remove")
            this.attachments.splice(this.attachments.indexOf(file), 1);
            console.log(this.attachments);
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
            axios.post('http://localhost:8080/api/attachment/uploadFile',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {this.attachments.push(res.data.result)});
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
    width:100%;
    background-color: white;
    color : #109cf1;
    border-color: #109cf1;
}

.save-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  margin-left: 10px;
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
  font-size: 10px;
}

.button-group{
  margin-top: 30px;
  text-align: center;
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

.file-label {
    height: 100px;
    width: 100%;
}

.image-preview {
    height: 100px;
    width: 100px;
    padding: 5px 10px 5px 10px;
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

.buttonFile {
    background-color: white;
    border: 1px solid gray;
}

#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
}
.button-confirm-group{
  text-align: right;
}

img {
    max-width: 100px;
    max-height: 100px;
}

.grup-attachment{
    padding: 5px 5px 5px 5px;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.removeIcon {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.foto {
  position: relative;
  width: 100%;
}

.foto:hover .image {
  opacity: 0.3;
}

.foto:hover .removeIcon {
  opacity: 1;
}

#kotakAttachment {
    padding: 10px 10px;
}

</style>