<template>
  <div>
    <h3 class="judul"><strong>Add Activity List Schedule</strong></h3>
    <div class = "row">
        <div class="col-10 isi-form">
          <card>
            <h5 class="title-form">Add Activity List Schedule Form</h5>
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group id="project-name-input" label="Project Name" label-for="projectName">
                  <b-form-input
                    id="projectName"
                    v-model="newActivityListSchedule.namaProyek"
                    type="text"
                    required
                    placeholder="Project Name"
                    >
                  </b-form-input>
                </b-form-group>

                <b-form-group id="company-name-input" label="Company Name" label-for="companyName">
                  <b-form-input
                    id="companyName"
                    v-model="newActivityListSchedule.namaPerusahaan"
                    type="text"
                    required
                    placeholder="Company Name"
                    >
                  </b-form-input>
                </b-form-group>

                <b-row>
                    <b-col md="5">
                      <label>Activity Name</label>
                    </b-col><br>

                    <b-col md="3">
                    <label>Start Date</label>
                    </b-col><br>

                    <b-col md="3">
                    <label>End Date</label>
                    </b-col>
                    <br>

                    <b-col md="1">

                    </b-col>
                </b-row>

                <b-row class="activities" v-bind:key="item.id_activity" v-for="item in activities">
                    <b-col>
                    <Activity v-bind:activity="item" v-on:del-activity="deleteRow" />
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="12">
                        <button class="btn btn-primary add-button" @click="addRow()" variant="outline-primary">Add More Activity <span class="ti-plus"></span></button>
                    </b-col>
                </b-row>

                <b-form-group class="mb-0" id="notes-input" label="Notes" label-for="notes">
                    <b-form-textarea
                        id="notes"
                        v-model="newActivityListSchedule.catatan"
                        type="text"
                        placeholder="Notes"
                        >
                    </b-form-textarea>
                </b-form-group>

                <div class = "button-group">
                    <b-button class = "cancel-button col-sm-2" type="reset">Cancel</b-button>
                    <b-button class = "add-quotation-button col-sm-2" type="submit">Save</b-button>
                </div>
            </b-form>
          </card>
        </div>
    </div>
    <b-modal title="Daftar Tugas Berhasil Tersimpan" v-model="successModal" @ok="redirect()"  centered ok-only>
        Daftar tugas telah berhasil dibuat.
    </b-modal>

    <b-modal title="Daftar Tugas Gagal Tersimpan" v-model="failedModal" centered ok-only>
        Daftar tugas gagal dibuat.
    </b-modal>
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
        axios.post('http://localhost:8081/api/activity-list-schedule/add',
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
}
.isi-form{
  margin-left: auto;
  margin-right: auto;
}

.add-quotation-button{
  background-color: #109CF1;
  color:white;
  border-color: transparent;
  font-size: 10px;
  /* width: 120px;
  height: 36px; */
  margin-bottom: 4px;
  box-shadow: 0px 0px 15px rgba(16, 156, 241, 0.2);
}

.cancel-button{
    color:#109CF1;
    border-color:#109CF1;
    background-color: white;
}

.button-group{
  margin-top: 30px;
  text-align: center;
}

</style>
