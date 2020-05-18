<template>
  <div class="row">
    <div class="col-12">
      <b-breadcrumb id="breadcrumb">
        <b-breadcrumb-item :to="{name: 'activity-list-schedule'}">
          Activity List Schedule
        </b-breadcrumb-item>
        <b-breadcrumb-item active>
          Detail Activity List Schedule
        </b-breadcrumb-item>
      </b-breadcrumb>
      <h3 class="judul"><strong>Detail Activity List Schedule</strong></h3>
      <div class = "row">
        <div class="col-md-12 col-sm-12 col-xs-12 col-12 d-block d-xs-block d-sm-block center">
          <card>
            <h5 class="text-center" style="margin-bottom: 10px;">Activity List Schedule</h5>
            <b-row>
              <div class="col-sm-12 text-center">
                <b class="col-sm-12">{{activityListSchedule.namaProyek}}</b>
                <p class="col-sm-12">{{activityListSchedule.namaPerusahaan}}</p>
              </div>
            </b-row>
            <div class="vue-app col-sm-12">
              <kendo-gantt id="gantt"
                          :height="'400'"
                          :editable-create="false"
                          :show-work-hours="false"
                          :show-work-days="false"
                          :data-source="activityListSchedule.listTugas"
                          :editable-drag-percent-complete="false"
                          :editable-update="false"
                          :editable-reorder="false"
                          :editable-move="false"
                          :editable-destroy="false"
                          :editable-dependency-create="false"
                          :editable-dependency-destroy="false">
                <!-- <kendo-gantt-view :type="'day'"></kendo-gantt-view> -->
                <kendo-gantt-view :type="'week'" :selected="true"></kendo-gantt-view>
                <!-- <kendo-gantt-view :type="'month'"></kendo-gantt-view> -->
                <kendo-gantt-column :field="'title'" :title="'Activity Name'" :sortable="true"></kendo-gantt-column>
              </kendo-gantt>
            </div>
            <b-row>
              <div class = "col-sm-12" id="notes">
                <h6 class="col-sm-12">Notes :</h6>
                <p class="col-sm-12">{{activityListSchedule.catatan}}</p>
              </div>
            </b-row>
            <b-row>
              <div class = "button-group col-sm-12">
                <b-button v-b-modal.modal-delete id="delete-button" class="btn btn-primary">Delete</b-button>
                <router-link :to="{name: 'update-activity-list-schedule'}">
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
          <h5 id="modal-title-delete">Delete Activity List Schedule?</h5>
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
              <p id="modal-message">Activity list schedule for project {{activityListSchedule.namaProyek}} was successfully deleted from list.</p>
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

export default {
  data() {
    return {
      activityListSchedule: {
        namaProyek: '',
        namaPerusahaan: '',
        catatan: '',
      },
      dataSource: [],
      successModal: false,
      headerBorderVariant: 'white',
      footerBorderVariant: 'warning',
    }
  },
  beforeMount() {
    this.getDetail();
  },

  methods: {
    parameterMap: function(options, operation) {
      if (operation !== 'read') {
        return {models: kendo.stringify(options.models || [options])}
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.deleteActivityListSchedule(JSON.stringify(this.activityListSchedule));
      this.hideModal();
    },
    showMessage(status){
      this.successModal = true;
    },
    // addData(){
    //   var datasource= new kendo.data.DataSource({
    //     data: [
    //       this.activityListSchedule.listTugas
    //     ]
    //   });
    //   datasource.add(this.activityListSchedule.listTugas);
    //   this.dataSource = datasource.data();
    //   this.dataSource.push(datasource.data());
    // },
    getDetail: function(){
      axios.get('http://localhost:8080/api/activity-list-schedule/' + this.$route.params.id)
      .then(response => {this.activityListSchedule = response.data.result, this.getActivity()})
      .catch(err => this.activityListSchedule = err.data);
    },
    getActivity(){
      for(let i=0; i< this.activityListSchedule.listTugas.length; i++){
        this.activityListSchedule.listTugas[i].id += i;
        this.activityListSchedule.listTugas[i].orderId += i;
        this.activityListSchedule.listTugas[i].parentId = 0;
        this.activityListSchedule.listTugas[i].title = this.activityListSchedule.listTugas[i].namaTugas;
        this.activityListSchedule.listTugas[i].summary = false;
        this.activityListSchedule.listTugas[i].expanded = false;
        this.activityListSchedule.listTugas[i].start = new Date(this.activityListSchedule.listTugas[i].tanggalMulaiTugas);
        this.activityListSchedule.listTugas[i].end =  new Date(this.activityListSchedule.listTugas[i].tanggalSelesaiTugas);
      }
      var parentActivity = {};
      parentActivity.id = 0;
      parentActivity.orderId = 0;
      parentActivity.parentId = null;
      parentActivity.title = this.activityListSchedule.namaProyek;
      parentActivity.summary = true;
      parentActivity.expanded = true;
      parentActivity.start = new Date(this.activityListSchedule.listTugas[0].tanggalMulaiTugas);
      parentActivity.end = new Date(this.activityListSchedule.listTugas.slice(-1)[0].tanggalSelesaiTugas);

      this.activityListSchedule.listTugas.push(parentActivity);
      console.log(this.activityListSchedule.listTugas);
    },
    deleteActivityListSchedule(activityListSchedule){
      axios.put('http://localhost:8080/api/activity-list-schedule/' + this.$route.params.id + '/delete',
      activityListSchedule,
          { headers: {
              'Content-Type': 'application/json',
          }
      })
      .then(res => {this.showMessage(res.data.status)});
    },
    redirect(){
      this.$router.push({ name: 'activity-list-schedule'});
    },
    hideModal(){
      this.$refs['modal-delete'].hide();
    },
  }
}

</script>

<style scoped>
#notes{
  white-space: pre-line;
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
  margin-bottom: -4px;
  font-weight: 600;
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
</style>

