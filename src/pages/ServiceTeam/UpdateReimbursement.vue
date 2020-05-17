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
        <div class = "col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
          <card class="col">
            <h5 class="title-form">Update Reimbursement Report Form</h5>
            <b-form @submit="onConfirmation" v-if="show">
                <b-form-group class="required">
                    <label for="projectName" class="label">Project</label>
                    <b-form-input
                        id="projectName"
                        v-model="reimbursement.projectName"
                        type="text"
                        required
                        placeholder="Project Description"
                        maxlength="180"
                        >
                    </b-form-input>
                </b-form-group>

                <div class="d-none d-md-block d-lg-block">
                  <div class="row">
                    <b-col md="5" class="required">
                      <label class="label">Expense Name</label>
                    </b-col><br>

                    <b-col md="3" class="required">
                    <label class="label">Price (IDR)</label>
                    </b-col>
                    <br>

                    <b-col md="3" class="required">
                    <label class="label">Date</label>
                    </b-col><br>

                    <b-col md="1">
                    </b-col>
                  </div>
                </div>

                <b-row class="expenses" v-bind:key="item.id_expense" v-for="item in expenses">
                    <b-col>
                    <Expense v-bind:expense="item" v-on:del-expense="deleteRow" />
                    </b-col>
                </b-row>

                 <b-row>
                    <div class ="col-md-6 col-12">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">+ Add More Item</button>
                    </div>
                </b-row>

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

                          <label for="file">
                              <button class="buttonFile" v-if="attachments.length > 0">Select <i class='far fa-arrow-alt-circle-up'></i></button></label>
                          <div class="row" id="kotakAttachment">
                              <b-col class="col-xs-6 col-sm-6 col-md-3 grup-attachment" v-bind:key="file" v-for="file in attachments" >
                                  <div class="foto" v-if="file.type === 'image/png' || file.type==='image/jpeg' || file.type==='image.jpg'">
                                  <img :src="untukPreview+file.image" alt="Image" class="img-fluid img-thumbnail">
                                  <a class="removeIcon" @click="removeFile(file)"><i class="fas fa-minus-circle" style="font-size:24px"></i></a>
                                  </div>
                                  <div class="foto" v-else>
                                  <img src="@/assets/img/document.png" class="img-fluid img-thumbnail">
                                  <a class="removeIcon" @click="removeFile(file)"><i class="fas fa-minus-circle" style="font-size:24px"></i></a>
                                  </div>
                                  <h6>{{file.fileName}} </h6>

                              </b-col>
                          </div>
                        </div>
                        </b-form-group>
                    </b-col>
                </b-row>

                <div class = "button-group">
                    <b-button class = "save-button" type="submit">Save</b-button>
                    <router-link :to="{name: 'detail-reimbursement'}">
                      <b-button class="cancel-button" type="reset">Cancel</b-button>
                    </router-link>
                </div>
            </b-form>
            </card>
        </div>
    </div>
    <b-modal
      id="modal-confirmation"
      centered
      v-model="confirmationModal"
      >
      <template v-slot:modal-title>
        <div class="container">
          <h5 id="modal-title-success">Save Changes?</h5>
        </div>
      </template>
      <template v-slot:default>
        <div class="container">
          <b-row>
            <b-col class="modal-icon col-2">
              <img src="@/assets/img/update-confirm-icon.png" alt="" width="50px">
            </b-col>
            <b-col class="col-10">
              <p id="modal-message">Reimbursement report will be changed soon once you click the save button.</p>
            </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-col class="button-confirm-group">
          <b-button @click="onSubmit" class="save-button">
            Save
          </b-button>
          <b-button @click="cancel()" class="cancel-button">
            Cancel
          </b-button>
        </b-col>
      </template>
    </b-modal>
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
              <p id="modal-message">Reimbursement report for project {{reimbursement.projectName}} was successfully changed.</p>
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
            new_expense : {
                id_expense : 0,
                nama : '',
                nominal : '',
                tanggal : '',
                createdBy : 'Adi',
                paidBy : 'Adi',
                reimbursement : '',
                status : ''
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
            confirmationModal : false,
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
            this.reimbursement.listExpense = this.expenses;
            this.reimbursement.listAttachment = this.attachments;
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

        onConfirmation(evt) {
          this.confirmationModal = true;
        },

        fetchData : function(){
            let listExpense = this.reimbursement.listExpense;
            for(let i=0; i< listExpense.length ; i++){
                this.new_expense.id_expense++;
                this.new_expense.nama = listExpense[i].nama;
                this.new_expense.nominal = listExpense[i].nominal;
                this.new_expense.tanggal = listExpense[i].tanggal.substring(0,10);
                this.new_expense.status = listExpense[i].status;

                let expense = Object.assign({}, this.new_expense);
                this.expenses.push(expense);

                this.new_expense.nama = '';
                this.new_expense.nominal = '';
                this.new_expense.tanggal = '';
                this.new_expense.reimbursement = '';
            }

            let listAttachment = this.reimbursement.listAttachment;
            for(let i=0; i< listAttachment.length ; i++){
                this.attachments.push(this.reimbursement.listAttachment[i]);
            }
        },

        getDetail: function(){
            axios.get('http://localhost:8080/api/reimbursement/' +this.$route.params.id + '/detail')
            .then(res => {this.reimbursement = res.data, this.fetchData()})
            .catch(err => this.reimbursement = err.data);
        },

        updateReimbursement(reimburse){
            axios.put('http://localhost:8080/api/reimbursement/' + this.$route.params.id + '/update',
            reimburse,
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.reimbursement = res.data.result, this.showMessage(res.data.status)});
        },

        removeFile(file) {
            this.attachments.splice(this.attachments.indexOf(file), 1);
        },

        selectFile(){
            const files = this.$refs.files.files;
            this.isAnyImage = true;
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
    width:100%;
    background-color: white;
    color : #109cf1;
    border-color: #109cf1;
}

.judul{
  text-align: center;
  color: black;
  margin: 5px 0 24px 0;
}
.title-form {
  font-weight: 600;
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
.required label:after {
  content:" *";
  color: red;
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

.foto {
  position: relative;
  width: 100%;
}

#kotakAttachment {
    padding: 10px 10px;
}

</style>
