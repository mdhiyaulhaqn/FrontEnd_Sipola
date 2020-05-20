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
        <div class="col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
          <card class="col">
            <h5 class="title-form">Add Activity List Schedule Form</h5>
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group id="project-name-input" class="required">
                  <label class="label" for="projectName">Project Name</label>
                  <b-form-input
                    id="projectName"
                    v-model="newActivityListSchedule.namaProyek"
                    type="text"
                    required
                    :maxlength="255"
                    placeholder="Project Name"
                    pattern=".*[a-zA-Z].*"
                    >
                  </b-form-input>
                </b-form-group>

                <b-form-group id="company-name-input" class="required">
                  <label class="label" for="companyName" >Company Name</label>
                  <b-form-input
                    id="companyName"
                    v-model="newActivityListSchedule.namaPerusahaan"
                    type="text"
                    required
                    :maxlength="255"
                    placeholder="Company Name"
                    pattern=".*[a-zA-Z].*"
                    >
                  </b-form-input>
                </b-form-group>

                <div class="d-none d-md-block d-lg-block">
                  <div class="row" style="margin: 0 -15px -12px -15px;">
                    <div class = "col-md-5 required">
                      <label class="label">Activity Name</label>
                    </div>
                    <div class = "col-md-3 required">
                      <label class="label">Start Date</label>
                    </div>
                    <div class = "col-md-3 required">
                      <label class="label">End Date</label>
                    </div>
                    <div class = "col-md-1">
                    </div>
                    <br>
                  </div>
                </div>

                <b-row class="activities" v-bind:key="item.id_activity" v-for="item in activities" >
                  <b-col>
                    <Activity v-bind:activity="item" v-on:del-activity="deleteRow" />
                  </b-col>
                </b-row>

                <b-row style="margin-top: 2px;">
                  <div class ="col-12 col-md-4">
                    <b-button class="btn btn-primary add-button" @click="addRow()">Add More Activity <span><img src="@/assets/img/add-circle-blue-icon.png" alt="" width="18px" style="margin-top: -4px;"></span></b-button>
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
          <router-link :to="{name: 'activity-list-schedule'}">
            <b-button class="back-button">Back to List</b-button>
          </router-link>
          <b-button @click="ok()" class="see-button">
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
import authHeader from '../../services/auth-header';

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
        createdBy: '',
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
      url_local: 'http://localhost:8080/api/activity-list-schedule/',
      url_deploy: 'https://sipola-sixab.herokuapp.com/api/activity-list-schedule/'
    }
  },

  beforeMount() {
    this.addRow();
  },

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
        this.newActivityListSchedule.createdBy = this.$store.state.auth.user.name;
        // this.new_quotation.company = this.new_company;
        this.newActivityListSchedule.listTugas = this.activities;
        this.addActivityListSchedule(this.newActivityListSchedule);
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
        axios.post(this.url_deploy + 'add', activityListSchedule, { headers: authHeader() })
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
  color:#109CF1;
  border-color:#109CF1;
  background-color: white;
  border-width: 2px;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
  border-radius: 5px;
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
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
.required label:after {
  content:" *";
  color: red;
}
</style>
