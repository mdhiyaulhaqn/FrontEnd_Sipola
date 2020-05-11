<template>
    <div class="row">
        <div class = "col-12">
            <b-breadcrumb id="breadcrumb"> 
                <b-breadcrumb-item :to="{name: 'reimbursement-request'}">
                    Reimbursement Request
                </b-breadcrumb-item>
                <b-breadcrumb-item active>
                    Detail Reimbursement Report
                </b-breadcrumb-item>
            </b-breadcrumb>
            <div class="judul">
                <strong>
                    Detail Reimbursement Request
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
                                    {{ row.item.tanggal | moment("ll") }}
                                </template>
                                <template v-slot:cell(nominal)="row">
                                    {{ row.item.nominal | currency}}
                                </template>
                                <template v-slot:cell(action)="row">
                                  <router-link :to="{name: 'expense-detail', params: {id:row.item.id}}">
                                    <b-button id="view_button" class="btn btn-primary">
                                      View
                                    </b-button>
                                  </router-link>
                                </template>
                                </b-table>
                                
                            </div>
                        </div>
                    </b-col>
                
                </b-row>

                <div class="for-attachment" v-if="reimbursement.listAttachment.length > 0">
                    <b-row>
                        <b-col>
                            <div><br>Attachments ( {{reimbursement.listAttachment.length}} )</div>
                        </b-col>
                    </b-row>
                    <b-row id="kotakAttachment">
                        <b-col class="col-xs-9 col-sm-8 col-md-2 grup-attachment" v-bind:key="file" v-for="file in reimbursement.listAttachment" >
                                <b-card
                                    :img-src="untukPreview+file.image"
                                    img-alt="Image"
                                    img-top
                                    img-max-width="80px"
                                    img-max-height="80px"
                                    style="max-width: 100px;"
                                    class="mb-2"
                                    bg-variant="light"
                                >
                                <b-card-body class="row">
                                  <b-card-title style="font-size: 12px;">
                                      {{file.fileName}}   
                                  </b-card-title>
                                  <button @click="downloadFile(file)">Download</button>
                                </b-card-body>
                                </b-card>
                        </b-col>
                    </b-row>
                </div>

                <b-row>
                  <div class = "col-lg-5 col-sm-5 col-6" v-if="reimbursement.keterangan.length > 0"><br><i class='fas fa-exclamation-triangle' style='color:red'></i>
                  Notes : {{reimbursement.keterangan}}</div>
                </b-row>

                <b-row>
                    <div class="col button-group">
                        <br>
                        <button v-on:click="onConfirmationReject" id ="delete-button" class="btn btn-primary"  v-if="reimbursement.statusReimburse != 'Sent'">
                            Reject
                        </button>
                        <button v-on:click="onConfirmationApprove" id ="edit-button" class="btn btn-success">
                            Approve
                        </button>
                    </div>
                </b-row>

            </card>
        </div>

        <b-modal
      id="modal-foto"
      ref="modal-foto"
      centered
      >
      <template v-slot:default>
        <div class="container">
          <b-row>
            <b-col class="modal-icon col-12">
              <img :src="untukPreview+file.image" alt="image" width="100px">
            </b-col>
          </b-row>
        </div>
      </template>
    </b-modal>

    <b-modal
      id="modal-reject"
      ref="modal-reject"
      v-model="rejectModal"
      centered
      >     
      <template v-slot:modal-title>
        <div class="container">
          <h5 id="modal-title-delete">Rejection</h5>
        </div>
      </template>     
      <template v-slot:default>
        <div class="container">
          <b-row>
              <b-col class="modal-icon col-2">
                  <img src="@/assets/img/delete-confirm-icon.png" alt="" width="50px">
              </b-col>
              <b-col class="col-10">
                  <p id="modal-message">Do you want to reject reimbursement report requested by Nindya?</p>
              </b-col>
              <b-col>
                <b-form @submit.stop.prevent="submitReject">
                    <b-form-group>
                        <label for="keterangan">Reason</label>
                        <b-form-input
                            id="keteranganInput"
                            v-model="keterangan"
                            type="text"
                            required
                            placeholder="State your reason here..."
                            maxlength="180"
                            list="idlist"
                            >
                            </b-form-input>
                            <datalist id="idlist">
                              <option>Cumulative price did not adds up</option>
                              <option>No document supported</option>
                              <option>Duplicate report</option>
                            </datalist>
                            </b-form-group>
                          <b-form-group>
                            <b-form-checkbox
                              id="checkbox-group-1"
                              v-model="revision"
                              name="revise"
                            >Ask for revision</b-form-checkbox>
                          </b-form-group>
                  </b-form>
              </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-col class="button-confirm-group">
          <b-button @click="submitReject" id ="confirm_approve_button" variant="outline-success">
            Yes
          </b-button>
          <b-button @click="cancel()" id ="cancel_approve_button" class="btn btn-success">
            Cancel
          </b-button>
        </b-col>
      </template>
      
    </b-modal>



      <b-modal
      id="modal-approve"
      ref="modal-approve"
      v-model="approveModal"
      centered
      >
      <template v-slot:modal-title>
        <div class="container">
          <h5 id="modal-title-delete">Approval</h5>
        </div>
      </template>
      <template v-slot:default>
        <div class="container">
          <b-row>
              <b-col class="modal-icon col-2">
                  <img src="@/assets/img/approval-icon.png" alt="" width="50px">
              </b-col>
              <b-col class="col-10">
                  <p id="modal-message">Do you want to approve reimbursement report requested by Nindya?</p>
              </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-col class="button-confirm-group">
          <b-button @click="onSubmit" id ="confirm_approve_button" variant="outline-success">
            Yes
          </b-button>
          <b-button @click="cancel()" id ="cancel_approve_button" class="btn btn-success">
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
              <p id="modal-message" v-if="reimbursement.statusReimburse === 3">Reimbursement Report requested by {{reimbursement.createdBy}} was successfully accepted.</p>
              <p id="modal-message" v-if="reimbursement.statusReimburse === 4">Reimbursement Report requested by {{reimbursement.createdBy}} was successfully asked for revision.</p>
              <p id="modal-message" v-if="reimbursement.statusReimburse === 5">Reimbursement Report requested by {{reimbursement.createdBy}} was successfully rejected.</p>
              <p id="modal-message">Notification will be sent to {{reimbursement.createdBy}}</p>
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
            keterangan: '',
            successModal : false,
            rejectModal : false,
            approveModal : false,
            revision : false,
            fields: [
                {key: 'id', label: 'No', sortable: true},
                {key: 'nama', label: 'Expense Item', sortable: true},
                {key: 'tanggal', label: 'Date', sortable: true},
                {key: 'nominal', label: 'Price(IDR)', sortable: true},
                {key: 'action', label: 'Action'}
            ]
        };
    },
    beforeMount(){
        this.getDetail();
    },
    methods:{
        onSubmit(evt) {
            evt.preventDefault();
            this.reimbursement.statusReimburse = 3;
            this.approveReimbursement(JSON.stringify(this.reimbursement));
        },

        onConfirmationApprove(evt) {
          console.log('masuk')
          this.approveModal = true;
        },

        onConfirmationReject(evt) {
          console.log('masuk')
          this.rejectModal = true;
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

        approveReimbursement(reimburse) {
          axios.put('http://localhost:8080/api/reimbursement/changeStatus/' + this.$route.params.id, 
            reimburse, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.reimbursement = res.data.result, this.showMessage(res.data.status)});
        },

        redirect(){
            this.$router.push({ name: 'reimbursement-request'});
        },

        hideModal(){
            this.$refs['modal-approve'].hide();
        },

        hideModalReject(){
            this.$refs['modal-reject'].hide();
        },

        showMessageRejectModal(status){
            this.rejectModal = true;
        },

        handleSubmit(evt) {
          evt.preventDefault();
          this.submitReject();
        },

        submitReject(){
          console.log(this.reimbursement.keterangan);
          console.log(this.revision);
          this.reimbursement.keterangan = this.keterangan;
          if (this.revision == true) {
            this.reimbursement.statusReimburse = 4;
            this.reimbursement.isEdit = false;
          } else {
            this.reimbursement.statusReimburse = 5;
          }
          this.rejectReimbursement(JSON.stringify(this.reimbursement));
        },

        rejectReimbursement(reimburse){
          axios.put('http://localhost:8080/api/reimbursement/changeStatus/' + this.$route.params.id, 
            reimburse, 
                { headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {this.reimbursement = res.data.result, this.showMessage(res.data.status)});
        },

        downloadFile(file) {
          console.log(file.fileName)
          const linkSource = 'data:' + file.type + ';base64,' + file.image;
          const downloadLink = document.createElement("a");
          const fileName = file.fileName;

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }

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
#confirm_approve_button{
  font-size: 10px;
  width: 110px;
  border-color: #28A745;
  border-width: 1px;
  margin-right: 10px;
}
#cancel_approve_button{
  font-size: 10px;
  background-color: #28A745;
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
  color:#28A745;
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
  background-color: #28A745;
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

</style>