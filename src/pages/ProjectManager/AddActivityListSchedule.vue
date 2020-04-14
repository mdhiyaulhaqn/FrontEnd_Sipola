<template>
  <div class="row">
    <div class="col-12">
    <b-breadcrumb id="breadcrumb">
      <b-breadcrumb-item :to="{name: 'activity-list-schedule'}">
        Activity List Schedule
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Add Activity List Schedule
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h3 class="judul"><strong>Add Activity List Schedule</strong></h3>
    <div class = "row">
        <div class="col-10 isi-form">
          <card>
            <h5 class="title-form">Add Activity List Schedule Form</h5>
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group id="project-name-input">
                  <label class="label" for="projectName">Project Name</label>
                  <b-form-input
                    id="projectName"
                    v-model="newActivityListSchedule.namaProyek"
                    type="text"
                    required
                    placeholder="Project Name"
                    pattern="(?!^\d+$)^.+$"
                    >
                  </b-form-input>
                                      <!-- :state="nameState"
                    aria-describedby="input-live-help input-live-feedback"
                  <b-form-invalid-feedback id="input-live-feedback">
                    Cannot contain only numbers.
                  </b-form-invalid-feedback>
                  <b-form-text id="input-live-help">Enter the project name.</b-form-text> -->
                </b-form-group>

                <b-form-group id="company-name-input">
                  <label class="label" for="companyName">Company Name</label>
                  <b-form-input
                    id="companyName"
                    v-model="newActivityListSchedule.namaPerusahaan"
                    type="text"
                    required
                    placeholder="Company Name"
                    pattern="(?!^\d+$)^.+$"
                    >
                  </b-form-input>
                </b-form-group>

                <div class="d-none d-md-block d-lg-block">
                  <div class="row">
                    <div class = "col-md-5">
                      <label class="label">Activity Name</label>
                    </div>
                    <div class = "col-md-3">
                      <label class="label">Start Date</label>
                    </div>
                    <div class = "col-md-3">
                      <label class="label">End Date</label>
                    </div>
                    <div class = "col-md-1">
                    </div>
                    <br>
                  </div>
                </div>

                <b-row class="activities" v-bind:key="item.id_activity" v-for="item in activities">
                  <b-col>
                    <Activity v-bind:activity="item" v-on:del-activity="deleteRow" />
                  </b-col>
                </b-row>

                <b-row>
                  <div class ="col-12 col-sm-5">
                    <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">Add More Activity <span><img src="@/assets/img/add-circle-blue-icon.png" alt="" width="25px"></span></button>
                  </div>
                </b-row>

                <b-form-group class="mb-0" id="notes-input">
                  <label class="label" for="notes">Notes</label>
                    <b-form-textarea
                        id="notes"
                        v-model="newActivityListSchedule.catatan"
                        type="text"
                        placeholder="Notes"
                        >
                    </b-form-textarea>
                </b-form-group>

                <div class = "button-group">
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
              <p id="modal-message">Activity list schedule was successfully added.</p>
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

    <b-modal title="Daftar Tugas Gagal Tersimpan" v-model="failedModal" centered ok-only>
        Daftar tugas gagal dibuat.
    </b-modal>
    </div>
  </div>
</template>

<script>

import Activity from '@/pages/ProjectManager/Activity.vue';
import axios from 'axios';

export default {
  components : {
    Activity
  },
  data() {
    return {
      activities: [],
      newActivityListSchedule : {
        namaProyek : '',
        namaPerusahaan : '',
        catatan : '',
        listTugas : '',
      },
      newActivity : {
        id_activity : 0,
        namaTugas : '',
        tanggalMulaiTugas : '',
        tanggalSelesaiTugas : '',
        daftarTugas : '',
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

  // computed: {
  //   nameState() {
  //     return /(?!^\d+$)^.+$/.test(this.newActivityListSchedule.namaProyek)
  //   }
  // },

  methods: {
    addRow(){
      this.newActivity.id_activity++;
      let activity = Object.assign({}, this.newActivity);
      this.activities.push(activity)
    },

    deleteRow(id_activity){
        this.activities = this.activities.filter(result => result.id_activity !== id_activity);
    },

    onSubmit(evt) {
        evt.preventDefault();
        // this.new_quotation.company = this.new_company;
        this.newActivityListSchedule.listTugas = this.activities;
        this.addActivityListSchedule(JSON.stringify(this.newActivityListSchedule));
    },

    showMessage(status){
        if(status == 200){
            this.successModal = true;
        }
        else if(status == 500){
            this.failedModal = true;
        }
    },

    addActivityListSchedule(activityListSchedule){
        axios.post('http://localhost:8080/api/activity-list-schedule/add',
        activityListSchedule,
            { headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {this.newActivityListSchedule = res.data.result, this.showMessage(res.data.status)});
    },

    redirect(){
        this.$router.push({ name: 'detail-activity-list-schedule',  params: {id:this.newActivityListSchedule.id}});
    },

    hideModal(){
      this.$refs['modal-hide'].hide();
		},
  }
}
</script>

<style scoped>

.add-button{
  width: 100%;
  background-color: white;
  color : #109cf1;
  border-color: #109cf1;
  margin-bottom: 10px;
  border-width: 1.5px;
  line-height: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
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
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
</style>
