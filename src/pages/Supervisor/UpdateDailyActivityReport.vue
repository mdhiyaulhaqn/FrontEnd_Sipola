<template>
  <div class="row">
    <div class="col-12">
    <b-breadcrumb id="breadcrumb">
      <b-breadcrumb-item :to="{name: 'daily-activity-report'}">
        Daily Activity Report
      </b-breadcrumb-item>
      <b-breadcrumb-item :to="{name: 'detail-daily-activity-report'}">
        Detail Daily Activity Report
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Update Daily Activity Report
      </b-breadcrumb-item>
    </b-breadcrumb>
    <h3 class="judul"><strong>Update Daily Activity Report</strong></h3>
    <div class = "row">
        <div class="col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block isi-form">
          <card class="col">
            <h5 class="title-form">Update Daily Activity Report Form</h5>
            <b-form @submit="onConfirmation" v-if="show">
                <div class = "row">
                  <div class = "col-md-4 col-12">
                    <b-form-group class="required">
                        <label class="label" for="site">Site Name</label>
                        <b-form-input
                            id="site"
                            v-model="dailyActivityReport.site"
                            type="text"
                            required
                            :maxlength="255"
                            placeholder="Site Name"
                            pattern=".*[a-zA-Z].*"
                            disabled>
                        </b-form-input>
                    </b-form-group>
                  </div>
                  <div class = "col-md-4 col-12">
                    <b-form-group class="required">
                        <label class="label" for="poNumber">Purchase Order No.</label>
                        <b-form-input
                            id="poNumber"
                            v-model="dailyActivityReport.poNumber"
                            type="text"
                            required
                            :maxlength="255"
                            placeholder="Purchase Order No."
                            disabled>
                        </b-form-input>
                    </b-form-group>
                  </div>
                  <div class = "col-md-4 col-12">
                    <b-form-group class="required">
                        <label class="label" for="date">Date</label>
                        <b-form-input
                            id="date"
                            v-model="dailyActivityReport.date"
                            type="date"
                            required
                            disabled>
                        </b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div>
                  <b-form-group class="required">
                    <label class="label" for="typeOfWorks">Type of Work</label>
                    <b-form-radio-group
                      id="typeOfWorks"
                      v-model="dailyActivityReport.typeOfWorks"
                      name="type-of-works"
                      required
                      disabled>
                      <b-form-radio value="Erection">Erection</b-form-radio>
                      <b-form-radio value="Commissioning">Commissioning</b-form-radio>
                      <b-form-radio value="Services">Services</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </div>
                <div style="margin-bottom: -25px;">
                  <b-form-group class="required">
                    <label class="label">Manpower</label>
                    <b-table striped responsive="md" :small="true" stacked="md" :items="items" :fields="fields">
                      <template v-slot:cell(engineer)>
                        <b-form-input v-model="dailyActivityReport.engineer" type="number" min="0"/>
                      </template>
                      <template v-slot:cell(technician)>
                        <b-form-input v-model="dailyActivityReport.technician" type="number" min="0"/>
                      </template>
                      <template v-slot:cell(foreman)>
                        <b-form-input v-model="dailyActivityReport.foreman" type="number" min="0"/>
                      </template>
                      <template v-slot:cell(electrician)>
                        <b-form-input v-model="dailyActivityReport.electrician" type="number" min="0"/>
                      </template>
                      <template v-slot:cell(dWorker)>
                        <b-form-input v-model="dailyActivityReport.dWorker" type="number" min="0"/>
                      </template>
                      <template v-slot:cell(driver)>
                        <b-form-input v-model="dailyActivityReport.driver" type="number" min="0"/>
                      </template>
                      <template v-slot:cell(misc)>
                        <b-form-input v-model="dailyActivityReport.misc" type="number" min="0"/>
                      </template>
                      <template v-slot:cell(supervisor)>
                        <b-form-input v-model="dailyActivityReport.supervisor" type="number" min="0"/>
                      </template>
                    </b-table>
                  </b-form-group>
                </div>
                <label class="label">Working Conditions</label>
                <div class = "row">
                  <div class = "col-md-4 col-12">
                    <b-form-group class="required">
                        <label class="label" for="start">Start Working Hour</label>
                        <b-form-input
                            id="start"
                            v-model="dailyActivityReport.start"
                            type="text"
                            :maxlength="255"
                            required
                            placeholder="Start Working Hour">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group class="required">
                        <label class="label" for="end">End Working Hour</label>
                        <b-form-input
                            id="end"
                            v-model="dailyActivityReport.end"
                            type="text"
                            :maxlength="255"
                            required
                            placeholder="End Working Hour">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label class="label" for="overtime">Overtime</label>
                        <b-form-input
                            id="overtime"
                            v-model="dailyActivityReport.overtime"
                            :maxlength="255"
                            type="text"
                            placeholder="Overtime">
                        </b-form-input>
                    </b-form-group>
                  </div>
                  <div class = "col-md-4 col-12">
                    <b-form-group>
                        <label class="label" for="morningWeather">Morning Weather</label>
                        <b-form-input
                            id="morningWeather"
                            v-model="dailyActivityReport.morningWeather"
                            :maxlength="255"
                            type="text"
                            placeholder="Morning Weather">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label class="label" for="afternoonWeather">Afternoon Weather</label>
                        <b-form-input
                            id="afternoonWeather"
                            v-model="dailyActivityReport.afternoonWeather"
                            :maxlength="255"
                            type="text"
                            placeholder="Afternoon Weather">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label class="label" for="eveningWeather">Evening Weather</label>
                        <b-form-input
                            id="eveningWeather"
                            v-model="dailyActivityReport.eveningWeather"
                            :maxlength="255"
                            type="text"
                            placeholder="Evening Weather">
                        </b-form-input>
                    </b-form-group>
                  </div>
                  <div class = "col-md-4 col-12">
                    <b-form-group>
                      <label class="label" for="remarks">Remarks</label>
                        <b-form-textarea
                            id="remarks"
                            v-model="dailyActivityReport.remarks"
                            type="text"
                            placeholder="Remarks"
                            rows="9">
                        </b-form-textarea>
                    </b-form-group>
                  </div>
                </div>
                <div>
                  <b-form-group class="required">
                    <label class="label" for="description">Description</label>
                    <ckeditor id="description" :editor="editor" v-model="dailyActivityReport.description"></ckeditor>
                  </b-form-group>
                </div>
                <div>
                  <b-form-group>
                    <label class="label" for="encounterProblem">Encounter Problem</label>
                      <b-form-textarea
                          id="encounterProblem"
                          v-model="dailyActivityReport.encounterProblem"
                          type="text"
                          placeholder="Encounter Problem"
                          >
                      </b-form-textarea>
                  </b-form-group>
                </div>
                <div class = "row">
                  <div class = "col-md-6 col-12">
                    <b-form-group class="required">
                        <label class="label" for="responsible">Responsible</label>
                        <b-form-input
                            id="responsible"
                            v-model="dailyActivityReport.responsible"
                            type="text"
                            required
                            :maxlength="255"
                            placeholder="Responsible"
                            pattern=".*[a-zA-Z].*">
                        </b-form-input>
                    </b-form-group>
                  </div>
                  <div class = "col-md-6 col-12">
                    <b-form-group>
                        <label class="label" for="approvedBy">Approved By</label>
                        <b-form-input
                            id="approvedBy"
                            v-model="dailyActivityReport.approvedBy"
                            type="text"
                            :maxlength="255"
                            placeholder="Approved By"
                            pattern=".*[a-zA-Z].*">
                        </b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class = "button-group">
                  <b-button class = "save-button" type="submit">Save</b-button>
                  <router-link :to="{name: 'detail-daily-activity-report'}">
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
              <p id="modal-message">Daily activity report will be changed soon once you click the save button.</p>
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
              <p id="modal-message">Daily activity report for site {{dailyActivityReport.site}} was successfully changed.</p>
            </b-col>
          </b-row>
        </div>
      </template>
      <template v-slot:modal-footer="{ ok }">
        <b-col class="button-confirm-group">
          <router-link :to="{name: 'daily-activity-report'}">
            <b-button class="back-button">Back to List</b-button>
          </router-link>
          <b-button @click="ok()" class="see-button">
            See Details
          </b-button>
        </b-col>
      </template>
    </b-modal>
    <b-modal title="Failed to Save Daily Activity Report" v-model="failedModal" centered ok-only>
        Failed to Save Daily Activity Report.
    </b-modal>
    </div>
  </div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import authHeader from '../../services/auth-header';

export default {
  data() {
    return {
      editor: ClassicEditor,
      fields: [
        { key: 'engineer', label: 'Engineer', class: 'text-center'},
        { key: 'technician', label: 'Technician', class: 'text-center'},
        { key: 'foreman', label: 'Foreman', class: 'text-center'},
        { key: 'electrician', label: 'Electrician', class: 'text-center'},
        { key: 'dWorker', label: 'D. Worker', class: 'text-center'},
        { key: 'driver', label: 'Driver', class: 'text-center'},
        { key: 'misc', label: 'Misc.', class: 'text-center'},
        { key: 'supervisor', label: 'Supervisor', class: 'text-center'}
      ],
      items: [{ engineer: 0, technician: 0, foreman : 0, electrician : 0, dWorker : 0, driver : 0, misc : 0, supervisor : 0}],
      newDailyActivityReport : {
        site : '',
        poNumber : '',
        date : '',
        typeOfWorks : '',
        engineer : '',
        technician : '',
        foreman : '',
        electrician : '',
        dWorker : '',
        driver : '',
        misc : '',
        supervisor : '',
        start : '',
        end : '',
        overtime : '',
        morningWeather : '',
        afternoonWeather : '',
        eveningWeather : '',
        remarks : '',
        description : '',
        encounterProblem : '',
        responsible : '',
        approvedBy : '',
      },
      dailyActivityReport: '',
      show: true,
      successModal : false,
      failedModal : false,
      confirmationModal : false,
      send : {objects : null},
      url_local: 'http://localhost:8080/api/daily-activity-report/',
      url_deploy: 'http://sipola-sixab.herokuapp.com/api/daily-activity-report/'
    }
  },

  beforeMount() {
    this.getDetail();
  },

  methods: {
    onSubmit(evt) {
        evt.preventDefault();
        this.updateDailyActivityReport(this.dailyActivityReport);
    },

    onConfirmation(evt) {
      this.confirmationModal = true;
    },

    showMessage(status){
        if(status == 200){
            this.successModal = true;
        }
        else if(status == 500){
            this.failedModal = true;
        }
    },

    convertDate: function(){
      this.dailyActivityReport.date = this.dailyActivityReport.date.substring(0,10);
    },

    getDetail: function(){
      axios.get(this.url_deploy + this.$route.params.id)
      .then(response => {this.dailyActivityReport = response.data.result, this.convertDate()})
      .catch(err => this.dailyActivityReport = err.data);
    },

    updateDailyActivityReport(dailyActivityReport){
      axios.put(this.url_deploy + this.$route.params.id + '/update', dailyActivityReport, { headers: authHeader() })
      .then(res => {this.dailyActivityReport = res.data.result, this.showMessage(res.data.status)});
    },

    redirect(){
        this.$router.push({ name: 'detail-daily-activity-report',  params: {id:this.dailyActivityReport.id}});
    },

    hideModal(){
      this.$refs['modal-confirmation'].hide();
		},
  }
}
</script>

<style scoped>

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
