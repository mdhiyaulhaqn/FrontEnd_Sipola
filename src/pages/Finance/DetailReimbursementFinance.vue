<template>
    <div class="row">
        <div class = "col-12">
            <b-breadcrumb id="breadcrumb">
                <b-breadcrumb-item :to="{name: 'reimbursement-request'}">
                    Reimbursement Request
                </b-breadcrumb-item>
                <b-breadcrumb-item active>
                    Detail Reimbursement Request
                </b-breadcrumb-item>
            </b-breadcrumb>
            <h3 class="judul"><strong>Detail Reimbursement Request</strong></h3>
            <div class = "row">
            <div class="col-md-10 col-sm-10 col-xs-10 col-12 d-block d-xs-block d-sm-block center">
            <card class="col">
                <b-row>
                    <h5 class = "col-lg-7 col-sm-7 col-6 sub-judul"><strong>Reimbursement Report</strong></h5>
                    <div class="col-lg-3 col-sm-3 col-6 grup-status" style="float:right;">
                      <div class="col-lg-5 col-sm-5 col-12 status" >Status</div>
                      <div class="col-lg-7 col-sm-7 col-8">
                        <b-badge  v-if="reimbursement.statusReimburse === 2" pill variant="info" size=sm id ="status_reimbursement">
                          Not Reviewed
                        </b-badge>
                        <b-badge  v-if="reimbursement.statusReimburse === 3" pill variant="success" size=sm id ="status_reimbursement">
                          Accepted
                        </b-badge>
                        <b-badge v-if="reimbursement.statusReimburse === 4" size=sm id ="status_reimbursement" style="background-color:#F89133; color:black">
                          On Revision</b-badge>
                        <b-badge  v-if="reimbursement.statusReimburse === 5" pill variant="danger" size=sm id ="status_reimbursement">
                          Rejected
                        </b-badge>
                      </div>
                    </div>
                </b-row>
                <b-row>
                    <div class = "col-lg-2 col-sm-2 col-6">Created By</div>
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

                <div v-if="reimbursement.listAttachment != undefined && reimbursement.listAttachment.length > 0">
                  <b-card class="card-attachment">
                  <b-card-title class="title-attachment" v-b-toggle.collapse-2 style="max-height:50px">
                    <h6>Attachments ( {{reimbursement.listAttachment.length}} )<a @click="downloadAll()" class="download-all"> Download All <i class="fas fa-download"></i></a></h6>
                  </b-card-title>

                  <b-collapse id="collapse-2" v-if="reimbursement.listAttachment != undefined && reimbursement.listAttachment.length > 0">
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

                <b-row v-if="reimbursement.keterangan != undefined && reimbursement.keterangan.length > 0">
                    <div class = "col-lg-2 col-sm-2 col-4"><i class='fas fa-exclamation-triangle' style='color:red'></i>
                    Notes from finance</div>
                    <div class = "col-lg-5 col-sm-5 col-8">: {{reimbursement.keterangan}}</div>
                </b-row>

                <b-row>
                    <div class="col button-group" v-if="reimbursement.keterangan != undefined && reimbursement.statusReimburse != 3">
                        <br>
                        <button v-on:click="onConfirmationReject" id ="delete-button" class="btn btn-primary">
                            Reject
                        </button>
                        <button v-on:click="onConfirmationApprove" id ="edit-button" class="btn btn-success">
                            Approve
                        </button>
                    </div>
                </b-row>
            </card>
            </div>
          </div>
        </div>

    <b-modal
      id="modal-reject"
      ref="modal-reject"
      v-model="rejectModal"
      centered
      hide-footer
      >
      <template v-slot:modal-title>
        <div class="container">
          <h5 id="modal-title-reject">Reject Request?</h5>
        </div>
      </template>
      <template v-slot:default>
        <div class="container" fluid>
          <b-row>
              <b-col class="modal-icon col-2">
                  <img src="@/assets/img/delete-confirm-icon.png" alt="" width="50px">
              </b-col>
              <b-col class="col-10">
                  <p id="modal-message">You can still change your decision later.</p>
              </b-col>
              <div class="col-xs-10 col-md-12 col-sm-8">
                <!-- <b-form @submit.stop.prevent="handleSubmit"> -->
                  <b-form @submit="handleSubmit">
                    <b-form-group size="sm" style="margin-top: 15px;">
                        <label for="keterangan" class="required">Reason</label>
                        <b-form-input
                            id="keteranganInput"
                            v-model="keterangan"
                            type="text"
                            required
                            placeholder="State your reason here..."
                            list="idlist"
                            >
                            </b-form-input>
                            <b-form-datalist id="idlist" :options="options">
                            </b-form-datalist>
                            </b-form-group>
                          <b-form-group>
                            <b-form-checkbox
                              id="checkbox-group-1"
                              v-model="revision"
                              name="revise"
                            >Ask for revision</b-form-checkbox>
                          </b-form-group>
                          <b-col class="button-reject-group">
                            <b-button id ="confirm_reject_button" variant="outline-danger" type="submit">
                              Reject
                            </b-button>
                            <b-button @click="hideModalReject()" id ="cancel_reject_button" class="btn btn-danger">
                              Cancel
                            </b-button>
                          </b-col>
                  </b-form>
              </div>
          </b-row>
        </div>
      </template>
      <!-- <template v-slot:modal-footer="{ cancel }">
        <b-col class="button-reject-group">
          <b-button @click="submitReject" id ="confirm_reject_button" variant="outline-danger" type="submit">
            Reject
          </b-button>
          <b-button @click="cancel()" id ="cancel_reject_button" class="btn btn-danger">
            Cancel
          </b-button>
        </b-col>
      </template> -->

    </b-modal>



      <b-modal
      id="modal-approve"
      ref="modal-approve"
      v-model="approveModal"
      centered
      >
      <template v-slot:modal-title>
        <div class="container">
          <h5 id="modal-title-approval">Approve Request?</h5>
        </div>
      </template>
      <template v-slot:default>
        <div class="container">
          <b-row>
              <b-col class="modal-icon col-2">
                  <img src="@/assets/img/approval-icon.png" alt="" width="50px">
              </b-col>
              <b-col class="col-10">
                  <p id="modal-message">You cannot undo this action once you click the approve button.</p>
              </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-col class="button-confirm-group">
          <b-button @click="onSubmit" id ="confirm_approve_button" variant="outline-success">
            Approve
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
          <b-button @click="ok()" id="ok-button">
            OK
          </b-button>
        </b-col>
      </template>
    </b-modal>

    <b-modal title="Failed" v-model="failedModal" centered ok-only>
        Invoice was failed to be changed.
    </b-modal>

    </div>
</template>

<script>

import axios from 'axios';
import JSZip from 'jszip';

export default {
    data() {
        return {
            previewFile:[],
            foto: '@/assets/img/document.png',
            reimbursement : '',
            untukPreview: 'data:image/jpeg;base64, ',
            keterangan: '',
            successModal : false,
            rejectModal : false,
            approveModal : false,
            failedModal : false,
            revision : false,
            notValid : false,
            fields: [
                {key: 'id', label: 'No', sortable: true},
                {key: 'nama', label: 'Expense Item', sortable: true},
                {key: 'tanggal', label: 'Date', sortable: true},
                {key: 'nominal', label: 'Price (IDR)', sortable: true},
                {key: 'action', label: 'Action'}
            ],
            options : [
              'Cumulative price did not adds up',
              'No document supported',
              'Duplicate report'
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
          this.approveModal = true;
        },

        onConfirmationReject(evt) {
          this.rejectModal = true;
        },

        showMessage(status){
            if(status == 200){
                this.successModal = true;
            }
            else if(status == 500){
                this.failedModal = true;
            }
        },

        getDetail: function(){
            axios.get('http://localhost:8080/api/reimbursement/detail/' +this.$route.params.id)
            .then(res => {this.reimbursement = res.data })
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
          this.hideModalReject()
          this.$refs['modal-success'].hide();
            // this.$router.push({ name: 'reimbursement-request'});
        },

        hideModal(){
            this.$refs['modal-approve'].hide();
        },

        hideModalReject(){
            this.$refs['modal-reject'].hide();
        },

        handleSubmit(evt) {
          evt.preventDefault();
          console.log('masuk sini kah')
          this.submitReject();
        },

        submitReject(){
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
          const linkSource = 'data:' + file.type + ';base64,' + file.image;
          const downloadLink = document.createElement("a");
          const fileName = file.fileName;

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        },

        downloadAll() {
          let files = this.reimbursement.listAttachment
          var zip = new JSZip();
          var downloadFile = zip.folder("attachments")
          for (let i = 0; i < files.length; i++) {
            const linkSource = 'data:' + files[i].type + ';base64,' + files[i].image;
            downloadFile.file(files[i].fileName, files[i].image, {base64: true})
          }
          zip.generateAsync({type:"base64"})
          .then(function (content) {
              location.href="data:application/zip;base64,"+content;
          });
        }


  }
};
</script>

<style scoped>
.center{
  margin-left: auto;
  margin-right: auto;
}
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
.required{
  font-weight: 600;
}
.required label::after {
  content: " *";
  color: red;
}
.judul{
  text-align: center;
  color: black;
  margin: 5px 0 24px 0;
}
.sub-judul {
  font-size: 16px;
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

#edit-button{
  background-color: #28A745;
  color:white;
  border-color: transparent;
  width: 110px;
  margin-left: 10px;
  line-height: 15px;
  font-size: 12px;
  box-shadow: 3px 3px 15px rgba(16, 156, 241, 0.2);
}

#delete-button{
  background-color: #FF3E1D;
  border-color: #FF3E1D;
  width: 80px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
}

.button-group{
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
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

.button-reject-group{
  text-align: right;
}

#confirm_approve_button{
  font-size: 12px;
  border-color: #28A745;
  border-width: 1px;
  margin-right: 10px;
  line-height: 15px;
}
#cancel_approve_button{
  font-size: 12px;
  background-color: #28A745;
  color:white;
  border-color: white;
  border-width: 1px;
  line-height: 15px;
}
#confirm_reject_button{
  font-size: 12px;
  width: 80px;
  border-color: #FF3E1D;
  border-width: 1px;
  margin-right: 10px;
  line-height: 15px;
}
#cancel_reject_button{
  font-size: 12px;
  background-color: #FF3E1D;
  color:white;
  border-color: white;
  border-width: 1px;
  line-height: 15px;
}
h5{
  font-weight: bold;
}
#modal-message{
  font-size: 16px;
}
#modal-title-approval{
  color:#28A745;
  font-weight: 1000;
  margin-bottom: -4px;
}
#modal-title-reject{
  color:#FF3E1D;
  font-weight: 1000;
  margin-bottom: -4px;
}
#modal-title-success{
  color: #109CF1;
  font-weight: 1000;
  margin-bottom: -4px;
}
#ok-button{
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  font-size: 12px;
  line-height: 15px;
  border-width: 1px;
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

.grup-status{
  position: absolute;
  right: 16px;
}

.download-all {
  float: right;
  cursor: pointer;
}

</style>
