<template>
    <div class="row">
        <div class = "col-12">
            <b-breadcrumb id="breadcrumb"> 
                <b-breadcrumb-item :to="{name: 'reimbursement-report'}">
                    Reimbursement Report
                </b-breadcrumb-item>
                <b-breadcrumb-item active>
                    Detail Reimbursement Report
                </b-breadcrumb-item>
            </b-breadcrumb>
            <div class="judul">
                <strong>
                    Detail Reimbursement Report
                </strong>
            </div> 
            
            <card>
                <b-row>
                    <div class = "col-lg-7 col-sm-7 col-8">Reimbursement Report</div>
                </b-row>
                <b-row>
                    <div class = "col-lg-2 col-sm-2 col-6">Created by</div>
                    <div class = "col-lg-5 col-sm-5 col-6">: {{reimbursement.createdBy}}</div>
                </b-row>
                <b-row>
                    <div class = "col-lg-2 col-sm-2 col-6">Created At</div>
                    <div class = "col-lg-5 col-sm-5 col-6">:  {{ reimbursement.createdAt | moment("ll")}}</div>
                </b-row>
                <b-row>
                    <div class = "col-lg-2 col-sm-2 col-6">ID Report</div>
                    <div class = "col-lg-5 col-sm-5 col-6">: {{reimbursement.id}}</div>
                </b-row>
                <b-row>
                    <div class = "col-lg-2 col-sm-2 col-6">Project Description</div>
                    <div class = "col-lg-5 col-sm-5 col-6">: {{ reimbursement.projectName}}</div>
                </b-row>
                <b-row>
                    <div class = "col-lg-2 col-sm-2 col-6">Total</div>
                    <div class = "col-lg-5 col-sm-5 col-6">: {{reimbursement.totalReimburse | currency}}</div>
                </b-row>
                <b-row>
                    <div class = "col-lg-5 col-sm-5 col-6"><br>Expense</div>
                    <div class="col-lg-7 col-sm-7 col-6" v-if="reimbursement.statusReimburse != 'Sent'">
                        <button v-b-modal.modal-send id="send_button" class="btn btn-primary">
                            Send to Finance
                            <i class="fas fa-location-arrow"></i>
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
                                <template v-slot:cell(nominal)="row">
                                    {{row.item.nominal | currency}}
                                </template>
                                 <template v-slot:cell(tanggal)="row">
                                    {{ row.item.tanggal | moment("ll") }}
                                </template>
                                </b-table>
                                
                            </div>
                        </div>
                    </b-col>
                
                </b-row>

                <div v-if="reimbursement.listAttachment.length > 0">
                  <b-card class="card-attachment">
                  <b-card-title class="title-attachment" v-b-toggle.collapse-2 style="max-height:50px">
                    <h6>Attachments ( {{reimbursement.listAttachment.length}} )</h6>
                    <!-- <a @click="downloadAll()"><i class="fas fa-download"></i></a> -->
                  </b-card-title>

                  <!-- Element to collapse -->
                  <b-collapse id="collapse-2" v-if="reimbursement.listAttachment.length > 0">
                    <b-card-body>
                      <b-row>
                        <b-col class="col-xs-12 col-sm-12 col-md-2 grup-attachment" v-bind:key="file" v-for="file in reimbursement.listAttachment" >
                          <b-img thumbnail fluid v-if="file.type === 'image/jpeg'" :src="untukPreview+file.image" alt="Image" class="image"></b-img>
                          <img v-else thumbnail fluid src="@/assets/img/document.png" alt="Image" class="img-fluid img-thumbnail">
                          <a @click="downloadFile(file)"><i class="fas fa-download"></i></a>
                          <h6> {{file.fileName}}</h6>
                        </b-col>
                      </b-row>
                    </b-card-body>
                  </b-collapse>

                  </b-card>
                </div>

                <b-row>
                  <div class = "col-lg-5 col-sm-5 col-6" v-if="reimbursement.keterangan.length > 0"><br><i class='fas fa-exclamation-triangle' style='color:red'></i>
                  Notes : {{reimbursement.keterangan}}</div>
                </b-row>

                <b-row>
                    <div class="col button-group">
                        <br>
                        <button v-b-modal.modal-delete id ="delete-button" class="btn btn-primary"  v-if="reimbursement.statusReimburse == 1 & 4">
                            Delete
                        </button>
                         <router-link :to="{name: 'update-reimbursement'}">
                            <button v-if="reimbursement.edit" id ="edit-button" class="btn btn-primary">
                                Edit
                            </button>
                         </router-link>
                    </div>
                </b-row>

            </card>
        </div>

        <b-modal
      id="modal-send"
      ref="modal-send"
      centered
      >
      <template v-slot:modal-title>
        <div class="container">
          <h5 id="modal-title-success">Send Reimbursement Report to Finance?</h5>
        </div>
      </template>
      <template v-slot:default>
        <div class="container">
          <b-row>
            <b-col class="modal-icon col-2">
              <img src="@/assets/img/update-confirm-icon.png" alt="" width="50px">
            </b-col>
            <b-col class="col-10">
              <p id="modal-message">You cannot change reimbursement report once you click button send.</p>
            </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-col class="button-confirm-group">
          <b-button @click="sentFinance" id="confirm_send_button">
            Send
          </b-button>
          <b-button @click="cancel()" id="cancel_send_button">
            Cancel
          </b-button>
        </b-col>
      </template>
    </b-modal>
    <b-modal
      id="modal-success"
      centered
      v-model="successModalSend"
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
              <p id="modal-message">Reimbursement Report for {{reimbursement.projectName}} was successfully sent to finance.</p>
            </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ ok }">
        <b-col class="button-confirm-group">
          <b-button @click="ok()" id="ok-button" variant="outline-primary">
            OK
          </b-button>
        </b-col>
      </template>
    </b-modal>



        <b-modal
      id="modal-delete"
      ref="modal-delete"
      centered
      >
      <template v-slot:modal-title>
        <div class="container">
          <h5 id="modal-title-delete">Delete Reimbursement Report?</h5>
        </div>
      </template>
      <template v-slot:default>
        <div class="container">
          <b-row>
              <b-col class="modal-icon col-2">
                  <img src="@/assets/img/delete-confirm-icon.png" alt="" width="50px">
              </b-col>
              <b-col class="col-10">
                  <p id="modal-message">It will be removed from the list.</p>
              </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-col class="button-confirm-group">
          <b-button @click="onSubmit" id ="confirm_delete_button" variant="outline-danger">
            Yes, delete it
          </b-button>
          <b-button @click="cancel()" id ="cancel_delete_button" class="btn btn-danger">
            Cancel
          </b-button>
        </b-col>
      </template>
    </b-modal>
    <b-modal
      id="modal-success"
      ref="modal-success"
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
              <p id="modal-message">Reimbursement Report for project {{reimbursement.projectName}} was successfully deleted from list.</p>
            </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ ok }">
        <b-col class="button-confirm-group">
          <b-button @click="ok()" id="ok-button" variant="outline-primary">
            OK
          </b-button>
        </b-col>
      </template>
    </b-modal>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            previewFile:[],
            reimbursement : '',
            untukPreview: 'data:image/jpeg;base64, ',
            successModal : false,
            successModalSend : false,
            fields: [
                {key: 'id', label: 'No', sortable: true},
                {key: 'nama', label: 'Expense Item', sortable: true},
                {key: 'tanggal', label: 'Date', sortable: true},
                {key: 'nominal', label: 'Price(IDR)', sortable: true},
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
            .then(res => {this.reimbursement = res.data, console.log(this.reimbursement)})
            .catch(err => this.reimbursement = err.data);
            // this.previewImage();
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

         downloadFile(file) {
          console.log(file.fileName)
          const linkSource = 'data:' + file.type + ';base64,' + file.image;
          const downloadLink = document.createElement("a");
          const fileName = file.fileName;

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        },

        // redirectSend(){
        //     this.hideModalSend();
        //     this.$router.push({ name: 'detail-reimbursement',  params: {id:this.reimbursement.id}});
        // },
  }
};
</script>

<style scoped>

#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}

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
#send_button{
    font-size: 12px;
    float:right;
    background-color: green;
    color:white;
    border-color: white;
    margin-bottom: 5px;
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

#kotakAttachment {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px 0 5px 0;
}

.image-preview{
    height: 120px;
    width: 120px;
    padding: 10px 5px 10px 5px;
}

.button-confirm-group{
  text-align: right;
}
#confirm_delete_button{
  font-size: 10px;
  width: 110px;
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
h5{
  margin-bottom: -4px;
}
#modal-message{
  font-size: 16px;
}
#modal-title-delete{
  color:#FF3E1D;
  font-weight: 1000;
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

#cancel_send_button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  margin-left: 10px;
  line-height: 15px;
  width: 110px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
  text-align: center;
}

#confirm_send_button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  border-width: 1px;
  width: 80px;
  line-height: 15px;
  text-align: center;
  font-size: 10px;
}

#edit-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  width: 110px;
  margin-left: 10px;
  font-size: 10px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
}

#delete-button{
  background-color: #FF3E1D;
  border-color: #FF3E1D;
  width: 80px;
  font-size: 10px;
}

.button-group{
  margin-top: 30px;
  text-align: center;
}

img {
  max-width: 100px;
  max-height: 100px;
}

.grup-attachment {
  padding: 5px 2px 5px 7px;
}

.card-attachment {
  border: solid 1px gray;
}
</style>