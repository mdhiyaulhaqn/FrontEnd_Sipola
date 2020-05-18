<template>
  <div class="row">
    <div class="col-12">
      <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item :to="{name: 'daily-activity-report'}">
          Daily Activity Report
        </b-breadcrumb-item>
        <b-breadcrumb-item active>
          Detail Daily Activity Report
        </b-breadcrumb-item>
      </b-breadcrumb>
      <h3 class="judul"><strong>Detail Daily Activity Report</strong></h3>
      <div class = "row">
        <div class="col-md-8 col-sm-8 col-xs-8 col-12 d-block d-xs-block d-sm-block center">
          <card class="col">
            <h5 class="text-center">Daily Activity Report</h5>
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-6 col-12 d-block d-xs-block d-sm-block">
                  <table class="table table-bordered table-sm table-responsive-sm">
                    <tr class="d-flex">
                      <th class="col-4">SITE:</th>
                      <td class="col-8">{{ dailyActivityReport.site }}</td>
                    </tr>
                    <tr class="d-flex">
                      <th class="col-4">PO:</th>
                      <td class="col-8">{{ dailyActivityReport.poNumber }}</td>
                    </tr>
                    <tr class="d-flex">
                      <th class="col-4">DATE:</th>
                      <td class="col-8">{{ dailyActivityReport.date | moment('ll') }}</td>
                    </tr>
                  </table>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6 col-12 d-block d-xs-block d-sm-block">
                  <div class="row">
                    <div class="col-md-5 col-sm-5 col-xs-5 col-12 d-block d-xs-block d-sm-block">
                      <label class="label" for="typeOfWorks">Type of Work:</label>
                    </div>
                    <div class="col-md-1 col-sm-1 col-xs-1 col-12 d-block d-xs-block d-sm-block">
                      <b-form-group>
                        <b-form-radio-group
                          id="typeOfWorks"
                          v-model="dailyActivityReport.typeOfWorks"
                          name="type-of-works"
                          stacked
                          disabled>
                          <b-form-radio value="Erection">Erection</b-form-radio>
                          <b-form-radio value="Commissioning">Commissioning</b-form-radio>
                          <b-form-radio value="Services">Services</b-form-radio>
                        </b-form-radio-group>
                      </b-form-group>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label class="label">Manpower</label>
                <div class="table-responsive-sm">
                  <table class="table table-bordered table-sm">
                    <tr class="text-center thead-light">
                      <th>Engineer</th>
                      <th>Technician</th>
                      <th>Foreman</th>
                      <th>Electrician</th>
                      <th>D. Worker</th>
                      <th>Driver</th>
                      <th>Misc.</th>
                      <th>Supervisor</th>
                      <th>Total</th>
                    </tr>
                    <tr class="text-center">
                      <td>{{ dailyActivityReport.engineer }}</td>
                      <td>{{ dailyActivityReport.technician }}</td>
                      <td>{{ dailyActivityReport.foreman }}</td>
                      <td>{{ dailyActivityReport.electrician }}</td>
                      <td>{{ dailyActivityReport.dWorker }}</td>
                      <td>{{ dailyActivityReport.driver }}</td>
                      <td>{{ dailyActivityReport.misc }}</td>
                      <td>{{ dailyActivityReport.supervisor }}</td>
                      <th>{{ totalManpower }}</th>
                    </tr>
                  </table>
                </div>
              </div>
              <div>
                <label class="label">Working Conditions</label>
                <b-row>
                  <div class="col-md-4 col-sm-4 col-xs- col-12 d-block d-xs-block d-sm-block table-responsive-sm">
                    <table class="table table-bordered table-sm">
                      <tr class="text-center thead-light">
                        <th colspan="3" class="c">Working Hours</th>
                      </tr>
                      <tr class="text-center thead-light">
                        <th>Start</th>
                        <th>Stop</th>
                        <th>Overtime</th>
                      </tr>
                      <tr class="text-center">
                        <td>{{ dailyActivityReport.start }}</td>
                        <td>{{ dailyActivityReport.end }}</td>
                        <td>{{ dailyActivityReport.overtime }}</td>
                      </tr>
                    </table>
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-4 col-12 d-block d-xs-block d-sm-block table-responsive-sm">
                    <table class="table table-bordered table-sm">
                      <tr class="text-center thead-light">
                        <th colspan="3">Weather Conditions</th>
                      </tr>
                      <tr class="text-center thead-light">
                        <th>Morning</th>
                        <th>Afternoon</th>
                        <th>Evening</th>
                      </tr>
                      <tr class="text-center">
                        <td>{{ dailyActivityReport.morningWeather }}</td>
                        <td>{{ dailyActivityReport.afternoonWeather }}</td>
                        <td>{{ dailyActivityReport.eveningWeather }}</td>
                      </tr>
                    </table>
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-4 col-12 d-block d-xs-block d-sm-block">
                    <b style="font-size: 12px;">Remarks</b>
                    <div>
                      <table class="table table-bordered table-sm table-responsive-sm">
                        <tr class="d-flex">
                          <td class="col-12"><div style="height:51px; overflow-y: scroll" v-html="dailyActivityReport.remarks"></div></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </b-row>
              </div>
              <div>
                <label class="label">Description</label>
                <div>
                  <table class="table table-bordered table-sm table-responsive-sm">
                    <tr class="d-flex">
                      <td class="col-12" v-html="dailyActivityReport.description"></td>
                    </tr>
                  </table>
                </div>
              </div>
              <div>
                <label class="label">Encounter Problem</label>
                <div id="problem">
                  <table class="table table-bordered table-sm table-responsive-sm">
                    <tr class="d-flex">
                      <td class="col-12">{{ dailyActivityReport.encounterProblem }}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-6 col-12 d-block d-xs-block d-sm-block">
                  <label class="label">Responsible</label>
                  <table class="table table-bordered table-sm table-responsive-sm">
                    <tr class="d-flex">
                      <th class="col-3">Name:</th>
                      <td class="col-9">{{ dailyActivityReport.responsible }}</td>
                    </tr>
                    <tr class="d-flex">
                      <th class="col-3">Signature:</th>
                      <td class="col-9"></td>
                    </tr>
                  </table>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6 col-12 d-block d-xs-block d-sm-block">
                  <label class="label">Approved by</label>
                  <table class="table table-bordered table-sm table-responsive-sm">
                    <tr class="d-flex">
                      <th class="col-3">Name:</th>
                      <td class="col-9">{{ dailyActivityReport.approvedBy }}</td>
                    </tr>
                    <tr class="d-flex">
                      <th class="col-3">Signature:</th>
                      <td class="col-9"></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <b-row>
              <div class = "button-group col-sm-12">
                <b-button v-b-modal.modal-delete id="delete-button" class="btn btn-primary">Delete</b-button>
                <router-link :to="{name: 'update-daily-activity-report'}">
                  <b-button id="edit-button" class="btn btn-primary">Edit</b-button>
                </router-link>
              </div>
            </b-row>
          </card>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-delete"
      ref="modal-delete"
      centered
      >
      <template v-slot:modal-title>
        <div class="container">
          <h5 id="modal-title-delete">Delete Daily Activity Report?</h5>
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
              <p id="modal-message">Daily activity report for site {{dailyActivityReport.site}} was successfully deleted from list.</p>
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
  </div>
</template>
<script>
import axios from 'axios';
import authHeader from '../../services/auth-header';

export default {
  data() {
    return {
      fieldsManpower: [
        { key: 'engineer', label: 'Engineer', class: 'text-center'},
        { key: 'technician', label: 'Technician', class: 'text-center'},
        { key: 'foreman', label: 'Foreman', class: 'text-center'},
        { key: 'electrician', label: 'Electrician', class: 'text-center'},
        { key: 'dWorker', label: 'D. Worker', class: 'text-center'},
        { key: 'driver', label: 'Driver', class: 'text-center'},
        { key: 'misc', label: 'Misc.', class: 'text-center'},
        { key: 'supervisor', label: 'Supervisor', class: 'text-center'}
      ],
      fieldsHour: [
        { key: 'start', label: 'Start', class: 'text-center'},
        { key: 'end', label: 'Stop', class: 'text-center'},
        { key: 'overtime', label: 'Overtime', class: 'text-center'},
      ],
      fieldsCondition: [
        { key: 'morningWeather', label: 'Morning', class: 'text-center'},
        { key: 'afternoonWeather', label: 'Afternoon', class: 'text-center'},
        { key: 'eveningWeather', label: 'Evening', class: 'text-center'},
      ],
      // items: [{ engineer: 0, technician: 0, foreman : 0, electrician : 0, dWorker : 0, driver : 0, misc : 0, supervisor : 0}],
      dailyActivityReport: '',
      all: [],
      successModal: false,
      url_local: 'http://localhost:8080/api/daily-activity-report/',
      url_deploy: 'http://sipola-sixab.herokuapp.com/api/daily-activity-report/'
    }
  },
  beforeMount() {
    this.getDetail();

  },
  computed: {
    items() {
      return this.all;
    },
    totalManpower(){
      return this.dailyActivityReport.engineer + this.dailyActivityReport.technician + this.dailyActivityReport.foreman + this.dailyActivityReport.electrician
      + this.dailyActivityReport.dWorker + this.dailyActivityReport.driver + this.dailyActivityReport.misc + this.dailyActivityReport.supervisor;
    }
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.deleteDailyActivityReport(this.dailyActivityReport);
      this.hideModal();
    },
    showMessage(status){
      this.successModal = true;
    },

    getDetail: function(){
      axios.get(this.url_deploy + this.$route.params.id, { headers: authHeader() })
      .then(response => {this.dailyActivityReport = response.data.result, this.all.push(response.data.result)})
      .catch(err => this.dailyActivityReport = err.data);
    },

    deleteDailyActivityReport(dailyActivityReport){
      axios.put(this.url_deploy + this.$route.params.id + '/delete', dailyActivityReport, { headers: authHeader() })
      .then(res => {this.showMessage(res.data.status)});
    },
    redirect(){
      this.$router.push({ name: 'daily-activity-report'});
    },
    hideModal(){
      this.$refs['modal-delete'].hide();
    },
  }
}

</script>

<style scoped>
#problem{
  white-space: pre-line;
}

.center{
  margin-left: auto;
  margin-right: auto;
}

.vue-app{
  margin-bottom: 20px;
}

.judul{
  text-align: center;
  color: black;
  margin: 11px 0 24px 0;
}
#edit-button{
  background-color: #109CF1;
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
p{
  font-size: 12px;
}
.ti-trash{
  font-size: 50px;
  text-align: center;
  color:#ff3e1d;
}
.button-confirm-group{
  text-align: right;
}
#confirm_delete_button{
  font-size: 12px;
  width: 110px;
  border-color: #ff3e1d;
  border-width: 1px;
  margin-right: 10px;
  line-height: 15px;
}
#cancel_delete_button{
  font-size: 12px;
  background-color: #ff3e1d;
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
#modal-title-delete{
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
#breadcrumb{
  font-size: 12px;
  /* text-decoration: underline; */
  margin: -35px 0 -5px -15px;
  color: #FF3E1D;
  background: none;
}
.label{
  font-weight: 600;
}
td:empty::after{
  content: "\00a0";
}
</style>

