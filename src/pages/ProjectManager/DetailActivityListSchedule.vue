<template>
  <div class="row">
    <div class="col-12">
      <h3 class="judul"><strong>Detail Activity List Schedule</strong></h3>
      <card>
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
                      :data-source="datasource"
                      :dependencies="dependencydatasource">
            <kendo-gantt-view :type="'day'"></kendo-gantt-view>
            <kendo-gantt-view :type="'week'" :selected="true"></kendo-gantt-view>
            <kendo-gantt-view :type="'month'"></kendo-gantt-view>
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
      datasource: [{
          id: 0,
          orderId: 0,
          parentId: null,
          title: "Main Project",
          summary: true,
          expanded: true,
          percentComplete: 0.3,
          start: new Date("2014/6/17 9:00"),
          end: new Date("2014/7/01 11:00")
      },
      {
          id: 1,
          orderId: 1,
          parentId: 0,
          title: "Task1",
          percentComplete: 0.47,
          start: new Date("2014/6/17 11:00"),
          end: new Date("2014/6/20 14:00")
      }],
      dependencydatasource: [{
          predecessorId: 1,
          successorId: 2,
          type: 1
      }],
      activityListSchedule: '',
      successModal: false,
      headerBorderVariant: 'white',
      footerBorderVariant: 'warning',
    }
  },
  beforeMount() {
    this.getDetail();
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.deleteActivityListSchedule(JSON.stringify(this.activityListSchedule));
      this.hideModal();
    },
    showMessage(status){
      this.successModal = true;
    },
    getDetail: function(){
      axios.get('http://localhost:8080/api/activity-list-schedule/' + this.$route.params.id)
      .then(response => this.activityListSchedule = response.data)
      .catch(err => this.activityListSchedule = err.data);
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
  margin: 5px 0 24px 0;
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
</style>

